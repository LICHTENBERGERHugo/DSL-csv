import {
  DeleteParams,
  isAdd,
  isCSVFile,
  isDelete,
  isDeleteParamArrayInt,
  isDeleteParamArrayString,
  isDeleteParamInt,
  isDeleteParamString,
  isTable,
  isThoriumFunction,
  type Model,
  isModify,
  isCSVRow,
  isPrint,
  isFilter,
  isFilterParams,
  isConditionArray,
  isComputation,
  isProject,
  isDeclaration,
  isWrite,
} from "../language/generated/ast.js";
import * as fs from "node:fs";
import { CompositeGeneratorNode, NL, toString } from "langium";
import * as path from "node:path";
import { extractDestinationAndName } from "./cli-util.js";

export function generateR(
  model: Model,
  filePath: string,
  destination: string | undefined
): string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, data.name)}.R`;

  const fileNode = new CompositeGeneratorNode();
  model.lines.forEach((line) => {
    if (isDeclaration(line.declaration)) {
      let declaration = line.declaration;
      if (isTable(declaration)) {
        if (declaration.file?.csvName) {
          fileNode.append(
            `${declaration.name} <- read.csv(${declaration.file?.csvName}, stringsAsFactors = FALSE)`,
            NL
          );
        } else {
          fileNode.append(
            `${declaration.name} <- read.csv("${declaration.file?.filepath}", stringsAsFactors = FALSE)`,
            NL
          );
        }
      }
      if (isCSVFile(declaration)) {
        fileNode.append(
          `${declaration.name} <- ${
            declaration.filepath
              ? '"' + declaration.filepath + '"'
              : declaration.csvName
          }`,
          NL
        );
      }
    }

    if (isThoriumFunction(line.function)) {
      let f = line.function;
      if (isPrint(f.ftype)) {
        const df = f.table.name;
        fileNode.append(`print(${df})`, NL);
      } else if (isComputation(f.ftype)) {
        if (f.ftype.agg == "COUNT") {
          fileNode.append(
            `${f.table.name} <- cbind(${f.table.name}, ${f.ftype.cname}_COUNT = rep(length(${f.table.name}$${f.ftype.cname}),length.out=length(${f.table.name}$${f.ftype.cname})))`,
            NL
          );
          //fileNode.append(`length(${f.table.name}$${f.ftype.cname})`, NL);
        }
        if (f.ftype.agg == "SUM") {
          fileNode.append(
            `${f.table.name} <- cbind(${f.table.name}, ${f.ftype.cname}_SUM = rep(sum(${f.table.name}$${f.ftype.cname}),length.out=length(${f.table.name}$${f.ftype.cname})))`,
            NL
          );
          //fileNode.append(`sum(${f.table.name}$${f.ftype.cname})`, NL);
        }
      } else if (isModify(f.ftype)) {
        if (isCSVRow(f.ftype.parameters.value)) {
          const values = f.ftype.parameters.value.text
            .split(",")
            .map((value) => {
              const num = Number(value);
              if (!isNaN(num)) {
                return num;
              }
              return `"${value}"`;
            });
          fileNode.append(
            `${f.table.name}[${f.ftype.parameters.rowID},] <- c(${values})`,
            NL
          );
        } else if (typeof f.ftype.parameters.colID === "string") {
          const val = !isNaN(Number(f.ftype.parameters.value))
            ? f.ftype.parameters.value
            : '"' + f.ftype.parameters.value + '"';
          fileNode.append(
            `${f.table.name}[${f.ftype.parameters.rowID}, "${f.ftype.parameters.colID}"] <- ${val}`,
            NL
          );
        } else {
          const val = !isNaN(Number(f.ftype.parameters.value))
            ? f.ftype.parameters.value
            : '"' + f.ftype.parameters.value + '"';
          fileNode.append(
            `${f.table.name}[${f.ftype.parameters.rowID}, ${f.ftype.parameters.colID}] <- ${val}`,
            NL
          );
        }
      } else if (isAdd(f.ftype)) {
        if (f.ftype.parameters.row) {
          const str = f.ftype.parameters.row!.text.split(",").map((value) => {
            const num = Number(value);
            if (!isNaN(num)) {
              return num;
            }
            return `"${value}"`;
          });
          fileNode.append(
            `${f.table.name}[nrow(${f.table.name}) + 1,] <- c(${str})`,
            NL
          );
        } else {
          const params = f.ftype.parameters
            .rows!.rows.map(
              (row) =>
                "c(" +
                row.text.split(",").map((value) => {
                  const num = Number(value);
                  if (!isNaN(num)) {
                    return num;
                  }
                  return `"${value}"`;
                }) +
                ")"
            )
            .join(",");

          fileNode.append(`rows <- list(${params})`, NL);

          fileNode.append(`for (row in rows){`, NL);
          fileNode.append(
            `\t${f.table.name}[nrow(${f.table.name}) + 1,] <- row`,
            NL
          );
          fileNode.append(`}`, NL);
        }
      } else if (isFilter(f.ftype)) {
        let str = "";
        if (isFilterParams(f.ftype.parameters)) {
          const conditions = f.ftype.parameters.conditions;
          const condition = f.ftype.parameters.condition;
          if (conditions != null) {
            if (isConditionArray(conditions)) {
              const condition1 = conditions.con1;
              const other = conditions.other;
              let val = !isNaN(Number(condition1.value))
                ? condition1.value
                : '"' + condition1.value + '"';
              str += `${condition1.rowname} ${condition1.argument} ${val}`;
              let others = "";
              if (other != null) {
                const len = other.length;
                for (let i = 0; i < len - 1; i++) {
                  let val = !isNaN(Number(other[i].value))
                    ? other[i].value
                    : '"' + other[i].value + '"';
                  others += `${other[i].rowname} ${other[i].argument} ${val} & `;
                }
                let val = !isNaN(Number(other[len - 1].value))
                  ? other[len - 1].value
                  : '"' + other[len - 1].value + '"';
                others += `"${other[len - 1].rowname}" ${
                  other[len - 1].argument
                } ${val}`;
              }
              str = str + " & " + others;
            }
          } else if (condition != null) {
            let val = !isNaN(Number(condition.value))
              ? condition.value
              : '"' + condition.value + '"';
            str += `${condition.rowname} ${condition.argument} ${val}`;
          }
        }
        fileNode.append(
          `${f.table.name} <- subset(${f.table.name}, ${str})`,
          NL
        );
      } else if (isProject(f.ftype)) {
        if (f.ftype.parameters.other.length > 0) {
          const cols = [`"${f.ftype.parameters.col}"`];
          for (let i = 0; i < f.ftype.parameters.other.length; i++) {
            cols.push(`"${f.ftype.parameters.other[i]}"`);
          }
          fileNode.append(
            `${f.table.name} <- ${f.table.name}[,c(${cols})]`,
            NL
          );
        } else {
          fileNode.append(
            `${f.table.name} <- data.frame(list(${f.ftype.parameters.col} = ${f.table.name}[,c("${f.ftype.parameters.col}")]))`,
            NL
          );
        }
      } else if (isDelete(f.ftype)) {
        let params: DeleteParams = f.ftype.parameters;
        if (isDeleteParamInt(params)) {
          fileNode.append(
            `${f.table.name} <- ${f.table.name}[-${params.row},]`,
            NL
          );
        } else if (isDeleteParamString(params)) {
          fileNode.append(
            `${f.table.name} <- ${f.table.name}[,!names(${f.table.name}) %in% c("${params.col}")]`,
            NL
          );
        } else if (isDeleteParamArrayInt(params)) {
          fileNode.append(
            `${f.table.name} <- ${f.table.name}[-c(${params.rows}),]`,
            NL
          );
        } else if (isDeleteParamArrayString(params)) {
          fileNode.append(
            `${f.table.name} <- ${f.table.name}[,!names(${
              f.table.name
            }) %in% c(${params.cols
              .map((e: any) => '"' + e + '"')
              .join(",")})]`,
            NL
          );
        }
      } else if (isWrite(f.ftype)) {
        fileNode.append(
          `write.csv(${f.table.name}, "${f.ftype.location}", row.names=FALSE, quote=FALSE)`,
          NL
        );
      }
    }
  });

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));

  return generatedFilePath;
}

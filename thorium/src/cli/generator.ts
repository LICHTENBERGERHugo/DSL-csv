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
} from "../language/generated/ast.js";
import * as fs from "node:fs";
import { CompositeGeneratorNode, NL, toString } from "langium";
import * as path from "node:path";
import { extractDestinationAndName } from "./cli-util.js";
import { exec } from "child_process";

export function generateR(
  model: Model,
  filePath: string,
  destination: string | undefined
):string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, data.name)}.R`;

  const fileNode = new CompositeGeneratorNode();
  
  model.declarations.forEach((declaration) => {
    if (isTable(declaration)) {
      if (declaration.file?.name) {
        fileNode.append(
          `${declaration.name} <- read.csv(${declaration.file?.name})`,
          NL
        );
      } else {
        fileNode.append(
          `${declaration.name} <- read.csv("${declaration.file?.filepath}")`,
          NL
        );
      }
    }
    if (isCSVFile(declaration)) {
      fileNode.append(`${declaration.name} <- "${declaration.filepath}"`, NL);
    }
  });
  
  model.functions.forEach((f) => {
    if (isThoriumFunction(f)) {
      if (isPrint(f.ftype)) {
        const df = f.table.name;
        fileNode.append(`print(${df})`, NL);
      }
      else if (isComputation(f.ftype)) {
        if (f.ftype.agg == "COUNT") {
          fileNode.append(`length(${f.table.name}$${f.ftype.cname})`, NL);
        }
        if (f.ftype.agg == "SUM") {
          fileNode.append(`sum(${f.table.name}$${f.ftype.cname})`, NL);
        }
      }
      else if (isModify(f.ftype)) {
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
          fileNode.append(`${f.table.name}[${f.ftype.parameters.rowID},] <- c(${values})`, NL);
        } else if (typeof f.ftype.parameters.colID === "string") {
          fileNode.append(`${f.table.name}[${f.ftype.parameters.rowID}, '${f.ftype.parameters.colID}'] <- ${f.ftype.parameters.value}`, NL);
        } else {
          fileNode.append(`${f.table.name}[${f.ftype.parameters.rowID}, ${f.ftype.parameters.colID}] <- ${f.ftype.parameters.value}`, NL);
        }
      }
      else if (isAdd(f.ftype)) {
        if (f.ftype.parameters.row) {
          const str = f.ftype.parameters.row!.text
          .split(", ")
          .map((value) => {
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
        }
        else{
          const params = f.ftype.parameters
              .rows!.rows.map((row) => '"' + row.text + '"')
              .join(",")
          
          fileNode.append(`rows <- list(${params})`, NL);

          fileNode.append(`for row in rows:`, NL);
          fileNode.append(`\t${f.table.name}[nrow(${f.table.name}) + 1,] <- c(row)`, NL);
        }
      }
      else if (isFilter(f.ftype)) {
        let str = "";
        if (isFilterParams(f.ftype.parameters)) {
          const conditions = f.ftype.parameters.conditions;
          const condition = f.ftype.parameters.condition;
          if (conditions != null) {
            if (isConditionArray(conditions)) {
              const condition1 = conditions.con1;
              const other = conditions.other;

              str += `${condition1.rowname} ${condition1.argument} ${condition1.value}`;
              let others = "";
              if (other != null) {
                const len = other.length;
                for (let i = 0; i < len - 1; i++) {
                  others += `${other[i].rowname} ${other[i].argument} ${other[i].value} & `;
                }
                others += `(${f.table.name}['${other[len - 1].rowname}'] ${
                  other[len - 1].argument
                } ${other[len - 1].value})`;
              }
              str = str + " & " + others;
            }
          } else if (condition != null) {
            str += `${f.table.name}['${condition.rowname}'] ${condition.argument} ${condition.value}`;
          }
        }
        fileNode.append(`${f.table.name} <- filter(${f.table.name}, ${str})`, NL);
      }
      else if (isProject(f.ftype)) {
        if(f.ftype.parameters.other.length > 0){
          const cols = [`"${f.ftype.parameters.col}"`];
          for (let i = 0; i < f.ftype.parameters.other.length; i++) {
            cols.push(`"${f.ftype.parameters.other[i]}"`);
          }
          fileNode.append(`${f.table.name} <- ${f.table.name}[c(${cols})]`, NL);
        } else {
          fileNode.append(`${f.table.name} <- ${f.table.name}[c(${f.ftype.parameters.col})]`, NL);
        }
      }
      else if (isDelete(f.ftype)) {
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
            `${f.table.name} <- ${f.table.name}[-c(${params.rows})]`,
            NL
          );
        } else if (isDeleteParamArrayString(params)) {
          fileNode.append(
            `${f.table.name} <- ${f.table.name}[,!names(${f.table.name}) %in% c(${params.cols
              .map((e: any) => '"' + e + '"')
              .join(",")})]`,
            NL
          );        
        }
      }
    }
  });

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));

  return generatedFilePath;
}

export function generatePython(
  model: Model,
  filePath: string,
  destination: string | undefined
): string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, data.name)}.py`;
  const fileNode = new CompositeGeneratorNode();
  fileNode.append("import pandas as pd", NL);

  model.declarations.forEach((declaration) => {
    if (isTable(declaration)) {
      if (declaration.file?.name) {
        fileNode.append(
          `${declaration.name} = pd.read_csv(${declaration.file?.name})`,
          NL
        );
      } else {
        fileNode.append(
          `${declaration.name} = pd.read_csv("${declaration.file?.filepath}")`,
          NL
        );
      }
    }
    if (isCSVFile(declaration)) {
      fileNode.append(`${declaration.name}= "${declaration.filepath}"`, NL);
    }
  });

  model.functions.forEach((f) => {
    if (isThoriumFunction(f)) {
      if (isModify(f.ftype)) {
        if (isCSVRow(f.ftype.parameters.value)) {
          // Modify value of a whole row
          const values = f.ftype.parameters.value.text
            .split(",")
            .map((value) => {
              const num = Number(value);
              if (!isNaN(num)) {
                return num;
              }
              return `"${value}"`;
            });
          const row = `${f.table.name}.loc[${f.ftype.parameters.rowID}] = [${values}]`;
          fileNode.append(row, NL);
        } else if (typeof f.ftype.parameters.colID === "string") {
          // Modify value of a cell by row name
          const cell = `${f.table.name}.at[${f.ftype.parameters.rowID}, '${f.ftype.parameters.colID}'] = ${f.ftype.parameters.value}`;
          fileNode.append(cell, NL);
        } else {
          // Modify value of a cell by col id
          const cell = `${f.table.name}.at[${f.ftype.parameters.rowID}, ${f.ftype.parameters.colID}] = ${f.ftype.parameters.value}`;
          fileNode.append(cell, NL);
        }
      }
      else if (isAdd(f.ftype)) {
        if (f.ftype.parameters.row) {
          fileNode.append(`values = "${f.ftype.parameters.row!.text}"`, NL);
          fileNode.append(`new_row = pd.Series(values.split(","))`, NL);

          fileNode.append(
            `${f.table.name} = ${f.table.name}.append(new_row, ignore_index=True)`,
            NL
          );
        } else {
          fileNode.append(
            `new_values = [${f.ftype.parameters
              .rows!.rows.map((row) => '"' + row.text + '"')
              .join(",")}]`,
            NL
          );
          fileNode.append(`for row in new_values:`, NL);
          fileNode.append(`\tvalues = row.split(',')`, NL);
          fileNode.append(`\tnew_row = pd.Series(values)`, NL);
          fileNode.append(
            `\t${f.table.name} = ${f.table.name}.append(new_row, ignore_index=True)`,
            NL
          );
        }
      }
      else if (isPrint(f.ftype)) {
        const df = f.table.name;
        fileNode.append(`print(${df}.to_string())`, NL);
      }
      else if (isComputation(f.ftype)) {
        if (f.ftype.agg == "COUNT") {
          fileNode.append(`${f.table.name}.shape[0]`, NL);
        }
        if (f.ftype.agg == "SUM") {
          fileNode.append(`${f.table.name}["${f.ftype.cname}"].sum()`, NL);
        }
      }
      else if (isDelete(f.ftype)) {
        let params: DeleteParams = f.ftype.parameters;
        if (isDeleteParamInt(params)) {
          fileNode.append(
            `${f.table.name} = ${f.table.name}.drop(${params.row})`,
            NL
          );
        } else if (isDeleteParamString(params)) {
          fileNode.append(
            `${f.table.name} = ${f.table.name}.drop("${params.col}", axis=1)`,
            NL
          );
        } else if (isDeleteParamArrayInt(params)) {
          fileNode.append(
            `${f.table.name} = ${f.table.name}.drop([${params.rows}])`,
            NL
          );
        } else if (isDeleteParamArrayString(params)) {
          fileNode.append(
            `${f.table.name} = ${f.table.name}.drop([${params.cols
              .map((e: any) => '"' + e + '"')
              .join(",")}], axis=1)`,
            NL
          );
        }
      }
      else if (isFilter(f.ftype)) {
        let str = "";
        if (isFilterParams(f.ftype.parameters)) {
          const conditions = f.ftype.parameters.conditions;
          const condition = f.ftype.parameters.condition;
          if (conditions != null) {
            if (isConditionArray(conditions)) {
              const condition1 = conditions.con1;
              const other = conditions.other;

              str += `${f.table.name}['${condition1.rowname}'] ${condition1.argument} ${condition1.value}`;
              let others = "";
              if (other != null) {
                const len = other.length;
                for (let i = 0; i < len - 1; i++) {
                  others += `(${f.table.name}['${other[i].rowname}'] ${other[i].argument} ${other[i].value}) & `;
                }
                others += `(${f.table.name}['${other[len - 1].rowname}'] ${
                  other[len - 1].argument
                } ${other[len - 1].value})`;
              }
              str = "(" + str + ") & " + others;
            }
          } else if (condition != null) {
            str += `${f.table.name}['${condition.rowname}'] ${condition.argument} ${condition.value}`;
          }
        }
        fileNode.append(`${f.table.name} = ${f.table.name}[${str}]`, NL);
      }
      else if (isProject(f.ftype)) {
        if(f.ftype.parameters.other.length > 0){
          // console.log(f.ftype.parameters.other);
          const cols = [`"${f.ftype.parameters.col}"`];
          for (let i = 0; i < f.ftype.parameters.other.length; i++) {
            cols.push(`"${f.ftype.parameters.other[i]}"`);
          }
          fileNode.append(`${f.table.name}[[${cols}]]`, NL);
        } else {
          fileNode.append(`${f.table.name}["${f.ftype.parameters.col}"]`, NL);
        }
      }
    }
  });

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));

  return generatedFilePath;
}

// take a file_path as input and return the result of the execution along with execution time and memory usage
export async function execPython(file_path: string): Promise<string> {
  const PYTHON_INTERPRETER = "python3.8"; // python version to use

  try {
    const result = await new Promise<string>((resolve, reject) => {
      const startTime = process.hrtime(); // Start measuring execution time
      exec(
        PYTHON_INTERPRETER + " " + file_path + "'",
        (error, stdout, stderr) => {
          const endTime = process.hrtime(startTime); // Calculate execution time
          const executionTime = `${endTime[0]}s ${endTime[1] / 1000000}ms`; // Format execution time

          if (error) {
            console.log(`error: ${error.message}`);
            reject(`error: ${error.message}`);
          } else if (stderr) {
            console.log(`stderr: ${stderr}`);
            reject(`stderr: ${stderr}`);
          } else {
            console.log(`stdout: ${stdout}`);
            console.log(`Execution Time: ${executionTime}`);
            console.log(
              `Memory Consumption: ${
                process.memoryUsage().heapUsed / 1024 / 1024
              } MB`
            );
            resolve(stdout as string);
          }
        }
      );
    });
    return result.trim();
  } catch (error) {
    console.log(error);
    return `Error: ${error}`;
  }
}

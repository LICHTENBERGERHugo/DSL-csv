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
  isPrint,
  isFilter,
  isFilterParams,
  isConditionArray,
} 
from "../language/generated/ast.js";
import * as fs from "node:fs";
import { CompositeGeneratorNode, NL, toString } from "langium";
import * as path from "node:path";
import { extractDestinationAndName } from "./cli-util.js";

export function generateJavaScript(
  model: Model,
  filePath: string,
  destination: string | undefined
): string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

  const fileNode = new CompositeGeneratorNode();
  fileNode.append('"use strict";', NL, NL);

  model.functions.forEach((f) => {
    if (isThoriumFunction(f)) {
      if (isPrint(f.ftype) ) {
        //const df = f.table.name;
        fileNode.append(`
          fs.createReadStream("${filePath}")
            .pipe(csv())
            .on("data", (row) => {
            console.log(row);
          })
          .on("end", () => {
          console.log("CSV reading completed.");
        });`, NL);
      }
      if (isFilter(f.ftype)) {
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
                
                //others = `(${f.table.name}['${other.rowname}'] ${other.argument} ${other.value})`;
              }
              str = "(" + str + ") & " + others;
            }
          }else if(condition != null){
            str += `${f.table.name}['${condition.rowname}'] ${condition.argument} ${condition.value}`;
          }
        }
        fileNode.append(`${f.table.name}[${str}]`,NL);
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
      fileNode.append(
        `${declaration.name} = pd.read_csv(${declaration.file?.name})`, NL
      );
    }
    if (isCSVFile(declaration)) {
      fileNode.append(`${declaration.name}= "${declaration.filepath}"`, NL);
    }
  });
  model.functions.forEach((f) => {

    if (isAdd(f.ftype)) {
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
    if (isThoriumFunction(f)) {
      if (isPrint(f.ftype) ) {
        const df = f.table.name;
        fileNode.append(`print(${df}.to_string())`, NL);
      } 
      if (isComputation(f.ftype)) {
        if (f.ftype.agg == "COUNT") {
          fileNode.append(`${f.table.name}.shape[0]`, NL);
        }
        if (f.ftype.agg == "SUM") {
          fileNode.append(`${f.table.name}["${f.ftype.cname}"].sum()`, NL);
        }
      }
          if (isDelete(f.ftype)) {
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
      if (isFilter(f.ftype)) {
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
                others += `(${f.table.name}['${other[len-1].rowname}'] ${other[len-1].argument} ${other[len-1].value})`;
              }
              str = "(" + str + ") & " + others;
            }
          }else if(condition != null){
            str += `${f.table.name}['${condition.rowname}'] ${condition.argument} ${condition.value}`;
          }
        }
        fileNode.append(`${f.table.name}[${str}]`,NL);
      }
    }
  });

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));

  return generatedFilePath;
}

import {
  isAdd,
  isComputation,
  isCSVFile,
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
  // model.greetings.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.person.ref?.name}!');`, NL));

  model.functions.forEach((f) => {
    if (isThoriumFunction(f)) {
      if (isPrint(f.ftype) ) {
        const df = f.table.name;
        fileNode.append(`print(${df}.to_string())`, NL);
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
                
                others = `(${f.table.name}['${other.rowname}'] ${other.argument} ${other.value})`;
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
      fileNode.append(`${declaration.name} = pd.read_csv("${declaration.file}")`, NL);
    }
    if (isCSVFile(declaration)) {
      fileNode.append(`${declaration.name}= ${declaration.filepath}`, NL);
    }
  });
  model.functions.forEach((f) => {

    if (isAdd(f.ftype)) {
      // fileNode.append(df.append(decl))
    }
    if (isThoriumFunction(f)) {
      if (isPrint(f.ftype) ) {
        const df = f.table.name;
        fileNode.append(`print(${df}.to_string())`, NL);
      }
      if (isComputation(f.ftype)) {
        fileNode.append(`${f.table}.shape[0]`);
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
                
                others = `(${f.table.name}['${other.rowname}'] ${other.argument} ${other.value})`;
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

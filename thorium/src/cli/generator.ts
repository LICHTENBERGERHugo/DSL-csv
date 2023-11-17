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
  type Model,
} from "../language/generated/ast.js";
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
        `${declaration.name} = pd.read_csv("${declaration.file}")`,
        NL
      );
    }
    if (isCSVFile(declaration)) {
      fileNode.append(`${declaration.name}= ${declaration.filepath}`, NL);
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
  });

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));

  return generatedFilePath;
}

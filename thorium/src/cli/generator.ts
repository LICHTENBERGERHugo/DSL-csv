import {
  isAdd,
  isCSVFile,
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
  // model.greetings.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.person.ref?.name}!');`, NL));

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
    if (isCSVFile(declaration)) {
      fileNode.append(
        `${declaration.name} = pd.read_csv("${declaration.filepath}")`
      );
    }
    if (isTable(declaration)) {
    }
  });
  model.functions.forEach((f) => {
    if (isAdd(f)) {
      // fileNode.append(df.append(decl))
    }
  });

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));

  return generatedFilePath;
}

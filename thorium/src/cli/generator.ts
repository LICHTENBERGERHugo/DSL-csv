import {
  isCSVFile,
  isTable,
  isThoriumFunction,
  type Model,
  isModify,
  isCSVRow,
} from "../language/generated/ast.js";
import * as fs from "node:fs";
import { CompositeGeneratorNode, NL, toString } from "langium";
import * as path from "node:path";
import { extractDestinationAndName } from "./cli-util.js";
import { exec } from "child_process";

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
    if (isTable(declaration)) {
      fileNode.append(
        `${declaration.name} = pd.read_csv("${declaration.file}")`
      );
    }
    if (isCSVFile(declaration)) {
      fileNode.append(`${declaration.name}= ${declaration.filepath}`);
    }
  });

  model.functions.forEach((f) => {
    if (isThoriumFunction(f)) {
      if (isModify(f.ftype)) {
        if (isCSVRow(f.ftype.parameters.value)) {
          // Modify value of a whole row
          const values = f.ftype.parameters.value.text.split(",").map((value) => {
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
    }
  });

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));

  return generatedFilePath;
}

// take a file_path as input and return the result of the execution along with execution time and memory usage
export async function execPython(file_path : string): Promise<string> {
  const PYTHON_INTERPRETER = "python3.8"; // python version to use

  try {
      const result = await new Promise<string>((resolve, reject) => {
        const startTime = process.hrtime(); // Start measuring execution time
        exec(PYTHON_INTERPRETER + " " + file_path + "'", (error, stdout, stderr) => {
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
            console.log(`Memory Consumption: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
            resolve(stdout as string);
          }
        });
      });
      return result.trim();
  } catch (error) {
      console.log(error);
      return `Error: ${error}`;
  }
}



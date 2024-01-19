
import { describe, test } from "vitest";

import { execGeneratedFile } from "../../cli/generator.js";

const fs = require("fs");
const path = require('path');

async function runPythonCode(filePath: String) {
  // Replace this with your actual Python code execution logic
  const python_infor = await execGeneratedFile(""+filePath,"python");
  const outputFilePath = `src/test/llmBenchmark/results/${path.parse(filePath).name}Python.txt`;

  let result;
  if (python_infor.type === false) {
    result = python_infor.stdout;
  }else{
    result = `|${path.parse(filePath).name}|Python|${python_infor.executionTime}|${python_infor.memoryConsumption}|`;  
  }
  fs.writeFileSync(outputFilePath, result + '\n');
}

async function runRCode(filePath: String) {
  // Replace this with your actual R code execution logic
  const r_infor = await execGeneratedFile(""+filePath, "R");
  const outputFilePath = `src/test/llmBenchmark/results/${path.parse(filePath).name}R.txt`;

  let result;
  if (r_infor.type === false) {
    result = r_infor.stdout;
  }else{
    result = `|${path.parse(filePath).name}|R|${r_infor.executionTime}|${r_infor.memoryConsumption}|`;  
  }
  fs.writeFileSync(outputFilePath, result + '\n');
}

async function runCodeBasedOnExtension(filePath: String) {
  
  const fileExtension = path.extname(filePath).toLowerCase();
  
  switch (fileExtension) {
    case '.py':
      await runPythonCode(filePath);
      break;
    case '.r':
      await runRCode(filePath);
      break;
    default:
      console.log(`Unsupported file type: ${fileExtension}`);
  }
}

function runAllFilesInFolder(folderPath: String) {
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder not found: ${folderPath}`);
    return;
  }

  const files = fs.readdirSync(folderPath);
  if (!files.length) {
    console.log(`No files found in folder: ${folderPath}`);
    return;
  }

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    console.log(`Running file: ${filePath}`);
    runCodeBasedOnExtension(filePath);
  }
}


describe("Test-benchmark LLM", () => {
  test("generate result", async () => {
    const folderPath = 'llmGenerated';
    runAllFilesInFolder(folderPath);
  });
});
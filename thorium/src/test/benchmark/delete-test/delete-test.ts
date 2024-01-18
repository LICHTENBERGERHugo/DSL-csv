import { describe, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";
const fs = require("fs");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete(2) // delete 1 row
table.write("./src/test/benchmark/delete-test/R-delete.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete(2) // delete 1 row
table.write("./src/test/benchmark/delete-test/Python-delete.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete("age") // delete 1 column
table.write("./src/test/benchmark/delete-test/R-delete.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete("age") // delete 1 column
table.write("./src/test/benchmark/delete-test/Python-delete.csv")
`;

const TH3toR_3 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete([1,2,3]) // delete rows
table.write("./src/test/benchmark/delete-test/R-delete.csv")
`;
const TH3toPython_3 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete([1,2,3]) // delete rows
table.write("./src/test/benchmark/delete-test/Python-delete.csv")
`;

const TH3toR_4 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete(["name","department"]) // delete cols 
table.write("./src/test/benchmark/delete-test/R-delete.csv")
`;
const TH3toPython_4 = `
let table = Table(CSVFile("./src/test/benchmark/delete-test/data.csv"))
table.delete(["name","department"]) // delete cols 
table.write("./src/test/benchmark/delete-test/Python-delete.csv")
`;

describe("Test-benchmark delete", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/benchmark/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/benchmark/delete-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.R",
      "R"
    );
    
    const outputFile = './src/test/benchmark/result/delete-test-1.txt';
    const content = `Delete benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
    
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_2);
    const modelR = await assertModelNoErrors(TH3toR_2);

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/benchmark/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/benchmark/delete-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.R",
      "R"
    );
    const outputFile = './src/test/benchmark/result/delete-test-2.txt';
    const content = `Delete benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);

  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_3);
    const modelR = await assertModelNoErrors(TH3toR_3);

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/benchmark/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/benchmark/delete-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.R",
      "R"
    );

    const outputFile = './src/test/benchmark/result/delete-test-3.txt';
    const content = `Delete benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_4);
    const modelR = await assertModelNoErrors(TH3toR_4);

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/benchmark/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/benchmark/delete-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/delete-test/testDelete.R",
      "R"
    );

    
    const outputFile = './src/test/benchmark/result/delete-test-4.txt';
    const content = `Delete benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
});

import { describe, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/benchmark/project-test/data.csv"))
table.project(["name"])
table.write("./src/test/benchmark/project-test/R-project.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/benchmark/project-test/data.csv"))
table.project(["name"])
table.write("./src/test/benchmark/project-test/Python-project.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/benchmark/project-test/data.csv"))
table.project(["name","age"])
table.write("./src/test/benchmark/project-test/R-project.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/benchmark/project-test/data.csv"))
table.project(["name","age"])
table.write("./src/test/benchmark/project-test/Python-project.csv")
`;

describe("Test-benchmark projection", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);

    await generatePython(
      modelPython,
      "testProject",
      "./src/test/benchmark/project-test/"
    );
    await generateR(
      modelR,
      "testProject",
      "./src/test/benchmark/project-test/"
    );

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/project-test/testProject.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/project-test/testProject.R",
      "R"
    );

    const outputFile = './src/test/benchmark/result/project-test-1.txt';
    const content = `Project benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_2);
    const modelR = await assertModelNoErrors(TH3toR_2);

    await generatePython(
      modelPython,
      "testProject",
      "./src/test/benchmark/project-test/"
    );
    await generateR(
      modelR,
      "testProject",
      "./src/test/benchmark/project-test/"
    );

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/project-test/testProject.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/project-test/testProject.R",
      "R"
    );

    const outputFile = './src/test/benchmark/result/project-test-2.txt';
    const content = `Project benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
});

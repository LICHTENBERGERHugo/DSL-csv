import { describe, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/benchmark/filter-test/data.csv"))
table.filter("department" == "GPM")
table.write("./src/test/benchmark/filter-test/R-filter.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/benchmark/filter-test/data.csv"))
table.filter("department" == "GPM")
table.write("./src/test/benchmark/filter-test/Python-filter.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/benchmark/filter-test/data.csv"))
table.filter([("department" == "INFO"), ("age" >= 20)])
table.write("./src/test/benchmark/filter-test/R-filter.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/benchmark/filter-test/data.csv"))
table.filter([("department" == "INFO"), ("age" >= 20)])
table.write("./src/test/benchmark/filter-test/Python-filter.csv")
`;

describe("Test-benchmark filter", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);

    await generatePython(
      modelPython,
      "testFilter",
      "./src/test/benchmark/filter-test/"
    );
    await generateR(modelR, "testFilter", "./src/test/benchmark/filter-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/filter-test/testFilter.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/filter-test/testFilter.R",
      "R"
    );
    const outputFile = './src/test/benchmark/result/filter-test-1.txt';
    const content = `Filter benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_2);
    const modelR = await assertModelNoErrors(TH3toR_2);

    await generatePython(
      modelPython,
      "testFilter",
      "./src/test/benchmark/filter-test/"
    );
    await generateR(modelR, "testFilter", "./src/test/benchmark/filter-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/filter-test/testFilter.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/filter-test/testFilter.R",
      "R"
    );
    const outputFile = './src/test/benchmark/result/filter-test-2.txt';
    const content = `Filter benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
});

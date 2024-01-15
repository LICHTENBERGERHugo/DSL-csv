import { describe, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/benchmark/computation-test/data.csv"))
table.compute(SUM,"age")
table.compute(COUNT,"age")
table.write("./src/test/benchmark/computation-test/R-computation.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/benchmark/computation-test/data.csv"))
table.compute(SUM,"age")
table.compute(COUNT,"age")
table.write("./src/test/benchmark/computation-test/Python-computation.csv")
`;

describe("Test-benchmark computation", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);

    await generatePython(
      modelPython,
      "testComputation",
      "./src/test/benchmark/computation-test/"
    );
    await generateR(
      modelR,
      "testComputation",
      "./src/test/benchmark/computation-test/"
    );

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/computation-test/testComputation.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/computation-test/testComputation.R",
      "R"
    );
    const outputFile = './src/test/benchmark/result/computation-test.txt';
    const content = `Computation benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
    
  });
});

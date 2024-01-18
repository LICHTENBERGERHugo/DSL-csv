import { describe, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");

const TH3toR = `
let csv = CSVFile("./src/test/benchmark/write-test/data.csv")
let table = Table(csv)
table.write("./src/test/benchmark/write-test/R-write.csv")
`;
const TH3toPython = `
let csv = CSVFile("./src/test/benchmark/write-test/data.csv")
let table = Table(csv)
table.write("./src/test/benchmark/write-test/Python-write.csv")
`;

describe("Test-benchmark add", () => {
  test("correct results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython);
    const modelR = await assertModelNoErrors(TH3toR);

    await generatePython(
      modelPython,
      "testWrite",
      "./src/test/benchmark/write-test/"
    );
    await generateR(modelR, "testWrite", "./src/test/benchmark/write-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/write-test/testWrite.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/write-test/testWrite.R",
      "R"
    );

    const outputFile = './src/test/benchmark/result/write-test.txt';
    const content = `Write benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
});

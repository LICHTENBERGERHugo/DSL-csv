import { describe, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");

const TH3toR = `
let csv = CSVFile("./src/test/benchmark/add-test/data.csv")
let table = Table(csv)

table.add("pierre,21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul,22, paris,GMA", "herve,23, lyon,INFO"])
table.write("./src/test/benchmark/add-test/R-add.csv")
`;

const TH3toPython = `
let csv = CSVFile("./src/test/benchmark/add-test/data.csv")
let table = Table(csv)

table.add("pierre,21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul,22, paris,GMA", "herve,23, lyon,INFO"])
table.write("./src/test/benchmark/add-test/Python-add.csv")
`;

describe("Test-benchmark add", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython);
    const modelR = await assertModelNoErrors(TH3toR);

    await generatePython(modelPython,"testAdd", "./src/test/benchmark/add-test/"
    );
    await generateR(modelR, "testAdd", "./src/test/benchmark/add-test/");

    const python_infor = await execGeneratedFile("./src/test/benchmark/add-test/testAdd.py","python");
    const r_infor = await execGeneratedFile("./src/test/benchmark/add-test/testAdd.R", "R");

    const outputFile = './src/test/benchmark/result/add-test.txt';
    const content = `Add benchmark\nPython:\nExecution Time: ${python_infor.executionTime} \nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
});

import { describe, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/benchmark/modif-test/data.csv"))
table.modify(2,"Hugo,22,Lyon,INFO")
table.write("./src/test/benchmark/modif-test/R-modif.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/benchmark/modif-test/data.csv"))
table.modify(2,"Hugo,22,Lyon,INFO")
table.write("./src/test/benchmark/modif-test/Python-modif.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/benchmark/modif-test/data.csv"))
table.modify(2,3,"GMA")
table.write("./src/test/benchmark/modif-test/R-modif.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/benchmark/modif-test/data.csv"))
table.modify(2,3,"GMA")
table.write("./src/test/benchmark/modif-test/Python-modif.csv")
`;

const TH3toR_3 = `
let table = Table(CSVFile("./src/test/benchmark/modif-test/data.csv"))
table.modify(2,"age",40)
table.write("./src/test/benchmark/modif-test/R-modif.csv")
`;
const TH3toPython_3 = `
let table = Table(CSVFile("./src/test/benchmark/modif-test/data.csv"))
table.modify(2,"age",40)
table.write("./src/test/benchmark/modif-test/Python-modif.csv")
`;

describe("Test-benchmark modification", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);

    await generatePython(
      modelPython,
      "testModif",
      "./src/test/benchmark/modif-test/"
    );
    await generateR(modelR, "testModif", "./src/test/benchmark/modif-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/modif-test/testModif.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/modif-test/testModif.R",
      "R"
    );

    const outputFile = './src/test/benchmark/result/modif-test-1.txt';
    const content = `Modif benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_2);
    const modelR = await assertModelNoErrors(TH3toR_2);

    await generatePython(
      modelPython,
      "testModif",
      "./src/test/benchmark/modif-test/"
    );
    await generateR(modelR, "testModif", "./src/test/benchmark/modif-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/modif-test/testModif.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/modif-test/testModif.R",
      "R"
    );

    
    const outputFile = './src/test/benchmark/result/modif-test-2.txt';
    const content = `Modif benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_3);
    const modelR = await assertModelNoErrors(TH3toR_3);

    await generatePython(
      modelPython,
      "testModif",
      "./src/test/benchmark/modif-test/"
    );
    await generateR(modelR, "testModif", "./src/test/benchmark/modif-test/");

    const python_infor = await execGeneratedFile(
      "./src/test/benchmark/modif-test/testModif.py",
      "python"
    );
    const r_infor = await execGeneratedFile(
      "./src/test/benchmark/modif-test/testModif.R",
      "R"
    );

    const outputFile = './src/test/benchmark/result/modif-test-3.txt';
    const content = `Modif benchmark\nPython:\nExecution Time: ${python_infor.executionTime}\nMemory Consumption: ${python_infor.memoryConsumption} MB\n
R:\nExecution Time: ${r_infor.executionTime}\nMemory Consumption:${r_infor.memoryConsumption} MB`;

    fs.writeFileSync(outputFile, content);
  });
});

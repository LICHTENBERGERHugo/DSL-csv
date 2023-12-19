import { describe, test, expect } from "vitest";
import { execGeneratedFile, generatePython, generateR } from "../../../cli/generator.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/comparison/computation-test/data.csv"))
table.compute(SUM,"age")
table.compute(COUNT,"age")
table.write("./src/test/comparison/computation-test/R-computation.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/comparison/computation-test/data.csv"))
table.compute(SUM,"age")
table.compute(COUNT,"age")
table.write("./src/test/comparison/computation-test/Python-computation.csv")
`;

describe("Test-comparison computation", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);


    await generatePython(modelPython, "testComputation", "./src/test/comparison/computation-test/");
    await generateR(modelR, "testComputation", "./src/test/comparison/computation-test/");

    await execGeneratedFile("./src/test/comparison/computation-test/testComputation.py", "python");
    await execGeneratedFile("./src/test/comparison/computation-test/testComputation.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs.createReadStream("./src/test/comparison/computation-test/Python-computation.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        pythonData.push(row);
      })
      .on("error", (error: any) => {
        console.error(
          "Erreur lors de la lecture du fichier CSV:",
          error.message
        );
      });
    await fs.createReadStream("./src/test/comparison/computation-test/R-computation.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });
    
  });
});

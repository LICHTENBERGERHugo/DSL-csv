import { describe, test, expect } from "vitest";
import { execGeneratedFile, generatePython, generateR } from "../../../cli/generator.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const TH3toR = `
let csv = CSVFile("./src/test/comparison/write-test/data.csv")
let table = Table(csv)
table.write("./src/test/comparison/write-test/R-write.csv")
`;
const TH3toPython = `
let csv = CSVFile("./src/test/comparison/write-test/data.csv")
let table = Table(csv)
table.write("./src/test/comparison/write-test/Python-write.csv")
`;

describe("Test-comparison add", () => {
  test("correct results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython);
    const modelR = await assertModelNoErrors(TH3toR);


    await generatePython(modelPython, "testWrite", "./src/test/comparison/write-test/");
    await generateR(modelR, "testWrite", "./src/test/comparison/write-test/");

    await execGeneratedFile("./src/test/comparison/write-test/testWrite.py", "python");
    await execGeneratedFile("./src/test/comparison/write-test/testWrite.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs.createReadStream("./src/test/comparison/write-test/Python-write.csv")
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
    await fs.createReadStream("./src/test/comparison/write-test/R-write.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });
    
  });
});

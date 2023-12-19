import { describe, test, expect } from "vitest";
import { execGeneratedFile, generatePython, generateR } from "../../../cli/generator.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/comparison/filter-test/data.csv"))
table.filter("department" == "GPM")
table.write("./src/test/comparison/filter-test/R-filter.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/comparison/filter-test/data.csv"))
table.filter("department" == "GPM")
table.write("./src/test/comparison/filter-test/Python-filter.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/comparison/filter-test/data.csv"))
table.filter([("department" == "INFO"), ("age" >= 20)])
table.write("./src/test/comparison/filter-test/R-filter.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/comparison/filter-test/data.csv"))
table.filter([("department" == "INFO"), ("age" >= 20)])
table.write("./src/test/comparison/filter-test/Python-filter.csv")
`;

describe("Test-comparison filter", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);


    await generatePython(modelPython, "testFilter", "./src/test/comparison/filter-test/");
    await generateR(modelR, "testFilter", "./src/test/comparison/filter-test/");

    await execGeneratedFile("./src/test/comparison/filter-test/testFilter.py", "python");
    await execGeneratedFile("./src/test/comparison/filter-test/testFilter.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs.createReadStream("./src/test/comparison/filter-test/Python-filter.csv")
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
    await fs.createReadStream("./src/test/comparison/filter-test/R-filter.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });
    
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_2);
    const modelR = await assertModelNoErrors(TH3toR_2);


    await generatePython(modelPython, "testFilter", "./src/test/comparison/filter-test/");
    await generateR(modelR, "testFilter", "./src/test/comparison/filter-test/");

    await execGeneratedFile("./src/test/comparison/filter-test/testFilter.py", "python");
    await execGeneratedFile("./src/test/comparison/filter-test/testFilter.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs.createReadStream("./src/test/comparison/filter-test/Python-filter.csv")
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
    await fs.createReadStream("./src/test/comparison/filter-test/R-filter.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });

  });
});

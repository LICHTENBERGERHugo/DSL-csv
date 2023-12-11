import { describe, test, expect } from "vitest";
import { execGeneratedFile, generatePython, generateR } from "../../../cli/generator.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/comparison/modif-test/data.csv"))
table.modify(2,"Hugo,22,Lyon,INFO")
table.write("./src/test/comparison/modif-test/R-modif.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/comparison/modif-test/data.csv"))
table.modify(2,"Hugo,22,Lyon,INFO")
table.write("./src/test/comparison/modif-test/Python-modif.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/comparison/modif-test/data.csv"))
table.modify(2,3,"GMA")
table.write("./src/test/comparison/modif-test/R-modif.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/comparison/modif-test/data.csv"))
table.modify(2,3,"GMA")
table.write("./src/test/comparison/modif-test/Python-modif.csv")
`;

const TH3toR_3 = `
let table = Table(CSVFile("./src/test/comparison/modif-test/data.csv"))
table.modify(2,"age",40)
table.write("./src/test/comparison/modif-test/R-modif.csv")
`;
const TH3toPython_3 = `
let table = Table(CSVFile("./src/test/comparison/modif-test/data.csv"))
table.modify(2,"age",40)
table.write("./src/test/comparison/modif-test/Python-modif.csv")
`;

describe("Test-comparison modification", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);


    await generatePython(modelPython, "testModif", "./src/test/comparison/modif-test/");
    await generateR(modelR, "testModif", "./src/test/comparison/modif-test/");

    await execGeneratedFile("./src/test/comparison/modif-test/testModif.py", "python");
    await execGeneratedFile("./src/test/comparison/modif-test/testModif.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs.createReadStream("./src/test/comparison/modif-test/Python-modif.csv")
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
    await fs.createReadStream("./src/test/comparison/modif-test/R-modif.csv")
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


    await generatePython(modelPython, "testModif", "./src/test/comparison/modif-test/");
    await generateR(modelR, "testModif", "./src/test/comparison/modif-test/");

    await execGeneratedFile("./src/test/comparison/modif-test/testModif.py", "python");
    await execGeneratedFile("./src/test/comparison/modif-test/testModif.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs.createReadStream("./src/test/comparison/modif-test/Python-modif.csv")
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
    await fs.createReadStream("./src/test/comparison/modif-test/R-modif.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });

  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_3);
    const modelR = await assertModelNoErrors(TH3toR_3);


    await generatePython(modelPython, "testModif", "./src/test/comparison/modif-test/");
    await generateR(modelR, "testModif", "./src/test/comparison/modif-test/");

    await execGeneratedFile("./src/test/comparison/modif-test/testModif.py", "python");
    await execGeneratedFile("./src/test/comparison/modif-test/testModif.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs.createReadStream("./src/test/comparison/modif-test/Python-modif.csv")
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
    await fs.createReadStream("./src/test/comparison/modif-test/R-modif.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });

  });
});

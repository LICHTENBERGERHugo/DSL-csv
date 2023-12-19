import { describe, test, expect } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generateR } from "../../../cli/generateR.js";
import { generatePython } from "../../../cli/generatePython.js";
import { assertModelNoErrors } from "../../utils.js";
const fs = require("fs");
const csv = require("csv-parser");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete(2) // delete 1 row
table.write("./src/test/comparison/delete-test/R-delete.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete(2) // delete 1 row
table.write("./src/test/comparison/delete-test/Python-delete.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete("age") // delete 1 column
table.write("./src/test/comparison/delete-test/R-delete.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete("age") // delete 1 column
table.write("./src/test/comparison/delete-test/Python-delete.csv")
`;

const TH3toR_3 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete([1,2,3]) // delete rows
table.write("./src/test/comparison/delete-test/R-delete.csv")
`;
const TH3toPython_3 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete([1,2,3]) // delete rows
table.write("./src/test/comparison/delete-test/Python-delete.csv")
`;

const TH3toR_4 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete(["name","department"]) // delete cols 
table.write("./src/test/comparison/delete-test/R-delete.csv")
`;
const TH3toPython_4 = `
let table = Table(CSVFile("./src/test/comparison/delete-test/data.csv"))
table.delete(["name","department"]) // delete cols 
table.write("./src/test/comparison/delete-test/Python-delete.csv")
`;

describe("Test-comparison delete", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/comparison/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/comparison/delete-test/");

    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.py",
      "python"
    );
    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.R",
      "R"
    );

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/delete-test/Python-delete.csv")
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
    await fs
      .createReadStream("./src/test/comparison/delete-test/R-delete.csv")
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

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/comparison/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/comparison/delete-test/");

    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.py",
      "python"
    );
    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.R",
      "R"
    );

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/delete-test/Python-delete.csv")
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
    await fs
      .createReadStream("./src/test/comparison/delete-test/R-delete.csv")
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

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/comparison/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/comparison/delete-test/");

    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.py",
      "python"
    );
    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.R",
      "R"
    );

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/delete-test/Python-delete.csv")
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
    await fs
      .createReadStream("./src/test/comparison/delete-test/R-delete.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });
  });
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_4);
    const modelR = await assertModelNoErrors(TH3toR_4);

    await generatePython(
      modelPython,
      "testDelete",
      "./src/test/comparison/delete-test/"
    );
    await generateR(modelR, "testDelete", "./src/test/comparison/delete-test/");

    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.py",
      "python"
    );
    await execGeneratedFile(
      "./src/test/comparison/delete-test/testDelete.R",
      "R"
    );

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/delete-test/Python-delete.csv")
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
    await fs
      .createReadStream("./src/test/comparison/delete-test/R-delete.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });
  });
});

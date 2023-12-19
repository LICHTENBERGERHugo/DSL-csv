import { describe, test, expect } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generateR } from "../../../cli/generateR.js";
import { generatePython } from "../../../cli/generatePython.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const TH3toR_1 = `
let table = Table(CSVFile("./src/test/comparison/project-test/data.csv"))
table.project(["name"])
table.write("./src/test/comparison/project-test/R-project.csv")
`;
const TH3toPython_1 = `
let table = Table(CSVFile("./src/test/comparison/project-test/data.csv"))
table.project(["name"])
table.write("./src/test/comparison/project-test/Python-project.csv")
`;

const TH3toR_2 = `
let table = Table(CSVFile("./src/test/comparison/project-test/data.csv"))
table.project(["name","age"])
table.write("./src/test/comparison/project-test/R-project.csv")
`;
const TH3toPython_2 = `
let table = Table(CSVFile("./src/test/comparison/project-test/data.csv"))
table.project(["name","age"])
table.write("./src/test/comparison/project-test/Python-project.csv")
`;

describe("Test-comparison projection", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython_1);
    const modelR = await assertModelNoErrors(TH3toR_1);

    await generatePython(
      modelPython,
      "testProject",
      "./src/test/comparison/project-test/"
    );
    await generateR(
      modelR,
      "testProject",
      "./src/test/comparison/project-test/"
    );

    await execGeneratedFile(
      "./src/test/comparison/project-test/testProject.py",
      "python"
    );
    await execGeneratedFile(
      "./src/test/comparison/project-test/testProject.R",
      "R"
    );

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/project-test/Python-project.csv")
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
      .createReadStream("./src/test/comparison/project-test/R-project.csv")
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
      "testProject",
      "./src/test/comparison/project-test/"
    );
    await generateR(
      modelR,
      "testProject",
      "./src/test/comparison/project-test/"
    );

    await execGeneratedFile(
      "./src/test/comparison/project-test/testProject.py",
      "python"
    );
    await execGeneratedFile(
      "./src/test/comparison/project-test/testProject.R",
      "R"
    );

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/project-test/Python-project.csv")
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
      .createReadStream("./src/test/comparison/project-test/R-project.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });
  });
});

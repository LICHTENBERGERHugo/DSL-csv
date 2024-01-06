import { describe, test, expect } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const TH3toR = `
let csv = CSVFile("./src/test/comparison/add-test/data.csv")
let table = Table(csv)

table.add("pierre,21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul,22, paris,GMA", "herve,23, lyon,INFO"])
table.write("./src/test/comparison/add-test/R-add.csv")
`;

const TH3toPython = `
let csv = CSVFile("./src/test/comparison/add-test/data.csv")
let table = Table(csv)

table.add("pierre,21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul,22, paris,GMA", "herve,23, lyon,INFO"])
table.write("./src/test/comparison/add-test/Python-add.csv")
`;

describe("Test-comparison add", () => {
  test("same results", async () => {
    const modelPython = await assertModelNoErrors(TH3toPython);
    const modelR = await assertModelNoErrors(TH3toR);

    await generatePython(
      modelPython,
      "testAdd",
      "./src/test/comparison/add-test/"
    );
    await generateR(modelR, "testAdd", "./src/test/comparison/add-test/");

    await execGeneratedFile(
      "./src/test/comparison/add-test/testAdd.py",
      "python"
    );
    await execGeneratedFile("./src/test/comparison/add-test/testAdd.R", "R");

    const pythonData: any[] = [];
    const rData: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/add-test/Python-add.csv")
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
      .createReadStream("./src/test/comparison/add-test/R-add.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        rData.push(row);
      })
      .on("end", () => {
        expect(rData).toEqual(pythonData);
      });
  });
});

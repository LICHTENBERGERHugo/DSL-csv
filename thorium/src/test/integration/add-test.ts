import { describe, test, expect } from "vitest";
import { execGeneratedFile, generatePython } from "../../cli/generator.js";
import { parseDocument } from "langium/test";
import { AstNode, EmptyFileSystem, LangiumDocument } from "langium";
import { Model } from "../../language/generated/ast.js";
import { createThoriumServices } from "../../language/thorium-module.js";

const fs = require("fs");
const csv = require("csv-parser");

const services = createThoriumServices(EmptyFileSystem).Thorium;

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.add("pierre, 21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul, 22, paris,GMA", "herve, 23, lyon,INFO"])
table.write("./generated/data2.csv")
`;

describe("Test-integration add", () => {
  test("correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testAdd", "./generated/");

    await execGeneratedFile("./generated/testAdd.py", "python");
    // Read the contents of data2.csv
    // Créez un tableau pour stocker les données CSV
    const data1: any[] = [];
    const data2: any[] = [];

    // Lisez le fichier CSV
    await fs
      .createReadStream("./generated/data.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        // Traitez chaque ligne de données CSV
        data1.push(row);
      })
      .on("end", () => {
        //read data2.csv
        fs.createReadStream("./generated/data2.csv")
          .pipe(csv())
          .on("data", (row: any) => {
            // Traitez chaque ligne de données CSV
            data2.push(row);
          })
          .on("end", () => {
            //write data1 and data2 in text.txt
            expect(data1).toEqual([
              { age: "21", city: "rennes", name: "pierre" },
            ]);
          });
      })
      .on("error", (error: any) => {
        // En cas d'erreur pendant la lecture du fichier
        console.error(
          "Erreur lors de la lecture du fichier CSV:",
          error.message
        );
      });
  });
});

async function assertModelNoErrors(modelText: string): Promise<Model> {
  var doc: LangiumDocument<AstNode> = await parseDocument(services, modelText);
  const db = services.shared.workspace.DocumentBuilder;
  await db.build([doc], { validation: true });
  const model = doc.parseResult.value as Model;
  expect(model.$document?.diagnostics?.length).toBe(0);
  return model;
}

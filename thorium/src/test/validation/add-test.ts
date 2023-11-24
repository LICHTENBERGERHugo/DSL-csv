import { describe, expect, test } from "vitest";
import { Model } from "../../language/generated/ast.js";
import { parseDocument } from "langium/test";
import { AstNode, EmptyFileSystem, LangiumDocument } from "langium";
import { generatePython } from "../../cli/generator.js";
import { createThoriumServices } from "../../language/thorium-module.js";
import * as fs from "node:fs";

const services = createThoriumServices(EmptyFileSystem).Thorium;

describe("Test add", () => {
  test("correct formation", async () => {
    const model = await assertModelNoErrors(`
    let csv = CSVFile("data.csv")
let table = Table(csv)

table.add("hugo, 21, rennes")
table.add(["hugo,21,rennes", "paul, 22, paris", "jean, 23, lyon"])
    `);
    const file = generatePython(model, "test", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data).toEqual(
          `import pandas as pd\r\ncsv= "data.csv"\r\ntable = pd.read_csv(csv)\r\nvalues = "hugo, 21, rennes"\r\nnew_row = pd.Series(values.split(","))\r\ntable = table.append(new_row, ignore_index=True)\r\nnew_values = ["hugo,21,rennes","paul, 22, paris","jean, 23, lyon"]\r\nfor row in new_values:\r\n    values = row.split(',')\r\n    new_row = pd.Series(values)\r\n    table = table.append(new_row, ignore_index=True)\r\n`
        );
      }
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

import { describe, expect, test } from "vitest";
import { Model } from "../../language/generated/ast.js";
import { parseDocument } from "langium/test";
import { AstNode, EmptyFileSystem, LangiumDocument } from "langium";
import { generatePython } from "../../cli/generator.js";
import { createThoriumServices } from "../../language/thorium-module.js";
import * as fs from "node:fs";

const services = createThoriumServices(EmptyFileSystem).Thorium;

describe("Test delete", () => {
  test("correct formation", async () => {
    const model = await assertModelNoErrors(`
    let table = Table(CSVFile("data.csv"))

    table.delete(2)
    table.delete("age")
    table.delete([1,2,3]) 
    table.delete(["name","departement"])
    `);
    const file = generatePython(model, "test", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data).toEqual(
          `import pandas as pd\r\ntable = pd.read_csv("data.csv")\r\ntable = table.drop(2)\r\ntable = table.drop("age", axis=1)\r\ntable = table.drop([1,2,3])\r\ntable = table.drop(["name","departement"], axis=1)\r\n
          `
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

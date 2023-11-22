import { describe, expect, test } from "vitest";
import { Model } from "../language/generated/ast.js";
import { parseDocument } from "langium/test";
import { AstNode, EmptyFileSystem, LangiumDocument } from "langium";
import { generatePython } from "../cli/generator.js";
import { createThoriumServices } from "../language/thorium-module.js";
import * as fs from "node:fs";

const services = createThoriumServices(EmptyFileSystem).Thorium;

describe("Test basic declarations", () => {
  test("Test CSVFile", async () => {
    const model = await assertModelNoErrors(`
            let csv = CSVFile("data.csv")
            let table = Table(csv)
        `);
    const file = generatePython(model, "test", undefined);

    await fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data).toBe(
          `import pandas as pd\r\ncsv= "data.csv"\r\ntable = pd.read_csv(csv)\r\n`
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

import { test, describe, expect } from "vitest";
import { generatePython } from "../cli/generator.js";
import { AstNode, EmptyFileSystem, LangiumDocument } from "langium";
import { parseDocument } from "langium/test";
import { createThoriumServices } from "../language/thorium-module.js";
import { Model } from "../language/generated/ast.js";

const services = createThoriumServices(EmptyFileSystem).Thorium;

describe("test hoang function", () => {
  test("print", async () => {
    const model = await assertModelNoErrors(`
            let csv = CSVFile("data.csv")
            let table = Table(csv)
            
            table.print()
        `);
    const test = generatePython(model, "data.csv", undefined);
    expect(test).toBe(`import pandas as pd
        csv= "data.csv"
        table = pd.read_csv(csv)`);
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

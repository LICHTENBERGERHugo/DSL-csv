import { AstNode, EmptyFileSystem, LangiumDocument } from "langium";
import { createThoriumServices } from "../language/thorium-module.js";
import { parseDocument } from "langium/test";
import { expect } from "vitest";
import { Model } from "../language/generated/ast.js";

const services = createThoriumServices(EmptyFileSystem).Thorium;

async function assertModelNoErrors(modelText: string): Promise<Model> {
  var doc: LangiumDocument<AstNode> = await parseDocument(services, modelText);
  const db = services.shared.workspace.DocumentBuilder;
  await db.build([doc], { validation: true });
  const model = doc.parseResult.value as Model;
  expect(model.$document?.diagnostics?.length).toBe(0);
  return model;
}

export { assertModelNoErrors };

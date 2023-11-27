import { describe, expect, test } from "vitest";
import { Model } from "../../language/generated/ast.js";
import { parseDocument } from "langium/test";
import { AstNode, EmptyFileSystem, LangiumDocument } from "langium";
import { generatePython, generateR } from "../../cli/generator.js";
import { createThoriumServices } from "../../language/thorium-module.js";
import * as fs from "node:fs";
import { diff } from "jest-diff";

const services = createThoriumServices(EmptyFileSystem).Thorium;

const expectedPython = `import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
values = "pierre, 21, rennes,GMA".split(",")
new_row = pd.DataFrame([values],columns=table.columns)
table = pd.concat([table,new_row], ignore_index=True)
new_values = ["serge,21,rennes,GMA","paul, 22, paris,GMA","herve, 23, lyon,INFO"]
for row in new_values:
	values = row.split(",")
	new_row = pd.DataFrame([values],columns=table.columns)
	table = pd.concat([table,new_row], ignore_index=True)
`;
const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.add("pierre, 21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul, 22, paris,GMA", "herve, 23, lyon,INFO"])`;
const expectedR = `csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table[nrow(table) + 1,] <- c("pierre",21," rennes","GMA")
rows <- list(c("serge",21,"rennes","GMA"),c("paul",22," paris","GMA"),c("herve",23," lyon","INFO"))
for (row in rows){
	table[nrow(table) + 1,] <- row
}
`;

describe("Test add", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);

    const file = generatePython(model, "add", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.replace(/\r\n/g, "\n")).toBe(expectedPython);
      }
    });
  });
  test("correct R code", async () => {
    const model = await assertModelNoErrors(th3Code);
    const file = generateR(model, "add", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
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

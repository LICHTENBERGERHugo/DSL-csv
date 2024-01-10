import { describe, expect, test } from "vitest";
import { generatePython } from "../../cli/generatePython.js";
import { generateR } from "../../cli/generateR.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const expectedPython = `import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table = table[(table['department'] == "INFO") & (table['age'] >= 20)]
table.to_csv("./src/test/integration/filter/generated.csv",index=False)
`;
const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.filter([("department" == "INFO"), ("age" >= 20)])

table.write("./src/test/integration/filter/generated.csv")
`;

const expectedR = `csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- subset(table, department == "INFO" & "age" >= 20)
write.csv(table, "./src/test/integration/filter/generated.csv", row.names=FALSE, quote=FALSE)
`;

describe("Test filter", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);

    const file = generatePython(model, "testFilter", undefined);

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
    const file = generateR(model, "testFilter", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});

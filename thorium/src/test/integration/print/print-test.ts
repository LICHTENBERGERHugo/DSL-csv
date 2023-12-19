import { describe, expect, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generateR } from "../../../cli/generateR.js";
import { generatePython } from "../../../cli/generatePython.js";
import { assertModelNoErrors } from "../../utils.js";

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)
table.print()
`;

const expectedPython = `name  age      city department\r\n0     Hugo   21      Lyon       INFO\r\n1     Theo   22       Gap        GPM\r\n2   Arthur   22    Rennes       INFO\r\n3     Jean   45     Paris         MA\r\n4  Jacques   69  Toulouse       INFO`;
const expectedR = `name age     city department\r\n1    Hugo  21     Lyon       INFO\r\n2    Theo  22      Gap        GPM\r\n3  Arthur  22   Rennes       INFO\r\n4    Jean  45    Paris         MA\r\n5 Jacques  69 Toulouse       INFO`;

describe("Test-integration print", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testPrint", "./src/test/integration/print/");

    const res = await execGeneratedFile(
      "./src/test/integration/print/testPrint.py",
      "python"
    );
    expect(res.replace(/\n\r/g, "\n")).toBe(
      expectedPython.replace(/\n\r/g, "")
    );
  });

  test("R correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generateR(model, "testPrint", "./src/test/integration/print/");

    const res = await execGeneratedFile(
      "./src/test/integration/print/testPrint.R",
      "R"
    );

    expect(res.replace(/\n\r/g, "")).toBe(expectedR.replace(/\n\r/g, ""));
  });
});

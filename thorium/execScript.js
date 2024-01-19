import { assertModelNoErrors, generatePython, execGeneratedFile } from "./utils";
module.exports = async (filepath) => {
const model = await assertModelNoErrors(file);

    await generatePython(model, "testAdd", "./src/test/integration/add/");

    await execGeneratedFile("./src/test/integration/add/testAdd.py", "python");
}
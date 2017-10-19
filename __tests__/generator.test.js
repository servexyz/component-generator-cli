const log = console.log;

test("createFiles should return 3 files", () => {
  const path = require("path");
  const { createFiles, deleteFiles } = require("component-generator-lib");
  let component = "Foo";
  let structure = "solo-test-lazy";
  let expectedFiles = ["Foo.js", "Foo.test.js", "index.js"];
  let directory = "deleteMe";
  let createdFiles = createFiles(structure, component, directory);
  expect(String(createdFiles)).toBe(String(expectedFiles));
  let deleteDirectory = path.join(__dirname, "../", directory);
  log(`Delete directory: ${deleteDirectory}`);
  deleteFiles(deleteDirectory);
});

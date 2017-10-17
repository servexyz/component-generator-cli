const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const mkdirp = require("mkdirp");
const log = console.log;
const { COMPONENT, COMPONENT_EXPORT } = require("./templates.js");

/*
  Procedural Steps;
  =================
  <cfc>index::
    <cfc>parseFormat: gets structure and extensions
        <cfc>fileFactory
          <cfc>createDirectory: creates directory
          <cfc>parseTemplate: gets template and interpolates with parsed format
          <cfc>createFile: creates all empty files
          <fs>writeFile: write all templated files
*/
var formatFilePath: string = path.join(__dirname, "/format.json");
var formatStructureArr: Array<string> = [];
var formatExtensionsObj: mixed = {};

function grabValueOfKeyFromObject(
  key: string,
  obj: mixed
): Array<string> | mixed {
  for (const [k, v] of Object.entries(obj)) {
    if (k == key) {
      return v;
    }
  }
}

function parseFormat(
  structure: Array<string> | string = "solo-test-lazy",
  extensions: Array<string> | string = "vanilla"
) {
  /*
    ------------------------------------------
    The following two examples are equivalent
    ------------------------------------------
    Manual (without format.json):
    @@structure: ["Component.$js, Component.test.js", "index.js"]
    @@extensions: { "$js": "js", "$css": "scss"}

    Standard (with format.json):
    @@structure: "solo"
    @@extensions:  "js-scss"
  */
  let flag: boolean = false;
  if (typeof structure === "string" && typeof extensions === "string") {
    let formatPath: string = formatFilePath;
    let formatObject: Object = require(formatPath);
    let formatStructure: Array<string> = formatObject.structure;
    let formatExtensions: mixed = formatObject.extensions;
    let extKey: string = extensions;
    let structKey: string = structure;
    formatStructureArr = grabValueOfKeyFromObject(structKey, formatStructure);
    formatExtensionsObj = grabValueOfKeyFromObject(extKey, formatExtensions);
    flag = true;
  }
  return flag;
}

async function interpolateTemplate(component) {}
function createDirectory(directoryName: string) {
  mkdirp(directoryName, err => {
    err
      ? console.error(`createDirectory failed: ${err}`)
      : console.log(`${directoryName} was created.`);
  });
}

function createFile(filePath: string) {
  fs.writeFile(filePath, "", "utf-8", error => {
    error
      ? console.error("createFile() failed")
      : log(
          `${filePath} was created here: ${process.cwd()}/${creationLocation}/${filePath}`
        );
  });
}
async function createFileFactory(
  components: Array<string>,
  componentDirectory: string = "/"
) {
  //Note: need to mutate c to include the entire path
  try {
    for (let c of components) {
      let where = path.join(process.cwd(), c);
      createFile(c);
      log(`Where: ${where}`);
    }
  } catch (error) {
    console.error(`createFileFactory failed. ${error}`);
  }
}
async function factory(
  components: Array<string>,
  rootCreationLocation: string = "/"
) {
  /* Note:
    path.join will only occur in factory to ensure no conflicts. Treated similar to dumb components with no state.
    */
  let createdDirectories: Array<string> = [];
  if (parseFormat()) {
    try {
      for (let c of components) {
        let location = path.join(process.cwd(), rootCreationLocation);
        createDirectory(c, location);
        let newDirectory = c + location;
        log(`newDirectory: ${newDirectory}`);
        createdDirectories.push(newDirectory);
      }
      return true;
    } catch (error) {
      console.error(`Factory failed. ${error}`);
      return false;
    }
  }
}
module.exports = factory;

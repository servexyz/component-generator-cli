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

async function parseFormat(
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
function createDirectory(
  directoryName: string,
  creationLocation: string = "/"
) {
  let where = path.join(process.cwd(), creationLocation, directoryName);
  mkdirp(where, err => {
    err
      ? console.error(`createDirectory failed: ${err}`)
      : console.log(`Directory: ${where} was created`);
  });
}
function createFile(fileName: string, creationLocation: string = "/") {
  fs.writeFile(fileName, "", "utf-8", error => {
    error
      ? console.error("createFile() failed")
      : log(
          `${fileName} was created here: ${process.cwd()}/${creationLocation}/${fileName}`
        );
  });
}
async function factory(
  components: Array<string>,
  rootCreationLocation: string = "/"
) {
  log(`process.cwd(): ${process.cwd()}`);
  try {
    let createdDirectories: Array<string> = [];
    for (let c of components) {
      let location = path.join(process.cwd(), rootCreationLocation, components);
      createDirectory(c, creationLocation);
      createdDirectories.push(c);
    }
    let f = await createFilesFactory(components);
    log(`directories: ${f}`);
    return f;
  } catch (error) {
    console.error(`Factory failed. ${error}`);
    return false;
  }
}
module.exports = factory;

const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const mkdirp = require("mkdirp");
const log = console.log;
const { COMPONENT, COMPONENT_EXPORT } = require("./templates.js");

var formatFilePath: string = path.join(__dirname, "/format.json");
var formatStructureArr: Array<string> = [];

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

function parseFormat(structure: Array<string> | string = "solo-test-lazy") {
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
  if (typeof structure === "string") {
    let formatPath: string = formatFilePath;
    let formatObject: Object = require(formatPath);
    let formatStructure: Array<string> = formatObject.structure;
    let structKey: string = structure;
    formatStructureArr = grabValueOfKeyFromObject(structKey, formatStructure);
    flag = true;
  }
  return flag;
}

// async function interpolateFileContent(component) {}
async function interpolateFileNames(component: string) {
  let struct: Array<string> = formatStructureArr; //this global var was instantiated in parseFormat()
  struct.map(val => {
    return val.replace("Component", component);
  });
  log(`Struct: ${struct}`);
}
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
async function createComponentFiles(
  component: string,
  componentDirectory: string = "/"
) {
  //Note: need to mutate c to include the entire path
  log(`component: ${component} && dir: ${componentDirectory}`);
  try {
    //TODO: call interpolate strings
    let filePaths: Array<string> = interpolateFileNames(component);
    for (let f of filePaths) {
      let here = path.join(process.cwd(), f);
      createFile(here);
      log(`Here: ${here}`);
    }
  } catch (error) {
    console.error(`createComponentFiles failed. ${error}`);
  }
}
async function factory(
  components: Array<string>,
  rootCreationLocation: string = "/"
) {
  /*
    Note: path.join will only occur in factory to ensure no conflicts. Treated similar to dumb components with no state.
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
        createComponentFiles(c, newDirectory);
        //todo: call createFilesFactory
      }
      return true;
    } catch (error) {
      console.error(`Factory failed. ${error}`);
      return false;
    }
  }
}
module.exports = factory;

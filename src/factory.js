const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const mkdirp = require("mkdirp");
const log = console.log;
const chalk = require("chalk");
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
function interpolateFileNames(component: string): Array<string> {
  let struct: Array<string> = formatStructureArr; //this global var was instantiated in parseFormat()
  let regex = /([A-Z])\w+/;
  let fileNames: Array<string> = struct.map(file => {
    file.replace(regex, component);
  });
  log(`\n\nfileNames in interpolateFileNames: ${String(fileNames)}\n\n`);
  return fileNames;
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
      ? console.error(`createFile() failed. ${error}`)
      : log(`${filePath} was created`);
  });
}
function createComponentFiles(
  component: string,
  componentDirectory: string = "/"
) {
  //Note: need to mutate c to include the entire path
  log(`component: ${chalk.red(component)} && dir: ${componentDirectory}`);
  //TODO: call interpolate strings
  let filePaths: Array<string> = interpolateFileNames(component);
  log(`\nfilePaths: ${String(filePaths)}`);
  for (let f of filePaths) {
    let here = path.join(componentDirectory, f);
    createFile(here);
    log(`${chalk.yellow("Here: " + here)}`);
  }
}
function factory(components: Array<string>) {
  let flag: boolean = false;
  if (parseFormat()) {
    for (let c of components) {
      let location = process.cwd();
      let newDirectory = location + c + "/";
      createDirectory(c, location);
      log(`newDirectory: ${newDirectory}`);
      createComponentFiles(c, newDirectory);
    }
    flag = true;
  }
  return flag;
}
module.exports = factory;

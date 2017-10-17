"use strict";

const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const mkdirp = require("mkdirp");
const log = console.log;
const { COMPONENT, COMPONENT_EXPORT } = require("./templates.js");

var formatFilePath = path.join(__dirname, "/format.json");
var formatStructureArr = [];

function grabValueOfKeyFromObject(key, obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (k == key) {
      return v;
    }
  }
}

function parseFormat(structure = "solo-test-lazy") {
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
  let flag = false;
  if (typeof structure === "string") {
    let formatPath = formatFilePath;
    let formatObject = require(formatPath);
    let formatStructure = formatObject.structure;
    let structKey = structure;
    formatStructureArr = grabValueOfKeyFromObject(structKey, formatStructure);
    flag = true;
  }
  return flag;
}

// async function interpolateFileContent(component) {}
async function interpolateFileNames(component) {
  let struct = formatStructureArr; //this global var was instantiated in parseFormat()
  struct.map(val => {
    return val.replace("Component", component);
  });
  log(`Struct: ${struct}`);
}
function createDirectory(directoryName) {
  mkdirp(directoryName, err => {
    err ? console.error(`createDirectory failed: ${err}`) : console.log(`${directoryName} was created.`);
  });
}

function createFile(filePath) {
  fs.writeFile(filePath, "", "utf-8", error => {
    error ? console.error("createFile() failed") : log(`${filePath} was created here: ${process.cwd()}/${creationLocation}/${filePath}`);
  });
}
async function createComponentFiles(component, componentDirectory = "/") {
  //Note: need to mutate c to include the entire path
  log(`component: ${component} && dir: ${componentDirectory}`);
  try {
    //TODO: call interpolate strings
    let filePaths = interpolateFileNames(component);
    for (let f of filePaths) {
      let here = path.join(process.cwd(), f);
      createFile(here);
      log(`Here: ${here}`);
    }
  } catch (error) {
    console.error(`createComponentFiles failed. ${error}`);
  }
}
async function factory(components, rootCreationLocation = "/") {
  /*
    Note: path.join will only occur in factory to ensure no conflicts. Treated similar to dumb components with no state.
  */
  let createdDirectories = [];
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
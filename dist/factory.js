"use strict";

const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const mkdirp = require("mkdirp");
const log = console.log;
const chalk = require("chalk");
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
function interpolateFileNames(component) {
  let struct = formatStructureArr; //this global var was instantiated in parseFormat()
  let regex = /([A-Z])\w+/;
  let fileNames = struct.map(file => {
    file.replace(regex, component);
  });
  log(`\n\nfileNames in interpolateFileNames: ${String(fileNames)}\n\n`);
  return fileNames;
}
function createDirectory(directoryName) {
  mkdirp(directoryName, err => {
    err ? console.error(`createDirectory failed: ${err}`) : console.log(`${directoryName} was created.`);
  });
}

function createFile(filePath) {
  fs.writeFile(filePath, "", "utf-8", error => {
    error ? console.error(`createFile() failed. ${error}`) : log(`${filePath} was created`);
  });
}
function createComponentFiles(component, componentDirectory = "/") {
  //Note: need to mutate c to include the entire path
  log(`component: ${chalk.red(component)} && dir: ${componentDirectory}`);
  //TODO: call interpolate strings
  let filePaths = interpolateFileNames(component);
  log(`\nfilePaths: ${String(filePaths)}`);
  for (let f of filePaths) {
    let here = path.join(componentDirectory, f);
    createFile(here);
    log(`${chalk.yellow("Here: " + here)}`);
  }
}
function factory(components) {
  let flag = false;
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
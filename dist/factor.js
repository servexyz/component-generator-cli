"use strict";

const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

function factory(components) {
  log(`Components being passed: ${components}`);
  components.map(c => {
    let dir = createDirectory(c);
    try {
      let files = createFiles(c, dir);
      return files;
    } catch (error) {
      console.error(`${chalk.red("createFiles in factory failed.")} ${error}`);
    }
  });
}
function createDirectory(component) {
  let flag = null;
  mkdirp(component, err => {
    err ? flag = false : flag = true;
  });
  if (flag == true) {
    return component; //return name of component which will be used as directory
  }
  return flag; //if null or false
}
function createFile(component) {
  fs.writeFile(component, "", "utf-8", error => {
    error ? console.error(`createFile() failed. ${error}`) : log(`${component} was created`);
  });
}
function createFiles(component, directory) {
  var formatConfig = path.join(__dirname, "/format.json");
  var formatObject = require(formatConfig);
  log(`formatObject: ${JSON.stringify(formatObject)}`);
  var structure = formatObject.structure;
  let templatedFileNames = grabValueOfKeyFromObject("structure", structure);
  log(`\n\nTemplatedFileNames: ${templatedFileNames}`);
  log("\n\nStructure: " + JSON.stringify(structure));
  if (structure) {
    let files = templatedFileNames.map(tfn => {
      let file = tfn.replace(/([A-Z])\w+/, component);
      let here = path.join(process.cwd(), directory, file);
      log(`${chalk.green("Here: " + here)}`);
      return createFile(here);
    });
    return files;
  } else {
    console.log(`${chalk.red("structure isn't defined. Current value: ")} ${structure}`);
    return false;
  }
}

function grabValueOfKeyFromObject(key, obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (k == key) {
      return v;
    }
  }
}

module.exports = factory;
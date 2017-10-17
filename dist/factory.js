"use strict";

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
var formatFilePath = path.join(__dirname, "/format.json");
var formatStructureArr = [];
var formatExtensionsObj = {};

function grabValueOfKeyFromObject(key, obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (k == key) {
      return v;
    }
  }
}

async function parseFormat(structure = "solo-test-lazy", extensions = "vanilla") {
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
  if (typeof structure === "string" && typeof extensions === "string") {
    let formatPath = formatFilePath;
    let formatObject = require(formatPath);
    let formatStructure = formatObject.structure;
    let formatExtensions = formatObject.extensions;
    let extKey = extensions;
    let structKey = structure;
    formatStructureArr = grabValueOfKeyFromObject(structKey, formatStructure);
    formatExtensionsObj = grabValueOfKeyFromObject(extKey, formatExtensions);
    flag = true;
  }
  return flag;
}
async function interpolateTemplate(component) {}
function createDirectory(directoryName) {
  let where = path.join(process.cwd(), directoryName);
  mkdirp(where, err => {
    err ? console.error(`createDirectory failed: ${err}`) : console.log(`Directory: ${where} was created`);
  });
}
function createFile(fileName, creationLocation = "/") {
  fs.writeFile(fileName, "", "utf-8", error => {
    error ? console.error("createFile() failed") : log(`${fileName} was created here: ${process.cwd()}/${creationLocation}/${fileName}`);
  });
}
// function parseTemplate(template: string, componentName: string) {}

async function factory(directoryNames, rootCreationLocation = "/") {
  log(`inside factory`);
  try {
    let locale = path.join(process.cwd(), rootCreationLocation);
    log(`directoryNames: ${JSON.stringify(directoryNames)}`);
    createDirectory("test");
    return directoryNames;
  } catch (error) {
    console.error(`Factory failed. ${error}`);
    return false;
  }
}

module.exports = factory;
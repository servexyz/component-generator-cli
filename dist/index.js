"use strict";

const vorpal = require("vorpal")();
const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const log = console.log;
const { COMPONENT, COMPONENT_EXPORT } = require("./templates.js");

/*
 Procedural Steps;
 1. [optional] setFormat()
 2. [required] parseFormat(format.structure, format.extensions)
 3. [required] componentFactory => componentGenerator => directory/files*
*/

var formatFilePath = path.join(__dirname, "/format.json");
var formatStructureArr = [];
var formatExtensionsObj = {};

function getFormatPath(filePath) {
  return new Promise((resolve, reject) => {
    !empty(filePath) ? resolve(filePath) : reject(`Filepath wasn't provided to getFormatPath. Pass <string> formatFilePath as default`);
  });
}

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
  if (typeof structure === "string" && typeof extensions === "string") {
    // EXTRACT AND SPLIT
    let formatPath = "";
    log(`${formatFilePath}`);
    try {
      formatPath = await getFormatPath(formatFilePath);
    } catch (error) {
      throw new Error(error);
    }
    let formatObject = require(formatPath);
    let formatStructure = formatObject.structure;
    let formatExtensions = formatObject.extensions;
    //
    let extKey = extensions;
    let structKey = structure;
    let formatStructureOption = this.grabValueOfKeyFromObject(structKey, formatStructure);
    let formatExtensionsOption = this.grabValueOfKeyFromObject(extKey, formatExtensions);
    log(formatStructureArr);
  }
}

function parseTemplate(template, componentName) {}

function fileFactory(rootCreationLocation = "/", directoryNames) {
  let locale = path.join(process.cwd(), rootCreationLocation);
  log(`directoryNames: ${directoryNames}`);
}

vorpal.command("m [components...]", "Creates 1 or more component directories").action(function (args, cb) {
  fileFactory("/", args.components);
  cb();
});

vorpal.delimiter("component-factory-cli$").show();
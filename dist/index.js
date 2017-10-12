"use strict";

const vorpal = require("vorpal")();
const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const log = console.log;

/*
 Procedural Steps;
 1. [optional] setFormat()
 2. [required] parseFormat(format.structure, format.extensions)
 3. [required] componentFactory => componentGenerator => directory/files*
*/

var formatFilePath = path.join(__dirname, "/format.json");
var formatStructureArr = [];
var formatExtensionsObj = {};

function getFormatPath(filePath = formatFilePath) {
  let cfp = filePath;
  if (!empty(cfp)) {
    return cfp;
  }
  return null;
}

function grabValueOfKeyFromObject(key, obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (k == key) {
      return v;
    }
  }
}

function parseFormat(structure = "solo-test-lazy", extensions = "vanilla") {
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
    let formatObject = require(getFormatPath());
    let formatStructure = formatObject.structure;
    let formatExtensions = formatObject.extensions;
    //
    let extKey = extensions;
    let structKey = structure;
    let formatStructureArr = grabValueOfKeyFromObject(structKey, formatStructure);
    let formatExtensionsObj = grabValueOfKeyFromObject(extKey, formatExtensions);
    log(formatStructureArr);
  }
}

function fileFactory(rootCreationLocation = "/", directoryNames) {
  let locale = path.join(process.cwd(), rootCreationLocation);
  log(`directoryNames: ${directoryNames}`);
}

vorpal.command("m [components...]", "Creates 1 or more component directories").action(function (args, cb) {
  fileFactory("/", args.components);
  cb();
});

vorpal.delimiter("component-factory-cli$").show();
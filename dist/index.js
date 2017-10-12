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

var format = path.join(__dirname, "/format.json");
function getFormatPath(configFilePath) {
  let cfp = configFilePath;
  if (!empty(cfp)) {
    format = cfp;
  }
  return format;
}

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
function parseFormat(structure = "solo-test-lazy", extensions = "vanilla") {
  let formatStructureArr;
  let formatExtensionArr;
  if (typeof structure === "string" && typeof extensions === "string") {
    let extKey = extensions;
    let structKey = structure;
    let formatObject = {};
    log(`format location: ${format}`);
    fs.readFile(format, "utf8", (err, data) => {
      if (err) {
        console.error(`Failed to read file. ${err}`);
      }
      formatObject = data;
      log(`Format obj: ${data}`);
    });
    // var formatStructure = formatObject.structure;
    // var formatExtensions = formatObject.extensions;
    // for (const [key, value] of Object.entries(formatStructure)) {
    //   log(`key: ${key} val: ${value}`);
    //   if (key == structKey) {
    //     formatSructureArray = value;
    //   }
    // }
    // for (const [key, value] of Object.entries(formatExtensions)) {
    //   log(`key: ${key} val: ${value}`);
    //   if (key == extKey) {
    //     formatExtensionArr = value;
    //   }
  }
}
//   log("formatStructure: " + String(formatStructureArr));
//   log("formatExtension: " + String(formatExtensionArr));
// }

function fileFactory(rootCreationLocation = "/", directoryNames) {
  let locale = path.join(process.cwd(), rootCreationLocation);
  log(`Locale: ${locale}`);
}

fileFactory();
parseFormat();
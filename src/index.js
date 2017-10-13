// @flow

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

function parseFormat(
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
  if (typeof structure === "string" && typeof extensions === "string") {
    // EXTRACT AND SPLIT
    let formatPath: string = formatFilePath;
    let formatObject: Object = require(formatPath);
    let formatStructure: Array<string> = formatObject.structure;
    let formatExtensions: mixed = formatObject.extensions;
    //
    let extKey: string = extensions;
    let structKey: string = structure;
    let formatStructureOption: Array<string> = this.grabValueOfKeyFromObject(
      structKey,
      formatStructure
    );
    let formatExtensionsOption: mixed = this.grabValueOfKeyFromObject(
      extKey,
      formatExtensions
    );
    log(formatStructureArr);
  }
}

function parseTemplate(template, componentName) {}

function fileFactory(
  rootCreationLocation: string = "/",
  directoryNames: Array<string>
) {
  let locale = path.join(process.cwd(), rootCreationLocation);
  log(`directoryNames: ${String(directoryNames)}`);
}

vorpal
  .command("m [components...]", "Creates 1 or more component directories")
  .action(function(args, cb) {
    fileFactory("/", args.components);
    cb();
  });

vorpal.delimiter("component-factory-cli$").show();

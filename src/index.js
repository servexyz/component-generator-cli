/* @flow */
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

var format = path.join(__dirname, '/format.json');

function getFormatPath(configFilePath: string): string {
  let cfp = configFilePath;
  if(!(empty(cfp))){
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
function parseFormat(structure: Array<string> | string, extensions: Array<string> | string): Array<string> {
  if((typeof structure === "string") && (typeof extensions === "string")) {
    let formatFile = getFormatPath();
    fs.readFile('file', 'utf8', (err, data) => {
      var formatObject = data;
    });
    var formatStructure = formatObject.structure;
    var formatExtensions = formatObject.extensions;
  }
  for (const [key, value] of Object.entries(formatStructure)) {
  }
}

function fileFactory(
  rootCreationLocation = "/" : string,
  directoryNames: Array<string>
) {
  let locale = path.join(process.cwd(), rootCreationLocation);

}
fileFactory();
/*
 Create directories. Populate with files.
*/
// async function createFile(targetDirectory, text) {
//   try {
//     fs.writeFile();
//   } catch (error) {
//     return error;
//   }
// }

/* @flow */
const vorpal = require("vorpal")();
const fs = require("fs");
const path = require("path");
const empty = require("is-empty");
const log = console.log;

/*
 Procedural Steps;
 1. [optional] setFormat()
 2. [required] parseFormat(format)
 3.
*/

const format = path.join(__dirname, '/format.json');

function setFormat() {

}
function parseFormat() {

}

function fileFactory(
  rootCreationLocation = "/" : string,
  directoryNames: Array<string>
) {
  let locale = path.join(process.cwd(), rootCreationLocation);
  // if (empty(textObject)) {
  // } else {
  // }
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

const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

function factory(
  components: Array<string>,
  fileStructure: string = "solo-test-lazy"
) {
  log(`Components being passed: ${components}`);
  components.map(c => {
    let dir = createDirectory(c);
    log(`Dir: ${dir}`);
    try {
      let files: Array<string> = createFiles(fileStructure, c, dir);
      return files;
    } catch (error) {
      console.error(`${chalk.red("createFiles in factory failed.")} ${error}`);
    }
  });
}
function createDirectory(component: string) {
  let flag: boolean = null;
  mkdirp(component, err => {
    err ? (flag = false) : (flag = true);
  });
  if (flag == true) {
    return component; //return name of component which will be used as directory
  }
  return flag; //if null or false
}
function createFile(component: string) {
  fs.writeFile(component, "", "utf-8", error => {
    error
      ? console.error(`createFile() failed. ${error}`)
      : log(`${component} was created`);
  });
}
function createFiles(preferredFileStructure, component, directory) {
  var formatConfig: string = path.join(__dirname, "/format.json");
  var formatObject: Object = require(formatConfig);
  var structure: Array<string> = formatObject.structure;

  let templatedFileNames = grabValueOfKeyFromObject(
    preferredFileStructure,
    structure
  );
  log(`\n\nTemplatedFileNames: ${templatedFileNames}`);
  log("\n\nStructure: " + JSON.stringify(structure));
  if (templatedFileNames) {
    let files = templatedFileNames.map(tfn => {
      let file = tfn.replace(/([A-Z])\w+/, component);
      log(`File: ${file}`);
      log(`process.cwd(): ${process.cwd()}`);
      log(`directory: ${directory}`);
      log(`file: ${file}`);
      let here = path.join(process.cwd(), directory, file);
      log(`Here: ${here}`);
      createFile(here);
    });
    return files;
  } else {
    console.log(
      `${chalk.red(
        "templatedFileNames isn't defined. Current value: "
      )} ${templatedFileNames}`
    );
    return false;
  }
}

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

module.exports = factory;

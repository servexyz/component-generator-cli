const fs = require("fs");
const log = console.log;

function factory(components) {
  log(`Components being passed: ${components}`);
}

module.exports = factory;

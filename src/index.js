#!/usr/bin/env node
// @flow

const generator = require("./generator");
const vorpal = require("vorpal")();

vorpal
  .command("m [components...]", "Creates 1 or more component directories")
  .action(function(args, cb) {
    generator(args.components);
    cb();
  });

vorpal.delimiter("component-generator-cli$").show();

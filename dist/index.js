#!/usr/bin/env node
"use strict";

const generator = require("./generator");
const vorpal = require("vorpal")();

vorpal
  .command("m [components...]", "Creates 1 or more component directories")
  .action(function(args, cb) {
    generator(args.components);
    cb();
  });

vorpal.delimiter("component-generator-cli$").show();

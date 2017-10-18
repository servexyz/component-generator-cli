"use strict";

const factory = require("./factory");
const vorpal = require("vorpal")();

vorpal.command("m [components...]", "Creates 1 or more component directories").action(function (args, cb) {
  factory(args.components);
  cb();
});

vorpal.delimiter("component-factory-cli$").show();
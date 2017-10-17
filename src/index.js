// @flow
const factory = require("./factor");
const vorpal = require("vorpal")();
vorpal
  .command("m [components...]", "Creates 1 or more component directories")
  .action(function(args, cb) {
    //Input: command abc def
    //Output: { "options": {}, "components": ['abc', 'def']}
    factory(args.components);
    cb();
  });

vorpal.delimiter("component-factory-cli$").show();

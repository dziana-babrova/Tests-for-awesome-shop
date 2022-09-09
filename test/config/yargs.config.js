const argv = require("yargs/yargs")(process.argv.slice(4))
  .scriptName("npm run wdio")
  .usage("Usage: $0 -- -b [browser name] -t [number of instances] -h")
  .example("$0 -- -b firefox -t 3 -h")
  .option("h", {
    alias: "headless",
    type: "boolean",
    default: false,
    describe: "set headless browser mode",
  })
  .option("b", {
    alias: "browser",
    type: "string",
    default: "firefox",
    describe: "set browser",
  })
  .option("t", {
    alias: "threads",
    type: "number",
    describe: "set number of browser instances",
    demandOption: "Please provide number of browser instances",
  })
 .help().argv;

module.exports = argv;
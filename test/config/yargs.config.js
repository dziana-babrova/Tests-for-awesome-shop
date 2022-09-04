const options = require("yargs")
  .scriptName("npm run wdio")
  .option("h", {
    alias: "headless",
    type: "boolean",
    default: false,
    describe: "set headless browser mode",
  })
  .option("b", {
    alias: "browser",
    type: "string",
    default: "chrome",
    describe: "set browser",
  })
  .option("t", {
    alias: "threads",
    type: "number",
    default: 1,
    describe: "set number of browser instances",
    // demandOption: "Please provide number of browser instances",
  })
  // .demandOption(["threads"], "Please provide number of browser instances")
  .help().argv;

module.exports = options;
const fs = require("fs");
const helpers = {}

// convention file name: functionName_helper.js
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "helper.js") {
    let funcName = file.replace(/_helper.js/, "");
    helpers[funcName] = require(`./${file}`)
  }
})

module.exports = helpers;

if (process.env.NODE_ENV === "process") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}

const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

require("./models/User");
require("./services/passport");

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// });

if (process.env.NODE_ENV === "production") {
  //Experess serves up the file like main.js or main.css
  app.use(express.static("client/build"));

  //Express serves up index.html for the routes which it doesnt know

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

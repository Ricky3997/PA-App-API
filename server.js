const express = require("express");
const routes = require("./routes");
const authRoutes = require("./routes/auth");
const authService = require("./service/auth");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const healthcheck = require('express-healthcheck');

const port = process.env.PORT || 5000;
const initDb = require('./service/db').initDb;
require("dotenv").load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/UI/build")));

app.use("/auth", authRoutes);

//  Connect all our routes to our application
app.use("/api", authService.checkToken, routes);

app.use('/health', healthcheck());

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/UI/build/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong, sorry!");
});

initDb(() => {
  app.listen(port, () => console.log("App is listening on port " + port  + "; started at " + new Date().toString()));
});


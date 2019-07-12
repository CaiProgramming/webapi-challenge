const express = require("express");
const app = express();
const actions = require("./routes/actions");
const projects = require("./routes/projects");
const port = process.env.PORT || 3000;

let server = app.listen(port);

app.use("/api/actions", actions);
//app.use("/api/projects", projects);
console.log(`Runnng on port ${port}`);

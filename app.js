require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const dburl = process.env.dburl;
mongoose.connect(dburl);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(require("./routes/auth.route"));
app.use(require("./routes/workshala.route"));
app.get("/", (req, res) => {
  res.send(
    '<center><h1 style="color : green; font-family : lucida sans ">Server Entry Point</h1></center>'
  );
});
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

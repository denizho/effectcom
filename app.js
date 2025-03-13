const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4041;

app.use(cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT}`);
});

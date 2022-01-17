const express = require("express");
const app = express();
const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/success/:fileName", (req, res) => {
  // res.sendFile(path.join(__dirname, `public/${req.params.fileName}.zip`));
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.post("/compress", (req, res) => {
  console.log(req.body);
  var zip = new JSZip();
  zip.file("Hello.txt", "Hello World\n");
  zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
    fs.writeFile("./public/example.zip", content, (error) => {
      if (error) {
        return res.json({
          status: "Error",
          error: error,
        });
      } else {
        return res.json({
          status: "Success",
          file: "example.zip",
        });
      }
    });
  });
});

app.listen("80", () => {
  console.log("Running");
});

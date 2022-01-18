const route = require("express").Router();
const fs = require("fs");
const path = require("path");
route.get("/:filename", (req, res) => {
  try {
    let dir = __dirname.split("/");
    dir.pop();
    dir = dir.join("/") + "/";
    res
      .status(200)
      .sendFile(path.join(dir, `public/temp/${req.params.filename}`));
    setTimeout(() => {
      fs.readdir(path.join(dir, `public/temp/`), (err, files) => {
        if (err) {
          return res.status(400).json({
            status: "Error",
            error: error,
          });
        } else {
          for (const file of files) {
            fs.unlink(
              path.join(path.join(dir, `public/temp/`), file),
              (err) => {
                if (err)
                  return res.status(400).json({
                    status: "Error",
                    error: error,
                  });
              }
            );
          }
        }
      });
    }, 2000);
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
});
module.exports = route;

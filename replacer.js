const zip = require('file-zip');
const replace = require("replace");
const exec = require('child_process').exec;
const fs = require('fs');

const [, , file, fromName, toName] = process.argv;

zip.unzip(file, 'output', (err) => {
  if (!err) {
    replace({
      regex: fromName,
      replacement: toName,
      paths: ["./output"],
      recursive: true
    });

    fs.readdir("./output", function (err, items) {
      const formattedItems = items.map(item => "./output/" + item);
      console.log("Zipping: ", formattedItems);

      exec("cd output;zip -r output.docx ./*;cp output.docx ../", (err) => {
        if (!err) {
          exec("rm -rf ./output");
        } else {
          console.log("Err", err)
        }
      });
    });

  } else {
    console.log("Error: ", err);
  }
});
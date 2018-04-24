const zip = require('file-zip');
const replace = require("replace");
const exec = require('child_process').exec;

const [, , file, fromName, toName] = process.argv;

zip.unzip(file, 'output-6d7s', (err) => {
  if (!err) {
    replace({
      regex: fromName,
      replacement: toName,
      paths: ["./output-6d7s"],
      recursive: true
    });

    exec("cd output-6d7s;zip -r output.docx ./*;cp output.docx ../", (err) => {
      if (!err) {
        exec("rm -rf ./output-6d7s");
      } else {
        console.log("Err", err)
      }
    });

  } else {
    console.log("Error: ", err);
  }
});
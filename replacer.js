const util = require("util");
const unzip = util.promisify(require('file-zip').unzip);
const replace = require("replace");
const exec = util.promisify(require('child_process').exec);

const [, , file, fromName, toName] = process.argv;

async function run() {
  try {
    await unzip(file, 'output-6d7s');

    replace({
      regex: fromName,
      replacement: toName,
      paths: ["./output-6d7s"],
      recursive: true
    });

    await exec("cd output-6d7s;zip -r output.docx ./*;cp output.docx ../");
    await exec("rm -rf ./output-6d7s");
  } catch (e) {
    console.log("Err", e)
  }
}

run();
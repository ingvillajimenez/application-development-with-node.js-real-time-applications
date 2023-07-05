var fs = require("fs");
var Step = require("step");

try {
  Step(
    function readData() {
      fs.readFile("data.txt", "utf8", this);
    },
    function modify(err, text) {
      if (err) throw err;
      console.log(text);
      return text + "aaa";
    },
    function writeData(err, text) {
      if (err) throw err;
      fs.writeFile("data.txt", "helloUS", this);
    }
  );
} catch (err) {
  console.log(err);
}

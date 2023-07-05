var fs = require("fs");
var async = require("async");

function loadFile2(path, callback) {
  var f;

  async.waterfall(
    [
      function (cb) {
        // cb stands for "callback"
        fs.open(path, "r", cb);
      },
      // the handle was passed to the callback at the end of
      // the fs.open function call, async passes ALL params to us.
      function (handle, cb) {
        f = handle;
        fs.fstat(f, cb);
      },
      function (stats, cb) {
        var b = new Buffer(stats.size);

        if (stats.isFile()) {
          fs.read(f, b, 0, stats.size, null, cb);
        } else {
          callback(make_error("not_file", "Cant load directory"));
        }
      },
      function (bytesRead, buffer, cb) {
        fs.close(f, function (err) {
          if (err) {
            cb(err);
          } else {
            cb(null, buffer.toString("utf8", 0, bytesRead));
          }
        });
      },
    ],
    // called after all fns have finished, or then there is an error.
    function (err, fileContent) {
      callback(err, fileContent);
    }
  );
}

loadFile2("text.txt", function (err, contents) {
  if (err) {
    console.log(err);
  } else {
    console.log(contents);
  }
});

function make_error(err, msg) {
  var e = new Error(msg);
  e.code = msg;
  return e;
}

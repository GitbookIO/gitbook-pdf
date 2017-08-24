var path = require('path');
var exec = require('child_process').exec;

// PhantomJS binary
var PHANTOMJS = path.resolve(__dirname, "../node_modules/.bin/phantomjs");
var RASTERIZE = path.resolve(__dirname, "rasterize.js");

var generate = function(input, output, options) {
    options = options || {};
    var command = [
        PHANTOMJS,
        RASTERIZE,
        input,
        output,
        options.format || "A4"
    ].join(" ");

    return new Promise(function(resolve, reject) {
      var child = exec(command, function (error, stdout, stderr) {
          if (error) {
              error.message = error.message + " "+stdout;
              return reject(error);
          }
          console.log(stdout);
          resolve();
      });
    });
};

module.exports = {
    generate: generate
};

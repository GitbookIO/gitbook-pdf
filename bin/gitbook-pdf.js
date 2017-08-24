#! /usr/bin/env node

// Requires
var _ = require('lodash');
var path = require('path');
var prog = require('commander');

var pkg = require("../package.json");
var pdf = require("../lib/index.js");

// General options
prog
.version(pkg.version)
.option('-f, --format <pdf format>', 'Output format for the PDF: "5in*7.5in", "10cm*20cm", "A4", "Letter", default is A4');

prog
.command('generate [input] [output]')
.description('Generate a PDF file from an HTML file')

.action(function(input, output, options) {
    pdf.generate(input, output, options)
    .then(function() {
        console.log("Done!");
    }, function(err) {
        console.log(err.message || err);
        return Promise.reject(err);
    });
});

// Parse and fallback to help if no args
if(_.isEmpty(prog.parse(process.argv).args) && process.argv.length === 2) {
    prog.help();
}

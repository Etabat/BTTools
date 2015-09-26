var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
router.get('/answers/:id/:submission', function(req, res) {
  var id = req.params.id;
  var submission = req.params.submission;
  console.log('Router.get received your request');
  fs.readdir('./' + id + '/' + submission, function (err, files) {
    if (err) {
      console.log("Error reading files: ", err);
    } else {
      var answers = [];
      files.forEach(function(file){
        console.log(file);
      });
      for (var counter = 0; counter < files.length; counter++){
        var answer = fs.readFileSync(__dirname + '/' + id + '/' + submission + '/' + files[counter],  "utf-8");
        answers.push(JSON.parse(answer))
      }
      res.send(answers);
    }
  });
});
// so you can set two parameters and it doesn't matter which xhr request is sent,
// you can create an argument and store things based off their storage
router.post('/answers/:id/:submission', jsonParser, function (req, res) {
  console.log('hello world');
  var id = req.params.id;
  var submission = req.params.submission;
  console.log(req.url);
  fs.stat('./' + id, function (err, stats) {
    if (err) {
      console.log(err);
      fs.mkdirSync('./' + id);
    }
    console.log(stats);
  });
  fs.stat('./' + id + '/' + submission, function (err, stats) {
    if (err) {
      console.log(err);
      fs.mkdirSync('./' + id + '/' + submission);
    }
    console.log(stats);
  });
  var random = Math.floor((Math.random() * 1000) + 1);
  var dateNow = Date.now();
  var PATH_NAME = __dirname;
  fs.writeFile(PATH_NAME + '/' + id + '/' + submission + '/' + dateNow + '-' + random + '.json', JSON.stringify(req.body), function (error) {
    if (error) {
      fs.writeFileSync(PATH_NAME + '/' + id + '/' + submission + '/' + dateNow + '-' + random + '.json', JSON.stringify(req.body));
    }
  });
  res.send('File received ' + req.body);
});
router.get('/', function(req, res){
  res.send("GOT IT");
});
module.exports = router;
//// piping the data
//var readable = getReadableStreamSomehow();
//readable.on('data', function(chunk) {
//    console.log('got %d bytes of data', chunk.length);
//});
//readable.on('end', function() {
//    console.log('there will be no more data.');
//});

// watch stream and see any changes
// get the file changes and send the captured file path to redirect
// check out https://www.npmjs.com/package/send

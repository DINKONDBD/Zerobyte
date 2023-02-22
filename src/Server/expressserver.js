const express = require('express')
const cors = require('cors')
const app = express()
var MongoClient = require('mongodb').MongoClient;
const crypto = require("crypto");

const secret = "This is a company secret 🤫";

// create a sha-256 hasher
const sha256Hasher = crypto.createHmac("sha256", secret);

var url = "mongodb://localhost:27017/";

var db = "Zerobyte";
var col = "requests";

app.get('/get', cors(), function (req, res, next) {
  res.header("Content-Type",'application/json');

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Zerobyte");
    dbo.collection("requests").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result)
      db.close();
    });
  });
})

app.get('/send/:user/:description', function (req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Zerobyte");
    const ipAddress = req.socket.remoteAddress;
    var myobj = { name: req.params.user, address: req.params.description, ipAddr: ipAddress };
    dbo.collection("requests").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

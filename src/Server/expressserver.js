const express = require('express')
const cors = require('cors')
const mClient = require('mongodb-legacy').MongoClient;

//for mongodb

const URL = "mongodb://0.0.0.0:27017/";
const DB = "Zerobyte";
const COL = "requests";

// creating variable for express server

const app = express()

//etc
const PORT = 80;

//getting information from server
app.get('/get', cors(), (req, res) => {
  res.header("Content-Type",'application/json');

  mClient.connect(URL, (err, db) => {
    if (err) throw err;
    const dbo = db.db(DB);
    dbo.collection(COL).find({}).toArray((err, result) => {
      if (err) throw err;
      res.json(result)
      db.close();
    });
  });

})

//Sending information to server
app.get('/send/:user/:description', (req) => {
  mClient.connect(URL, (err, db) => {
    if (err) throw err;
    var dbo = db.db("Zerobyte");
    let sendOBJ = { name: req.params.user, address: req.params.description};

    dbo.collection(COL).insertOne(sendOBJ, (err, res) => {
      if (err) throw err;
      db.close();
    });
  });


});

app.listen(PORT)

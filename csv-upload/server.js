// Import express
const express = require('express');
const app = express();
// Import csvtojson module
const csv = require('csvtojson');
// Import Mongodb
const mongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Mongodb Connection URL 
const url = 'mongodb://localhost:27017/pr0jectA';

// Server up and running on port 7600
const server = app.listen(7600, (err, callback) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Your nodejs server running on port 7600');
  }
});



// Use connect method to connect to the Server
mongoClient.connect(url, (err, db) => {
  assert.equal(null, err);

  console.log("Connected correctly to server");

  insertDocuments(db, function () {
    db.close();
    process.exit();
  });
});




const insertDocuments = (db, callback) => {
  // Get the documents collection
  let collection = db.collection('questions');

  // CSV File Path
  const csvFilePath = 'file.csv';
  var arrQuestions = [];
  /**
   * Read csv file and save every row of
   * data on mongodb database
   */
  csv()
    .fromFile(csvFilePath)
    .on('csv', (csvRow) => {

      var row = csvRow.toString().split(',');
      console.log(row);

      var question = {};
      question.title = row[0];
      question.description = row[1];
      question.answers = splitColon(row[2], ':');
      question.correctanswer = row[3];
      question.type = row[4];
      question.category = splitColon(row[5], ':');
      question.hinturls = splitColon(row[6], ':');
      question.hinttexts = splitColon(row[7], ':');
      question.complexity = row[8];
      question.subcategory = splitColon(row[9], ':');
      question.status = row[10];
      var datetime = new Date();
      console.log(datetime);

      var audit = {}
      audit.createdBy = 'System';
      audit.modifiedBy = 'System';
      audit.createdDate = datetime;
      audit.modifiedDate = datetime;
      question.audit = audit;

      arrQuestions.push(question);
    })
    .on('done', (error) => {
      collection.insert(arrQuestions, function (error) {
        if (error) {
          return console.error(error);
        } else {
          console.log("Multiple documents inserted to Collection");
        }
      });
      console.log('end');
      // process.exit();
    });
}


function splitColon(source, delim) {
  var sourceArray = source.toString().split(delim);
  return sourceArray;
}

function isDelim(source, delim) {
  if (source.indexOf(delim) == -1) {
    return false;
  } else {
    return true;
  }
  return
}
const assert = require("assert");
const mongoose = require('mongoose');
const config = require("./../config");

let _db;

function initDb(callback) {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }

  mongoose.connect(config.mongodb.URI).then(() => {
      _db = mongoose.connection;
      if(!config.PROD_MODE){
        //TODOx2
      }
      return callback(null, _db)
  }, (err) => {
      console.error(err);
  });
}

function getDb() {
  assert.ok(_db, "Db has not been initialized. Please called init first.");
  return _db;
}


module.exports = { getDb, initDb };
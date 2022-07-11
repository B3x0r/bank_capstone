const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://MongoStandalone:RvGfX8jGDVVMY2y8@cluster0.acdj3.mongodb.net/?retryWrites=true&w=majority';
let db = null;

//connect to mongo
MongoClient.connect(url, {}, function(err, client) {
  console.log("DAL connected successfully to db server");
  console.log(err);
  //connect to my project database
  db = client.db('bank_capstone');
});

//create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 0};
    collection.insertOne(doc, {w:1}, function(err, result) {
      err ? reject(err) : resolve(doc);
    });
  })
}

//all users
function all(){
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      });
  })
}

module.exports = {create, all};
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://MongoStandalone:RvGfX8jGDVVMY2y8@cluster0.acdj3.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(url, {}, function(err, client) {
  console.log('Connected!');
  console.log(err);

  //database Name
  const dbName = 'bank_capstone';
  const db = client.db(dbName);

  //new user
  var name = 'user'+ Math.floor(Math.random()*10000);
  var email = name + '@mit.edu';

  //insert into customer table
  var collection = db.collection('customers');
  var doc = {name, email};
  collection.insertOne(doc, {w:1}, function(err, result) {
    console.log('Document insert');
  });

  var customers = db
    .collection('customers')
    .find()
    .toArray(function(err, docs) {
      console.log('Collection: ',docs);
      
      // clean up
      client.close();
    });
});
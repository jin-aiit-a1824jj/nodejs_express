var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/"
/*

// access db-sample
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  client.close();  
});

// create collection
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.createCollection("test", (error, collection)=>{
    client.close();
  });  
});

// get collections ltems
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.listCollections().toArray((error, items)=>{
    for (let item of items){
      console.log(item.name);
    }
    client.close();
  });  
});

// rename collection
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.renameCollection("test", "test_new", (error, collection)=>{
    console.log(collection.name);
    client.close();
  });  
});

// remove collection
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.dropCollection("test_new", (error)=>{
    client.close();
  });  
});

// add item in products
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.collection("products", (error, collection)=>{
    collection.insertMany([
      {name: "pen", price: 120},
      {name: "note", price: 100}
    ], (error, result)=>{
      client.close();
    });
  });  
});

// get item in products
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.collection("products", (error, collection)=>{
    collection.find({name: {$regex: /e/g}}).toArray((error, docs) => {
      for(let doc of docs){
        console.log(doc.name);
      }
      client.close();
    });
  });  
});

// update item in products
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.collection("products", (error, collection)=>{
    collection.updateMany(
      {name: /e/g},
      { $inc: {price: 20}},
      (error, results)=>{
        client.close();
      });
  });  
});


// remove item in products
MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.collection("products", (error, collection)=>{
    collection.deleteMany(
      {name: /e/g},
      (error, results)=>{
        client.close();
      });
  });  
});

*/
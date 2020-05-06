var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://user:user@localhost:27017/sample";

//https://qiita.com/mimizq/items/76d3a948acb33881c8db
MongoClient.connect(url, (error, client) => {

  if(error){
    return;
  }
  
  const db = client.db("sample");
  
  db.collection("products").bulkWrite([
    { insertOne : {name: "pen", price: 120}},
    { insertOne : {name: "note", price: 120}},
    { insertOne : {name: "eraser", price: 100}},
    { insertOne : {name: "paste", price: 180}},
    { insertOne : {name: "ciseaux", price: 320}},
    { insertOne : {name: "cellophane tape", price: 80}}
  ]);
  
  client.close();
  
});
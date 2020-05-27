var express = require('express')
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");
const adapter = new FileSync("db.json");
const db = low(adapter);
var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}
var list = db.get("listBook").value();
module.exports.default = (request, response) => {
  response.render("create.pug");
}
module.exports.defaultBook = (request, response) => {
  request.body.id = shortid.generate();
  db.get("listBook")
    .push(request.body)
    .write();
  response.render("index.pug",connect)
  response.redirect('/')
}
module.exports.search = (request, response) => {
  var q = request.query.q;
  if (q) {
    var itemFilter = list.filter(function(item) {
      if (item.text.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
        return item;
      }
    });
  } else {
    itemFilter = list;
  }
  response.render("index.pug", { list: itemFilter, q: q });
}
module.exports.changeBook = (req,res)=>{
  var id= req.params.id; 
  var findBook = db.get("listBook").find({id:id}).value()
  res.render("changeBook", {book: findBook})
}
module.exports.updateBook = (req,res)=>{
  var id = req.params.id;
  var newTitle = req.body.title;
  var newDes= req.body.des;
  db.get('listBook')
  .find({id: id})
  .assign({ title: newTitle, des: newDes})
  .value()
  res.render("index.pug",connect); 
}
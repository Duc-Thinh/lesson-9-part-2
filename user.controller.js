var express = require('express')
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");
const adapter = new FileSync("db.json");
const db = low(adapter);
var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}
var lists = db.get("userList").value();

module.exports.changeUser = function(request, response){
  var id = request.params.id;   
  var findUser = db.get("userList").find({ id: id }).value()
  response.render("changeUser.pug",{ user: findUser});
  
}
module.exports.deleteUser = (request, response) => {
  var id = request.params.id;
  db.get("userList")
    .remove({ id: id })
    .write();
    response.render("index.pug",connect)
  } 
module.exports.createUser = (req, res) =>{
  req.body.id = shortid.generate();
  db.get("userList").push(req.body).write()
  res.render("index.pug", connect);
}
module.exports.updateUser = (req,res)=>{
  var id = req.params.id;
  var newUser = req.body.user;
  db.get('userList')
  .find({id: id})
  .assign({ user: newUser})
  .value()
  res.render("index.pug",connect);
}
var express = require('express')
var router = express.Router()
module.exports = router
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");
const adapter = new FileSync("db.json");
const db = low(adapter);
var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}
var lists = db.get("userList").value();
var controller =  require('./user.controller.js')

router.get("/changeUser/:id", controller.changeUser )

router.get("/deleteUser/:id", controller.deleteUser);  
router.post("/", controller.createUser)

router.post("/changeUser/update/:id", controller.updateUser)

var express = require('express')
var router = express.Router()
module.exports = router
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");
const adapter = new FileSync("db.json");
const db = low(adapter);
var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}
var list = db.get("listBook").value();
var controller = require('./book.controller.js')
router.get("/", controller.default );

router.post("/create", controller.defaultBook);


router.get("/search", controller.search);

router.get("/changeBook/:id", controller.changeBook)
router.post("/updateBook/:id", controller.updateBook)



const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
app.set("views engine", "pug");
app.set("views", "./views");
const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.defaults({ listBook: [], userList: [], transactions: []}).write();

var list = db.get("listBook").value();
var lists = db.get("userList").value();

var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}

app.get("/", (request, response) => {
  response.render("index.pug",connect)
});
var userRoute = require('./user.route.js')
app.use("/users/deleteUser/:id", userRoute)
app.use("/users", userRoute)
app.use("/users/changeUser/:id", userRoute)
app.use("/users/changeUser/update/:id", userRoute)
var bookRoute = require('./book.route.js')
app.use("/books/create", bookRoute)
app.use("/books/changeBook/:id", bookRoute)
app.use("/books/updateBook/:id", bookRoute)

app.get("/transactions", (req,res)=>{
  var id = shortid.generate();
  res.render("transactions.pug", {lists:db.get("userList").value(),list:db.get("listBook").value(),id:id})
})
app.post("/transactions/create",(req,res)=>{
  var id = shortid.generate();
  var findUserId = db.get("userList").find({user: req.body.user}).value()
  var findBookId = db.get("listBook").find({title: req.body.book}).value()
  db.get("transactions").push({userId:findUserId.id,bookId: findBookId.id,id: id, isComplete: req.body.complete}).write()
  res.redirect('/')
})

app.get("/books/:id", (request, response) => {
  var id = request.params.id;
  db.get("listBook")
    .remove({ id: id })
    .write();
  response.render("index.pug",connect)
});

//listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

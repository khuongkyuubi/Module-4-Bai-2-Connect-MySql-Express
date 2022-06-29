const mysql = require('mysql');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

const upload = multer();

app.set("view engine", "ejs");
app.set("views", "./views")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql123456',
  database: 'dbTest',
  charset: 'utf8_general_ci'
});

connection.connect(function (err) {
  if (err) {
    throw err.stack;
  }
  else {
    console.log("connect success");
    const sqlCreate = `CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      price INT,quantity INT,
      author VARCHAR(255)
    )`;
    connection.query(sqlCreate, function (err, result) {
      if (err) throw err;
      console.log("Create table success");
    });
  }
});

app.get("/create", (req, res) => {
  res.render("create")
})

app.post("/book/create", upload.none(), (req, res) => {
  const { name, price, quantity, author } = req.body;
  const sqlInsert = "INSERT INTO books (name, price, quantity, author) VALUES ?";
  const value = [
    [name, price, quantity, author]
  ];
  connection.query(sqlInsert, [value], function (err, result) {
    if (err) throw err;
    res.render("success");
  });
});

app.get("/book/list", (req, res) => {
  const sql = "SELECT * FROM books";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.render("list", {books: result});
  });
})

app.get("/book/detail", (req, res) => {
  console.log(req.query);
  const sql = "SELECT * FROM books WHERE id =" + req.query.id;
   connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result, 'result')
    res.render("detail", {book: result[0]});
  });
})

app.post("/book/delete", (req, res) => {
  console.log(req.body);
  const sql = "DELETE FROM books WHERE id = " + req.body.id;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json({status: 200, message: "delete success"})
  });
})
app.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});

const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const upload = require('multer');
const {urlencoded} = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const path = require('path');
const employeeRouter = require('./routes/employee.router');
const employeeDB = require("./config/db");
const methodOverride = require("method-override");


// setup method overide
app.use(methodOverride("_method"));

// seting parse form
app.use(express.json()) // parse application/json
app.use(urlencoded({extended: true})) // parse application/x-www-form-urlencoded

// setting static file
app.use("/public",express.static( "public"));

//seting view engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", path.join("layouts", "layout"));

// connect with DB
employeeDB.connect()
    .then(() => {
        console.log("database connected")
    })
    .catch(err => {
        console.log(err.message)
    })

app.all("/", (req, res, next) => {
    res.render("index", {tittle: "Home page"})
    next();
})

app.use("/employee", employeeRouter);


app.listen(PORT, () => {
    console.log("You are listening on port ", PORT);
})
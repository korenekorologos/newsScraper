var bodyParser = require("body-parser"); 
var mongoose = require("mongoose");
var logger = require("morgan"); 

//initalizes the express app
var express = require("express");
var app = express(); 


//logger area
app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
); 

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"})
); 
app.set("view engine", "handlebars");

//local port 
var port = process.env.PORT || 3000; 
app.listen(port, function() {
    console.log("Listening on PORT " + port)
}); 






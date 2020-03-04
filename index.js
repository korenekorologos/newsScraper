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

//connects the app to our public folder 
app.use(express.static(process.cwd() + "/public")); 

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"})
); 
app.set("view engine", "handlebars");

//mongo connection
mongoose.connect("mongodb://localhost/scraped_news");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:")); 
db.once("open", function() {
    console.log("Connected to Mongoose!")
}); 


//local port 
var port = process.env.PORT || 3000; 
app.listen(port, function() {
    console.log("Listening on PORT " + port)
}); 






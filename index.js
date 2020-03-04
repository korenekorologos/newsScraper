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




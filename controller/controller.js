//this is the brains behind the whole project 

var express = require("express");
var router = express.Router();
var path = require("path");

//these are used for the scrapping
var requestPromise = require("requestPromise");
var cheerio = require("cheerio");

//connections to our models 
var comment = require("../models/comment");
var article = require("../models/article");

//the router 
router.get("/", function (req, res) {
    res.redirect("/articles");
});


//get request to scrape the website that we want to "get"
router.get("/scrape", function (req, res) {
    request("https://theweek.com/", function (error, response, html) {
        //this will load the info into cheerio and save it into the selector 
        var $ = cheerio.load(html);
        var titlesArray = [];
        
        //this will grab every class tage from the site that we're pulling from 
        


    })
});







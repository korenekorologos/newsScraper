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
    requestPromise("https://theweek.com/", function (error, response, html) {
        //this will load the info into cheerio and save it into the selector 
        var $ = cheerio.load(html);
        var titlesArray = [];

        //this will grab every class tage from the site that we're pulling from 
        $(".c-entry-box--compact_title").each(function (i, element) {
            var result{ };

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            //this will check for empty or duplicates before pushing into the database
            //function for the end point scrape 
            if (result.title !== "" && result.link !== "") {
                if (titlesArray.indexOf(result.title) == -1) {
                    titlesArray.push(result.title);

                    article.count({ title: result.title }, function (err, test) {
                        if (test === 0) {
                            var entry = new article(result);

                            entry.save(function (err, doc) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(doc);
                                }
                            });
                        }
                    });
                } else {
                    console.log("Sorry, butthis article already exitsis");
                } else {
                    console.log("This is missing some data");
                }
            });
        res.redirect("/");
    });
});

router.get("/articles", function (req, res) {
    article.find()
        .sort({ _id: -1 })
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                var artcl = { article: doc };
                res.render("index", artcl);
            }
        });
});

router.get("/articles-json", function (req, res) {
    article.find{ }, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    }); 
}); 

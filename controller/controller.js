//this is the brains behind the whole project 

var express = require("express");
var router = express.router();
var path = require("path");

//these are used for the scrapping
var axios = require("axios");
var cheerio = require("cheerio");

//connections to our models 
var Comment = require("../models/Comment");
var Article = require("../models/Article");

//the router 
router.get("/", function (req, res) {
    res.redirect("/articles");
});


//get request to scrape the website that we want to "get"
router.get("/scrape", function (req, res) {
    axios("https://theweek.com", function (error, response, html) {
        //this will load the info into cheerio and save it into the selector 
        var $ = cheerio.load(html);
        var titlesArray = [];

        //this will grab every class tage from the site that we're pulling from 
        $(".c-entry-box--compact_title").each(function (i, element) {
            var result = {};

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

                    Article.count({ title: result.title }, function (err, test) {
                        if (test === 0) {
                            var entry = new Article(result);

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
                    console.log("Sorry, but this article already exists");
                }
            } else {
                console.log("Looks like there is some data missing");
            }
        });
        res.redirect("/");
    });
});

router.get("/articles", function (req, res) {
    Article.find()
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


router.get("/articles-json", function(req, res) {
    Article.find({}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    }); 
});

router.get("/clearAll", function(req, res) {
    Article.remove({}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("articles have been removed");
        }
    });
res.redirect("/articles-json"); 
});

router.get("/readArticle/:id", function (req, res) {
    var articleId = req.params.id;
    var hbsObj = {
        article: [],
        body: []
    };

    Article.findOne({ _id: articleId })
        .populate("comment")
        .exec(function (err, doc) {
            if (err) {
                console.log("Error: " + err);
            } else {
                hbsObj.article = doc;
                var link = doc.link;
                requestPromise(link, function (error, response, html) {
                    var $ = cheerio.load(html);

                    $(".l-col_main").each(function (i, element) {
                        hbsObj.body = $(this)
                            .children(".c-entry-content")
                            .children("p")
                            .text();

                        res.render("article", hbsObj);
                        return false;
                    });
                });
            }
        });
});

router.post("/comment/:id", function (req, res) {
    var user = req.body.name;
    var content = req.body.comment;
    var artileID = req.params.id;

    var commentObj = {
        name: user,
        body: content
    };

    var newComment = new Comment(commentObj);

    newComment.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc._id);
            console.log(artileID);

            Article.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { comment: doc._id } },
                { new: true }
            ).exec(function (err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/readArticle/" + articleId);
                }
            });
        }
    });
});

module.exports = router; 
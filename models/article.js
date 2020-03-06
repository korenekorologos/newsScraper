var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    commeent: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

//article folder 
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article; 


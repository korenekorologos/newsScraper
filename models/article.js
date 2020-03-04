var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var articleSchema = new Schema({
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
var article = mongoose.model("article", articleSchema);
module.exports = article; 


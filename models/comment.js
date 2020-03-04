var mongoose = require("mongoose"); 

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
});


//comment folder 
var comment = mongoose.model("comment", commentSchema);
module.exports = comment; 



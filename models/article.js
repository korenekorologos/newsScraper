var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link {
        type: String,
        required: true
    },
    commeent: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

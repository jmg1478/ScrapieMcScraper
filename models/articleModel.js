var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    body:{
        type:String
    },
    link:{
        type:String
    }
});

var Note = mongoose.model('Article', ArticleSchema);
module.exports = ArticleSchema;
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var parser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
var axios = require("axios");
mongoose.connect();

const PORT = process.env.PORT || 8080;

app.use(parser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/scripts', express.static('public/scripts'));
app.use('/css', express.static('public/stylesheets'));
app.use('/img', express.static('public/img'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var Note = require('./models/noteModel.js');
var Article = require('./models/articleModel.js');



app.get("/", function(req, res){
  request("https://www.gameinformer.com", function (error, response, html) {
    var $ = cheerio.load(html);
    $("td.title:nth-child(3)>a").each(function(i, element) {

      var articleTitle = $(element).text();
      var articleLink = $(element).attr('href');

      var insertedArticle = new Article({
        title : articleTitle,
        link: articleLink
       });

  
      insertedArticle.save(function(err, dbArticle) {
        if (err) {
          console.log(err);
        } else {
          console.log(dbArticle);
        }
      });
    });
    res.render('index');
  });
});


app.get('/displayInfo', function(req, res) {
  Article.find({}, function(err, articleData) {
    if(err) {
      throw err;
    }
    res.json(articleData);
  });
});

app.listen(PORT, function(req, res){
  console.log('You are listening on port ', PORT);
});
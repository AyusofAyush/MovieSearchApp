var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('search');
});

app.get('/results',function(req,res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=87d368b5&s="+query;
    request(url,function(err,response,body){
        if(!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            if(data.Response==="False")
                res.render("error");
            else
                res.render("results",{data: data});
        }
    });
});

app.get('/show/:id', function(req,res){
    var id = req.params.id;
    var url = "http://www.omdbapi.com/?apikey=87d368b5&i="+id;
    request(url,function(err,response,body){
        if(!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            if(data.Response==="False")
                res.render("error");
            else
                res.render("show",{data: data});
        }
    });
});

app.get('/about',function(req,res){
    res.render('about');
});

app.listen(4000,function(err,succ){
    if(err)
        console.log(err);
    else
        console.log("Movie App Live at port 4000");
});
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//Install Mongoose
var mongoose = require('mongoose');

//Linking to mlab Database
var mongoDB = 'mongodb://Admin:root123@ds223268.mlab.com:23268/doylerbase';
mongoose.connect(mongoDB);

//Schema
var Schema = mongoose.Schema;

//Format For Entries
var postSchema = new Schema({
    title: String,
    content: String,
    date: Date
})

//Format for Shows
var showSchema = new Schema({
    title: String,
    info: String,
    epnum: String,
    snum: String
})

//mlab Data
var PostModel = mongoose.model('post', postSchema);
var ShowsModel = mongoose.model('show', showSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
    //Shows
    app.post('/api/shows', function(req, res){
        console.log("post successful");
        console.log(req.body.title);
        console.log(req.body.info);
        console.log(req.body.snum);
        console.log(req.body.epnum);
        
    
        ShowsModel.create({
            title: req.body.title,
            content: req.body.info,
            snum: req.body.snum,
            epnum: req.body.epnum
            
        });

        res.send('Show added');
    
    })

//Entries
    app.post('/api/posts', function(req, res){
        console.log("post successful");
        console.log(req.body.title);
        console.log(req.body.content);
        console.log(req.body.dateString);

    PostModel.create({
        title: req.body.title,
        content: req.body.content,
        date: req.body.dateString
    });
    res.send('Entry added');


})

//Entries
app.get('/api/posts', function(req, res){

    PostModel.find(function(err, data){

        res.json(data);
    })
})

//Shows
app.get('/api/shows', function(req, res){
       
    ShowsModel.find(function(err, data){

        res.json(data);

    });
})

//Entries
app.get('/api/posts/:id', function(req, res){
    console.log("Read post " +req.params.id);

    PostModel.findById(req.params.id, function (err, data) {
            res.json(data);
        });
})

//Shows
app.get('/api/shows/:id', function(req, res){
    console.log("Read post " +req.params.id);

    ShowsModel.findById(req.params.id, function (err, data) {
            res.json(data);
        });
})


app.put('/api/posts/:id', function(req, res){
    console.log("Update Post" +req.params.id);
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.dateString)

    PostModel.findByIdAndUpdate(req.params.id, req.body, 
        function(err, data){
            res.send(data);
        })
})

app.put('/api/shows/:id', function(req, res){
    console.log("Update Post" +req.params.id);
    console.log(req.body.title);
    console.log(req.body.info);
    console.log(req.body.epnum);
    console.log(req.body.snum);

    ShowsModel.findByIdAndUpdate(req.params.id, req.body, 
        function(err, data){
            res.send(data);
        })
})


//delete for Entries
app.delete('/api/posts/:id', function(req, res){
    console.log(req.params.id);

    PostModel.deleteOne({_id:req.params.id}, function(err, data)
    {
        if(err)
            res.send(err);
        res.send(data);
    })
})

//Delete for Shows
app.delete('/api/shows/:id', function(req, res){
    console.log(req.params.id);

    ShowsModel.deleteOne({_id:req.params.id}, function(err, data)
    {
        if(err)
            res.send(err);
        res.send(data);
    })
})





var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
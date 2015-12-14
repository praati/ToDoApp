var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var app = express();
var db = mongojs('todoApp',['tasks']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));

app.get('/tasks', function(req, res){
  db.tasks.find(function (err, docs) {
    console.log(docs);
   res.json(docs)
  });
});

app.post('/tasks', function(req, res){
  console.log(req.body);
  db.tasks.insert(req.body, function(err, doc){
      console.log(doc);
    res.json(doc);
  });
});

app.get('/tasks/:id', function (req, res) {
    var id=req.params.id;
    console.log(id);
    db.tasks.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        console.log(err);
        res.json(doc);
    });
   });

app.put('/tasks/:id', function(req,res){
    var id = req.params.id;
    var item = req.body;
    console.log(id);
    console.log(item);
    db.tasks.findAndModify({
        query: {_id: db.ObjectId(item._id)},
        update: {$set: {status: item.status}},
        new: true
    }, function (err, doc) {
       res.json(doc);
    });
});

app.delete('/tasks/:id', function (req, res) {
    console.log(req.params.id);
    db.tasks.remove({_id: db.ObjectId(req.params.id)}, function (err, doc) {
    });
});
var port = 4000;
app.listen(port);
console.log('listening to port ' + port);

module.exports = app;

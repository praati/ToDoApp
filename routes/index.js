var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('todoApp', ['tasks']);

router.get('/getAllTasks', function (req, res) {
  console.log('get request');
  db.tasks.find(function (err, tasks) {
    res.json(tasks);
  });
});

router.post('/addNewTask', function (req, res) {
  db.tasks.insert(req.body, function (err, newTask) {
    res.json(newTask);
  });
});
module.exports = router;

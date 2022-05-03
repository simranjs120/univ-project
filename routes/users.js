var express = require('express');
var router = express.Router();
var db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});

router.post('/student-register', function(req, res, next) {
  var s_name = req.body.studentname;
  var s_course = req.body.studentcourse;
  var s_email = req.body.studentemail;
  var s_password = req.body.studentpassword;
var sql = 'INSERT INTO student (name,course, email, password) VALUES ("'+s_name+'","'+s_course+'","'+s_email+'","'+s_password+'")';

db.query(sql,function (err, data) { 
    if (err) throw err;
       res.render('index');
});
});
module.exports = router;
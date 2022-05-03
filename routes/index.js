
// Requiring All needed packages
var express = require('express');
var router = express.Router();
var alert = require('alert');
var db = require('../database');
var app = express();
var bodyParser = require('body-parser');

// Declaring Variables to be used in the code
var type = "";
var flag = 0;
var nm = "";
var data1 = "";
var t_course1 = "";
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// For Loading the Home Page with get Request
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, './public/form.html'));
});

// All Queries on home page start here
router.post('/', function (req, res, next) {

	// Student-Signup
	if (req.query.type == "student") {
		console.log(req.query.type);
		var s_name = req.body.studentname;
		var s_course = req.body.studentcourse;
		var s_email = req.body.studentemail;
		var s_password = req.body.studentpassword;
		var sql = 'INSERT INTO sregistration (sname,scourse, semail, spass) VALUES ("' + s_name + '","' + s_course + '","' + s_email + '","' + s_password + '")';
		db.query(sql, function (err, data) {
			if (err) {
				res.json({
					msg: 'error'
				});
			} else {
				console.log("inserted");
				res.json({
					msg: 'success',
					countries: data
				});
			}
		});
	}

	// Teacher Signup
	else if (req.query.type == "teacher") {
		console.log(req.query.type);
		var t_name = req.body.tname;
		var t_course = req.body.tcourse;
		var t_email = req.body.temail;
		var t_password = req.body.tpassword;
		var sql = 'INSERT INTO tregistration (tname,tcourse, temail, tpass) VALUES ("' + t_name + '","' + t_course + '","' + t_email + '","' + t_password + '")';
		db.query(sql, function (err, data) {
			if (err) {
				res.json({
					msg: 'error'
				});
			} else {
				console.log("inserted");
				res.json({
					msg: 'success',
					countries: data
				});
			}
		});
	}

	// Student Login
	else if (req.query.type == "student-login") {
		console.log("inside login");
		var s_email = req.body.studentemail;
		var s_password = req.body.studentpassword;
		console.log(req.query.type + "   " + s_email + "    " + s_password);
		var sql = 'SELECT spass,sname,scourse,sregistration.semail as semail,sem,marks1,marks2,marks3,marks4,syear FROM sregistration left join  studentmarks on sregistration.semail=studentmarks.semail where sregistration.semail="' + s_email + '" and spass="' + s_password + '";';
		let selectPromise = new Promise((resolve, reject) => {
			db.query(sql, (err, result) => {
				if (err) {
					reject("Error executing query: " + JSON.stringify(err));
				}
				else {
					if (result) {
						res.json({
							msg: 'success',
							userdata: result,
						});
					}
					else {

					}
				}
			});
		});
	}

	// Teacher Login
	else if (req.query.type == "teacher-login") {
		console.log("inside login");
		var t_email = req.body.teacheremail;
		var t_password = req.body.teacherpassword;
		console.log(req.query.type + "   " + t_email + "    " + t_password);
		var sql = 'SELECT tpass,tname,tcourse,temail from tregistration where temail="' + t_email + '" and tpass="' + t_password + '";';
		var sql1 = 'SELECT * FROM studentmarks;';
		var sql2 = 'SELECT spass,sname,scourse,sregistration.semail as semail,sem,marks1,marks2,marks3,marks4,syear FROM sregistration left join  studentmarks on sregistration.semail=studentmarks.semail where sregistration.scourse="' + t_course1 + '";';
		var t_course = "";
		let selectPromise = new Promise((resolve, reject) => {
			db.query(sql, (err, result, fields) => {
				if (err) {
					reject("Error executing query: " + JSON.stringify(err));
				}
				else {
					if (result.length > 0) {
						console.log("inside query 1");
						t_course1 = result[0]['tcourse'];
						var sql2 = 'SELECT spass,sname,scourse,sregistration.semail as semail,sem,marks1,marks2,marks3,marks4,syear FROM sregistration left join  studentmarks on sregistration.semail=studentmarks.semail where sregistration.scourse="' + t_course1 + '";';
						db.query(sql2, (err, result1) => {
							if (err) {
								reject("Error executing query: " + JSON.stringify(err));
							}
							else {
								console.log("teacher course" + result);
								console.log("detail" + result1);
								res.json({
									msg: 'success',
									userdata1: result1,
									userdata: result,

								});
							}
						});
					}
					else {

					}
				}
			});
		});
	}

	// Inserting Student Marks
	else if (req.query.type == "marks-insert") {
		console.log(req.query.type);
		var s_sem = req.body.sem
		var s_email = req.body.email;
		var s_m1 = req.body.marks1;
		var s_m2 = req.body.marks2;
		var s_m3 = req.body.marks3;
		var s_m4 = req.body.marks4;
		var s_year = req.body.year;
		var sql = 'INSERT INTO studentmarks (semail,sem,marks1,marks2,marks3,marks4,syear) VALUES ("' + s_email + '","' + s_sem + '","' + s_m1 + '","' + s_m2 + '","' + s_m3 + '","' + s_m4 + '","' + s_year + '")';
		db.query(sql, function (err, data) {
			if (err) {
				res.json({
					msg: 'error'
				});
			} else {
				console.log("inserted");
				res.json({
					msg: 'success',
					countries: data
				});
			}
		});
	}
});
module.exports = router;

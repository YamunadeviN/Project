// Create server for REST API

var expr = require('express');
var Parser = require('body-parser');
var cors = require('cors');
var appln = express();
var mongoose = require('mongoose');
var student = require('./student');

//Create route, assign port, and use body parser to parse incoming JSON data. 

appln.use(Parser.urlencoded({ extended: true }));
appln.use(Parser.json());
var port = process.env.PORT || 7744;
var router = express.Router();

//Connect application to MongoDB database server

mongoose.connect('mongodb://localhost:27017/students');
router.use(function (request, result, next) {
    console.log('****Request logging occurs****');
    next(); });

//To create/insert data in the database

router.route('/students').post(function (request, result) {
    console.log("INSERT");
    var s = new student();
    s.name = request.body.name;
    s.adminno = request.body.adminno;
    s.dept = request.body.dept;
    s.rollno = request.body.rollno;
    s.cgpa = request.body.cgpa;
    s.save(function (err) {
        if (err) {
            result.send(err);
        }
        console.log("inserted");
        result.send({ '!!!Student details Created!!!' })
    })
});

// To perform GET operation

router.route('/students').get(function (request, result) {
    student.find(function (err, students) {
        if (err) {
            result.send(err);
        }
        result.send(students);
    });
});

router.route('/students/:student_id').get(function (request, result) {


    student.findById(request.params.student_id, function (err, stud) {
        if (err)
            result.send(err);
        result.json(stud);
    });
});

//To update a record

router.route('/students/:student_id').put(function (request, result) {

    student.findById(request.params.student_id, function (err, stud) {
        if (err) {
            result.send(err);
        }
        stud.name = request.body.name;
        stud.adminno = request.body.adminno;
        stud.dept = request.body.dept;
        stud.rollno = request.body.rollno;
        stud.cgpa = request.body.cgpa;
        stud.save(function (err) {
            if (err)
                result.send(err);

            result.json({ '!!!Student details updated!!!' });
        });

    });
});

//To delete a particular record

router.route('/students/:student_id').delete(function (request, result) {

    student.remove({ _id: request.param.student_id }, function (err, stud) {
        if (err) {
            result.send(err);
        }
        result.json({ '!!!Deleted Successfully!!!' });
    })

});

// Enabling CORS support, configuring port for the API

appln.use(cors());
appln.use('/api', router);
appln.listen(port);
console.log('REST API is runnning at port number -->' + port);

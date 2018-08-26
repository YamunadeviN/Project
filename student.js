//create a model of the document to perform CRUD operations

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
    name: String,
    adminno: Number,
    dept: String,
    rollno:Number,
    cgpa:Number,
    
});
module.exports = mongoose.model('Student', StudentSchema);

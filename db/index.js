const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin123@cluster0.1j9ruws.mongodb.net/exammate')

const notesSchema = new mongoose.Schema({
    branch: String,
    title: String,
    semester: Number,
    subject: String,
    files: String,
})

const questionPaperSchema = new mongoose.Schema({
    branch: String,
    title : String,
    semester: Number,
    subject: String,
    files: String
})

const Notes = mongoose.model('Notes', notesSchema);
const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

module.exports = {
    Notes, QuestionPaper
}
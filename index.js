const express = require('express')
const router = express.Router()
const port = 3000;
const app = express()
const cors = require('cors');
app.use(cors())
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')
const { QuestionPaper } = require('./db');
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

cloudinary.config({
    cloud_name:'duk8c1spp',
    api_key: '742555222373573',
    api_secret: 'nohMTyhvC38pc1LYmaDYmwZ729Y'
})

app.get('/notes:semester/:subject', async function(req, res){
    const {semester, subject} = req.params;
    try{
        const notes = await Notes.find({semester, subject});
        res.json(notes);
    }
    catch(e){
        res.status(500).json({
            msg: "Can't find notes"
        })
    }
})

app.get('/papers:semester/:subject' , async function(req, res){
    const {semester, subject} = req.params;
    try{
        const papers = await QuestionPaper.find({semester, subject});
        res.json(papers)
    }
    catch(e){
        res.status(500).json({
            msg: "Can't find question paper"
        })
    }
})

app.post('/upload', async function(req, res){
    try{
        const file = req.files.file;  // using multer for uploading files
        const result = await cloudinary.uploader.upload(file.tempFilePath, {resource_type: 'auto'})
        // console.log(file);
        // console.log(req.body);
        const image_url = result.secure_url;
        const newPaper = await QuestionPaper.create({
            branch: req.body.branch,
            title: req.body.title,
            semester: req.body.semester,
            subject: req.body.subject,
            files: image_url
        })
        console.log(result);
        console.log(newPaper);
        res.json({
            msg : "file uploaded successfully"
        })
    }
    catch(e){
        console.error("Error uploading files to cloudinary", e);
        res.status(500).json({
            error : "Failed to upload file"
        })
    }
   
})

app.post('/paper' , async function(req, res){
    const semester = req.body.semester;
    const subject = req.body.subject;
    const branch = req.body.branch;
    console.log(req.body);
    const value = await QuestionPaper.find({
        branch: branch,
        semester: semester,
        subject: subject
    })
    console.log(value);
    res.json({
        value
    })

})

app.get('/papers:semester')

app.listen(port)
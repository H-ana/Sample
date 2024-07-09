const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://hanashelbin:T7Izt7PNSKyor4OL@cluster0.m2eupyp.mongodb.net/tutorial?retryWrites=true&w=majority&appName=Cluster0');

const uploadSchema = new mongoose.Schema({
    filename: String,
    filepath: String
});
const Upload = mongoose.model('Upload', uploadSchema);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

app.post('/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        const newUpload = new Upload({
            filename: req.file.filename,
            filepath: req.file.path
        });
        newUpload.save()
            .then((upload) => res.status(200).json(upload))
            .catch((error) => res.status(500).json({ error: error.message }));
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

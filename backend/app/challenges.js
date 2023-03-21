const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const path = require('path');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const Challenge = require("../models/Challenge");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.post('/', auth, permit('admin'), upload.single('file'), async (req, res) => {
        try {
            const {title, category, description, points, result, hint1, hint2, hint3} = req.body;

            const challengeData = {
                title,
                category,
                description,
                points,
                type: "Practice",
                file: null,
                result,
                hint1,
                hint2,
                hint3
            };

            if (req.file) {
                challengeData.file = 'uploads/' + req.file.filename;
            }

            const newChallenge = new Challenge(challengeData);
            await newChallenge.save();

            res.send(newChallenge);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

module.exports = router;
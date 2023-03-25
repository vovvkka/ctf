const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const path = require('path');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const Challenge = require("../models/Challenge");
const User = require("../models/User");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const {category, title} = req.query;
        const query = {};

        if (category) query.category = category;
        if (title) query.title = { $regex: title, $options: 'i' };

        const challenges = await Challenge.find(query);
        res.send(challenges);
    } catch (e) {
        res.status(500).send(e);
    }
});

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

router.post('/:id', auth, async (req, res) => {
        try {
            const {result} = req.body;

            const challenge = await Challenge.findById(req.params.id);

            if (!challenge) {
                return res.status(404).send({message: "Challenge not found"});
            }

            if (challenge.result !== result) {
                return res.send({error: "Wrong answer!"});
            }

            const user = await User.findById(req.user._id);
            user.practicePoints += challenge.points;
            await user.save({validateBeforeSave: false});

            res.send({
                message: "Congratulations! Your answer is correct!",
                points: challenge.points
            });
        } catch (e) {
            return res.status(400).send(e.message);
        }
    }
);

router.put('/:id', auth, permit('admin'), upload.single('file'), async (req, res) => {
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

            const updateChallenge = await Challenge.findByIdAndUpdate(
                req.params.id,
                challengeData
            );

            res.send(updateChallenge);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            return res.status(404).send({ message: 'Challenge not found!' });
        }

        await Challenge.deleteOne(challenge);
        res.send({ message: 'Challenge deleted successfully!' });
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const Competition = require("../models/Competition");

router.get('/', permit('admin'), async (req, res) => {
    try {
        const competitions = await Competition.find().sort({createdAt: "desc"});
        res.send(competitions);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, permit('admin'), async (req, res) => {
        try {
            const {title, maxTeams} = req.body;

            const competitionData = {
                title,
                maxTeams
            };

            const newCompetition = new Competition(competitionData);
            await newCompetition.save();

            res.send(newCompetition);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

// router.post('/:id', auth, async (req, res) => {
//         try {
//             const {result} = req.body;
//
//             const challenge = await Challenge.findById(req.params.id);
//
//             if (!challenge) {
//                 return res.status(404).send({message: "Challenge not found"});
//             }
//
//             if (challenge.result !== result) {
//                 return res.send({error: "Wrong answer!"});
//             }
//
//             const user = await User.findById(req.user._id);
//
//             if (!user.solvedPracticeChallenges.find(c => c === challenge._id.toString())) {
//                 user.practicePoints += challenge.points;
//                 user.solvedPracticeChallenges.push(challenge._id);
//                 await user.save({validateBeforeSave: false});
//
//                 return res.send({
//                     message: "Congratulations! Your answer is correct!",
//                     points: challenge.points,
//                     challengeId: challenge._id
//                 });
//             }
//
//             res.send({
//                 message: "Congratulations! Your answer is correct!",
//                 points: 0
//             });
//         } catch (e) {
//             return res.status(400).send(e.message);
//         }
//     }
// );
//
// router.put('/:id', auth, permit('admin'), upload.single('file'), async (req, res) => {
//         try {
//             const {title, category, description, points, result, hint1, hint2, hint3} = req.body;
//
//             const challengeData = {
//                 title,
//                 category,
//                 description,
//                 points,
//                 type: "Practice",
//                 file: null,
//                 result,
//                 hint1,
//                 hint2,
//                 hint3
//             };
//
//             if (req.file) {
//                 challengeData.file = 'uploads/' + req.file.filename;
//             }
//
//             const updateChallenge = await Challenge.findByIdAndUpdate(
//                 req.params.id,
//                 challengeData
//             );
//
//             res.send(updateChallenge);
//         } catch (e) {
//             res.status(400).send(e);
//         }
//     }
// );
//
// router.delete('/:id', auth, permit('admin'), async (req, res) => {
//     try {
//         const challenge = await Challenge.findById(req.params.id);
//
//         if (!challenge) {
//             return res.status(404).send({ message: 'Challenge not found!' });
//         }
//
//         await Challenge.deleteOne(challenge);
//         res.send({ message: 'Challenge deleted successfully!' });
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });

module.exports = router;
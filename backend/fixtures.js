const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        users: [{username: "Vova", lastname: "Baltiev", email: "v.golem228@gmail.com"}],
        email: 'v.golem228@gmail.com',
        teamName: "Sharks",
        password: "123123",
        practicePoints: 5,
        role: 'admin',
        token: nanoid(),
        competitionPoints: [],
        solvedPracticeChallenges: [],
    });

    await mongoose.connection.close();
};

run().catch(console.error);
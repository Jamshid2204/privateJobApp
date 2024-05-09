const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/job');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const bookmarkRouter = require('./routes/bookmark');
const userRouter = require('./routes/user');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to jobfinderapp database'))
    .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/jobs', jobRouter)
app.use('/api/users', userRouter);
app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/', authRouter);
app.use('/api/applied', require('./routes/apply'));

app.get('/', (req, res) => res.send('Welcome to JobFinder app 3'))

app.listen(process.env.PORT || port, () => console.log(`sever is running on port ${process.env.PORT}`));
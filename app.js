require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uniqid = require('uniqid');
const app = express();
mongoose.set('useUnifiedTopology', true);

//Connecting MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true } );
const db = mongoose.connection
db.on('error', (err) => console.log(err));
db.once('connected', () => console.log('DB Connected'))
//Getting models from DB
let Users = require('./models/users')

//Requiring router
const userRouter = require('./routes/router');
const postRouter = require('./routes/post')
const uploadRouter = require('./routes/upload');

//Middleware
//This line accepts JSON body in request
app.use(express.json())

//middleware to use router
app.use('/api', userRouter)
app.use('/api/post', postRouter)
app.use('/api/file', uploadRouter)



app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
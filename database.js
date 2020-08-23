const mongoose = require('mongoose');

const {MONGODB_HOST, MONGODB_DB} = process.env;
const mongodbURL = `mongodb://${MONGODB_HOST}/${MONGODB_DB}`;

mongoose.connect(mongodbURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log('Database connected on localhost:27017'))
.catch(err => console.log(err));
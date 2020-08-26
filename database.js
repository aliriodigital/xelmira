const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/xelmira';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log('Database connected to localhost: 27017'))
.catch(err => console.log(err));

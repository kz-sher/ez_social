const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const PORT = process.env.PORT || 5000;
const { AuthRouter, PostRouter } = require('./routes');
const { initializePassport } = require('./middleware/passport');

// Create passport as authentication middleware
initializePassport(passport);

// Setup DB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ezsocialdb', { 
    useNewUrlParser: true 
});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Just make sure uploads folder there
// Create a random txt file to avoid heroku error
if (!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
    fs.closeSync(fs.openSync('./uploads/random.txt', 'w'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/static', express.static('uploads'))
app.use('/api/auth', AuthRouter);
app.use('/api/post', PostRouter);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}
else{
    app.use(express.static('client'));
}
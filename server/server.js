const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const PORT = 4000;
const { AuthRouter, PostRouter } = require('./routes');
const { initializePassport } = require('./middleware/passport');

// Create passport as authentication middleware
initializePassport(passport);

// Setup DB connection
mongoose.connect('mongodb://127.0.0.1:27017/ezforumdb', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Setup server
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api/auth', AuthRouter);
app.use('/api/post', PostRouter);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
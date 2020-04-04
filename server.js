const express = require('express');
const app = express();
// const path = require("path")
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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ezforumdb', { 
    useNewUrlParser: true 
});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Setup server
// app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/static', express.static('uploads'))
app.use('/api/auth', AuthRouter);
app.use('/api/post', PostRouter);
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
// }
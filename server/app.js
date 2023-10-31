const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const allowCors = require('./config/cors');
const config = require('./config/config');
const User = require('./models/user.js');

mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION)
mongoose.connect(config.DATABASE);
let db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to the database.');
});

db.on('error', (err) => {
    console.log(`Database error: ${err}`,config.DATABASE);
});

// Instantiate express
const app = express();

//sessions


// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// Set body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cors
app.use(allowCors);

// Initialize routes middleware

//app.use('/', require('./routes/user'));
app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {name,email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            console.log(user)
            res.json("Already registered")
        }
        else{
            //User.create({ name, email, password })
            User.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})
app.post('/api/user/getUser', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Query the database to find the user based on the provided username, email, and password
      const user = await User.findOne({ username, email, password });
  
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      // If the user is found, send the user data as the response
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json('Internal server error');
    }
  });

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            console.log(password)
            if(user.password === password) {
                res.json({ message: 'Success', username: user.username, email: user.email, password: user.password });
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.get('/userData', (req, res) => {
    // Simulate a delay to show asynchronous fetching
    setTimeout(() => {
      res.send(req.body);
    }, 1000);
  });
// Use express's default error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ err: err });
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// Start the server
const port = process.env.PORT;

app.get('/', function (req, res) {
    res.send('Hello API');
});
// user authentication routes
// const userRoute = require("./routes/auth");
// app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
app.use('/api/likes', require('./routes/likes'));
app.get('/api/likes',require('./routes/likes'))
const songRoute = require("./routes/songs");
app.use("/api/songs", songRoute);
//app.use('/api/likes', require('./routes/likes'));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


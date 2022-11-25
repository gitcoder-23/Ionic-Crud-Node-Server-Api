/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// invoked
const app = express();
dotenv.config();

// Database
const mongoUrl = `${process.env.MONGODB_URL}`;
// connect with db
mongoose.connect(
  mongoUrl,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
  // () => console.log('MongoDb Connected')
);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoodb!');
});

mongoose.connection.on('error', (error) => {
  console.log('Connection error!', error);
});

// to pass data during "post/ put" method through "body"
// use "body-perser" or new express
// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Cors Added
app.use(
  cors({
    // origin: "http://localhost:3007",
    // origin: 'http://127.0.0.1:3007',
    origin: '*',
    // "credentials" in frontend "include"
    credentials: true,
    // methods: [],
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to node server!');
});

// testing
app.post('/send', (req, res) => {
  // bodyParser testing after post
  console.log('req->', req.body);
  res.send('Posted');
});

// import routes
const employeeRoute = require('./routes/employeeRoute');

// main routes api
// main route
app.use('/api/v1', employeeRoute);

const serverPort = process.env.PORT || 3007;

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

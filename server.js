const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db');

connectDB();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.static('public'))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/urls'));
app.use('/api/users/', require('./routes/todo'));


const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

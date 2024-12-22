//Wep App
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

app.get('/greet/:name', (req, res) => {
    const userName = req.params.name;
    res.render('index', { name: userName });
});
 
app.get('/about', (req, res) => {
    res.send('This is the About page');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


//Datebase
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  });
  
  newUser.save((err) => {
    if (err) return console.error(err);
    console.log('User saved to database');
  });
  

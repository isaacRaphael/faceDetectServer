const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'spectre',
    database : 'facedetect'
  }
});







const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
		res.json(database.users);
		}
	)
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db,  bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)})
app.post('/image', (req,res) => {image.handleImage(req, res, db)})



app.listen(3000, ()=> {
	console.log('App is running on port 3000');
})
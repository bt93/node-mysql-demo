const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejsLint = require('ejs-lint');
const app = express();

const {getHomePage} = require('./routes/index');
const {addStudentPage, addStudent, editStudentPage, editStudent, deleteStudent} = require('./routes/student');

const port = 8000;

// create connection to local database
const db = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'my_school'
});

// connect to db
db.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Connection to database successful');
	}
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

// set routes
app.get('/', getHomePage);
app.get('/add', addStudentPage);
app.get('/edit/:id', editStudentPage);
app.post('/add', addStudent);



app.listen(port, () => {
	console.log('Listening on port ' + port);
});
module.exports = {
	addStudentPage: (req, res) => {
		res.render('add-student.ejs', {
			title: 'Student Database | Add Student',
			message: ''
		});
	},

	addStudent: (req, res) => {
		let message = '';
		let firstName = req.body.first_name;
		let lastName = req.body.last_name;
		let gender = req.body.gender;
		let major = req.body.major;
		let adviserID = req.body.ad_id;
		let yearStart = req.body.year_start;
		let yearEnd = req.body.year_end;

		let query = "INSERT INTO students (first_name, last_name, gender, major, ad_id, year_start, year_end) " + 
		"VALUES ('" + firstName + "', '" + lastName + "', '" + gender + "', '" + major + "', " + adviserID + ", " + yearStart + ", " + yearEnd + ");";

		db.query(query, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			} else {
				res.redirect('/');
			}
		});
	},

	editStudentPage: (req, res) => {
		let studentID = req.params.id;
		let query = `SELECT * FROM students WHERE id = ${studentID};`

		db.query(query, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.render('edit-student.ejs', {
				title: 'Student Database | Edit Student',
				student: result[0],
				message: ''
			});
		});
	}
}
module.exports = {
	getHomePage: (req, res) => {
		let query = 'SELECT * FROM students ORDER BY id ASC'

		db.query(query, (err, result) => {
			if (err) {
				console.log(err);
			}

			res.render('index.ejs', {
				title: 'Student Database',
				students: result
			}); 
		});
	}
}
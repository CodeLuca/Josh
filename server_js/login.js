module.exports = function(app, db) {
	//Login post request from form
	app.post('/login/:place', function(req, res) {
		var place = req.params.place;

		if (req.session.username) {
			res.redirect('/' + place);
			return;
		} else {
			if ((req.body.user == 'Josh' || req.body.user == 'josh') && req.body
				.pass ==
				'abc123') {
				req.session.username = 'Josh';
				res.redirect('/blog/admin');
			} else {
				res.render('login', {
					err: 'Incorrect Username or Password'
				});
			}
		}
	});
}

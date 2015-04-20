module.exports = function(app, db) {
	//Admin panel
	app.get('/projects/admin', function(req, res) {
		//Check if logged in already.
		if (!req.session.username) {
			res.redirect('/login');
			return;
		} else {
			res.render('admin')
		}
	});
}

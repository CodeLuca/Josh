module.exports = function(app, db) {
	//Admin panel
	app.get('/projects/admin', function(req, res) {
		//Check if logged in already.
		if (!req.session.username) {
			res.render('login');
			return;
		} else {
			res.redirect('admin')
		}
	});
}

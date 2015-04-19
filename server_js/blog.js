module.exports = function(app, db) {

	//Render all the blog posts to any user
	app.get('/blog', function(req, res) {
		db.posts.find(function(err, docs) {
			res.render('blog', {
				posts: docs
			})
		});
	});

	//Admin panel
	app.get('/blog/admin', function(req, res) {
		//Check if logged in already.
		if (!req.session.username) {
			res.render('login');
			return;
		} else {
			res.render('admin')
		}
	});

	//Login post request from form
	app.post('/login/:place', function(req, res) {
		var place = req.params.place;

		if (req.session.username) {
			res.redirect('/' + place);
			return;
		} else {
			if ((req.body.user == 'Josh' || req.body.user == 'josh') && req.body.pass ==
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

	//Make a blog post POST request
	app.post('/blog/post', function(req, res) {
		var obj = {
			title: req.body.title,
			body: req.body.body,
			time: Date.now()
		}
		db.posts.insert(obj, function() {
			res.redirect('/blog');
		});
	});

	//See all posts that can be edited.
	app.get('/blog/admin/edit', function(req, res) {
		if (!req.session.username) {
			res.render('login');
			return;
		} else {
			db.posts.find(function(err, docs) {
				res.render('edit', {
					posts: docs
				});
			});
		}
	});

	//Edit specific post.
	app.get('/blog/admin/edit/:name', function(req, res) {
		var name = req.params.name;
		db.posts.find({
			'title': name
		}, function(err, docs) {
			res.render('editPost', {
				'title': name,
				'body': docs[0].body
			})
		});
	});

	app.post('/blog/admin/edit', function(req, res) {
		db.posts.update({
			'title': req.body.name
		}, {
			$set: {
				'title': req.body.name,
				'body': req.body.body
			}
		}, function() {
			// req.body
		});
	});
}

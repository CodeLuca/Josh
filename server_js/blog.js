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
      res.redirect('/login');
      return;
    } else {
      res.render('admin')
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
      res.redirect('/login');
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
      'title': req.params.name
    }, function(err, docs) {
      console.log(docs)
      res.render('editPost', {
        'title': name,
        'body': docs[0].body
      })
    });
  });

  app.post('/blog/admin/edit', function(req, res) {
    db.posts.update({
      'title': req.body.title
    }, {
      $set: {
        'body': req.body.body
      }
    }, function() {
      res.redirect('/blog');
    });
  });

  app.post('/blog/admin/delete', function(req, res) {
    console.log(req.body.title);
    db.posts.remove({
      'title': req.body.title
    });
  });
}

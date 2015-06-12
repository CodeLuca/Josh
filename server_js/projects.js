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

  app.post('/projects/new', function(req, res) {
    var date = new Date();
    var obj = {
      'name': req.body.title,
      'desc': req.body.desc,
      'time': date
    }
    db.projects.insert(obj, function() {
      console.log('New Product:', obj)
      res.redirect('/');
    });
  });

  //See all posts that can be edited.
  app.get('/projects/admin/edit', function(req, res) {
    if (!req.session.username) {
      res.redirect('/login');
      return;
    } else {
      db.projects.find(function(err, docs) {
        res.render('projectEdit', {
          posts: docs
        });
      });
    }
  });

  app.get('/projects/admin/edit/:name', function(req, res) {
    if (!req.session.username) {
      res.redirect('/login');
      return;
    } else {
      db.projects.find({
        'name': req.params.name
      }, function(err, docs){
        console.log(docs);
        if(err) console.log(err);
        res.render('projectEditPost', {
          'name': req.params.name,
          'desc': docs[0].desc
        });
      });
    }
  });

  app.post('/projects/admin/edit', function(req, res) {
    console.log('1', req.body.name, req.body.desc)
    db.projects.update({
      'name': req.body.name
    }, {
      $set: {
        'desc': req.body.desc
      }
    }, function() {
      res.redirect('/');
    });
  });

  app.post('/projects/admin/delete', function(req, res) {
    db.projects.remove({
      'name': req.body.name
    });
  });
}

module.exports = function(app, db) {
	app.post('/newWishItem', function(req, res){
		if(!req.session.username){
			res.redirect('/login/newWishItem');
			return;
		}
		var obj = {
			'itemName': req.body.itemName,
			'itemImg': req.body.itemImg,
			'itemDesc': req.body.itemDesc,
			'itemAmount': req.body.itemAmount,
			'date': Date.now()
		}
		db.wishlist.insert(obj, function(err){
			res.redirect('/');
		})
	});

	app.get('/', function(req, res) {
	  var projectsObj;
	  db.projects.find(function(err, docs) {
	    if (err) {
	      res.end(err);
	      return;
	    } else {
	    	projectsObj = docs;
	    	yes();
	    }
	  });
	  function yes(){
		db.wishlist.find(function(err, docs){
	  	  res.render('index', {
	        'projects': projectsObj,
	        'wishlist': docs
	      });
		});
	  }
	});
};
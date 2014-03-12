
module.exports = function(app) {
	app.get('/', function(req, res) {
		if (req.user) {
			res.redirect('/home');
		} else {
			res.render('login.html', {});
		}
	});
};


module.exports = function(app) {
    app.get('/', function(req, res) {
        if (req.user) {
            res.render('home.html', {
                user: req.user
            });
        } else {
            res.render('login.html', {});
        }
    });
};

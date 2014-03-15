
module.exports = function(app) {
    app.get('/music', function(req, res) {
        if (req.user) {
            res.render('music.html', {
                user: req.user
            });
        } else {
            res.render('login.html', {});
        }
    });
};


module.exports = function(app) {
    app.get('/music', function(req, res) {
        if (req.user) {
            res.render('music.html', {
                user: req.user,
                tab: 'music'
            });
        } else {
            res.render('login.html', {});
        }
    });
};

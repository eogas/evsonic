
module.exports = function(app) {
    app.get('/settings', function(req, res) {
        if (req.user) {
            res.render('settings.html', {
                user: req.user
            });
        } else {
            res.render('login.html', {});
        }
    });
};

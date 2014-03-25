
module.exports = function(app) {
    app.get('/settings', function(req, res) {
        if (req.user) {
            res.render('settings.html', {
                user: req.user,
                tab: 'settings'
            });
        } else {
            res.render('login.html', {});
        }
    });
};

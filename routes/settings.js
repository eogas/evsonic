
module.exports = function(app) {
    app.get('/settings', function(req, res) {
        if (req.user) {
            req.models.MediaDir.find({}, function(err, dirs) {
                if (err) {
                    res.sendStatus(500);
                    return;
                }

                res.render('settings.html', {
                    user: req.user,
                    tab: 'settings',
                    mediaDirs: dirs
                });
            });
        } else {
            res.render('login.html', {});
        }
    });
};

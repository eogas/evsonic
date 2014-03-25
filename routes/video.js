
module.exports = function(app) {
    app.get('/video', function(req, res) {
        if (req.user) {
            res.render('video.html', {
                user: req.user,
                tab: 'video'
            });
        } else {
            res.render('login.html', {});
        }
    });
};

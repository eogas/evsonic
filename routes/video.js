
module.exports = function(app) {
    app.get('/video', function(req, res) {
        if (req.user) {
            res.render('video.html', {
                user: req.user
            });
        } else {
            res.render('login.html', {});
        }
    });
};

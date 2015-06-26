var fs = require('fs');

module.exports = function(app) {
    app.get('/mediadir/:id', function(req, res) {
        // TODO check authentication

        var id = req.params.id;

        // TODO return a single mediadir
    });

    app.get('/mediadir', function(req, res) {
        // TODO check authentication

        req.models.MediaDir.find({}, function(err, mediadirs) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            res.send(JSON.stringify(mediadirs));
        });
    });

    app.post('/mediadir', function(req, res) {
        var name = req.body.name.trim(),
            path = req.body.path.trim();

        if (!name || name === '' || !path || path === '') {
            res.sendStatus(500);
            return;
        }

        if (!fs.existsSync(path)) {
            res.status(500).send('Path not found.');
            return;
        }

        // check for existing dir with the same name
        req.models.MediaDir.exists({
            name: name
        }, function(err, nameExists) {
            if (err) {
                res.status(500).
                send('An unknown error occurred.');
                return;
            }

            if (nameExists) {
                res.status(500).
                send('A media directory with that name already exists.');
                return;
            }

            // check for existing dir with the same path
            req.models.MediaDir.exists({
                path: path
            }, function(err, pathExists) {
                if (err) {
                    res.status(500).
                    send('An unknown error occurred.');
                    return;
                }

                if (pathExists) {
                    res.status(500).
                    send('A media directory with that path already exists.');
                    return;
                }

                // create the new mediadir
                req.models.MediaDir.create([{
                    name: name,
                    path: path
                }], function(err, mediaDirs) {
                    if (err) {
                        res.status(500).
                        send('An unknown error occurred.');
                        return;
                    }

                    res.send(JSON.stringify(mediaDirs[0]));
                });
            });
        });
    });

    app.delete('/mediadir/:id', function(req, res) {
        var id = req.params.id;

        req.models.MediaDir.get(id, function(err, mediaDir) {
            if (err) {
                res.status(500).
                send('Unable to remove media directory.');
                return;
            }

            mediaDir.remove(function(err) {
                if (err) {
                    res.status(500).
                    send('Unable to remove media directory.');
                    return;
                }

                res.sendStatus(200);
            });
        });
    });
};

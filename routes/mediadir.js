var fs = require('fs');

module.exports = function(app) {
    app.post('/mediadir', function(req, res) {
        var name = req.body.name,
            path = req.body.path;

        if (!name || name === '' || !path || path === '') {
            res.sendStatus(500);
            return;
        }

        fs.exists(path, function(pathExists) {
            if (!pathExists) {
                res.status(500).send('Path not found.');
                return;
            }

            req.models.MediaDir.exists({
                name: name
            }, function(err, nameExists) {
                if (err) {
                    res.sendStatus(500);
                    return;
                }

                if (nameExists) {
                    res.sendStatus(500).
                    send('A media directory with that name already exists.');
                    return;
                }

                // create the new mediadir
                req.models.MediaDir.create([{
                    name: name,
                    path: path
                }], function(err, mediaDirs) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    app.render('mediadir.html', {
                        dir: mediaDirs[0]
                    }, function(err, html) {
                        res.status(201).send(html);
                    });
                });
            });
        });
    });

    app.delete('/mediadir/:id', function(req, res) {
        var id = req.params.id;

        req.models.MediaDir.get(id, function(err, mediaDir) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            mediaDir.remove(function(err) {
                if (err) {
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(200);
            });
        });
    });
};

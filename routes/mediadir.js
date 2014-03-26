var fs = require('fs');

module.exports = function(app) {
    app.post('/mediadir', function(req, res) {
        var name = req.body.name,
            path = req.body.path;

        if (!name || name === '' || !path || path === '') {
            res.send(500);
            return;
        }

        fs.exists(path, function(pathExists) {
            if (!pathExists) {
                res.send(500, 'Path not found.');
                return;
            }

            req.models.MediaDir.exists({
                name: name
            }, function(err, nameExists) {
                if (err) {
                    res.send(500);
                    return;
                }

                if (nameExists) {
                    res.send(500, 'A media directory with that name already exists.');
                    return;
                }

                // create the new mediadir
                req.models.MediaDir.create([{
                    name: name,
                    path: path
                }], function(err, mediaDirs) {
                    if (err) {
                        res.send(500);
                        return;
                    }

                    app.render('mediadir.html', {
                        dir: mediaDirs[0]
                    }, function(err, html) {
                        res.send(201, html);
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
                res.send(500);
                return;
            }

            mediaDir.remove(function(err) {
                if (err) {
                    res.send(500);
                    return;
                }

                res.send(200);
            });
        });
    });
};

var fs = require('fs'),
    path = require('path');

var FILE_TYPES = ['.MP3'];

module.exports = function(app) {

    app.get('/mediainfo', function(req, res) {
        // TODO check authentication

        req.models.MediaDir.find({}, function(err, mediadirs) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            var allFiles = [];

            mediadirs.forEach(function(dir) {
                fs.readdir(dir.path, function(err, files) {
                    files.forEach(function(file) {
                        if (FILE_TYPES.indexOf(path.extname(file).toUpperCase()) != -1) {
                            allFiles.push({
                                filepath: file,
                                mediaDirId: dir.id
                                // TODO - ID3 info
                            });
                        }
                    });

                    res.send(JSON.stringify(allFiles));
                });
            });
        });
    });
};

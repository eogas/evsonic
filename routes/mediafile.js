var fs = require('fs'),
    path = require('path');

module.exports = function(app) {
    app.get('/mediafile/:id/:filename', function(req, res) {
        // TODO check authentication

        var id = req.params.id,
            filename = req.params.filename;

        req.models.MediaDir.get(id, function(err, mediaDir) {
            if (err) {
                res.status(500).
                send('Unable to find media directory.');
                return;
            }

            // http://stackoverflow.com/a/10047018
            var filepath = path.join(mediaDir.path, filename);
            var stat = fs.statSync(filepath);

            res.writeHead(200, {
               'Content-Type': 'audio/mpeg', // figure this out from file format
               'Content-Length': stat.size
            });

            var readStream = fs.createReadStream(filepath);
            readStream.pipe(res);
        });
    });
};

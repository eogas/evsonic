/// <reference path="../typings/node/node.d.ts"/>

var fs = require('fs'),
    path = require('path'),
    util = require('util');

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

            var filepath = path.join(mediaDir.path, filename);

            if (!fs.existsSync(filepath)) {
                res.status(500).
                send('Directory not found.');
                return;
            }

            var stat = fs.statSync(filepath);
            var totalSize = stat.size;
            var range = req.headers['range'];

            // http://stackoverflow.com/a/10047018
            // https://gist.github.com/paolorossi/1993068
            if (range) {
                var bounds = range.replace(/bytes=/, '').split('-');
                var rangeStart = bounds[0];
                var rangeEnd = bounds[1];

                var start = parseInt(rangeStart, 10);
                var end = rangeEnd ? parseInt(rangeEnd, 10) : totalSize - 1;
                var contentLength = (end - start) + 1;
                var contentRange = util.format('bytes %d-%d/%d ', start, end, totalSize);

                var file = fs.createReadStream(filepath, {
                    start: start,
                    end: end
                });

                res.writeHead(206, {
                    'Content-Range': contentRange,
                    'Accept-Ranges': 'bytes',
                    'Content-Type': 'audio/mpeg', // figure this out from file format
                    'Content-Length': contentLength
                });

                file.pipe(res);
            }
            else {
                res.writeHead(200, {
                   'Content-Type': 'audio/mpeg', // figure this out from file format
                   'Content-Length': totalSize
                });

                fs.createReadStream(filepath).pipe(res);
            }
        });
    });
};

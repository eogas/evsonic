
module.exports = function(db) {
    var MediaDir = db.define('mediaDir', {
        name: String,
        path: String
    });

    MediaDir.setRelations = function(relModels) {
    };

    return MediaDir;
};

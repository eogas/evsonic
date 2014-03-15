
module.exports = function(db) {
    var User = db.define('user', {
        username: String,
        password: String
    });

    User.setRelations = function(relModels) {
    };

    return User;
};

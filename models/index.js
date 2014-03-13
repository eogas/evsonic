
var orm = require('orm'),
	bcrypt = require('bcrypt'),
	config = require('../config');

module.exports = function(app) {
	app.use(orm.express(
		'mysql://' +
		config.db_user + ':' + config.db_pass +
		'@localhost/' + config.db_name, {

		define: function(db, models) {
			db.settings.set('instance.autoFetchLimit', 2);

			// set up models
			models.User = require('./user.js')(db);

			// set up relations
			for (var model in models) {
				if (models[model].setRelations) {
					models[model].setRelations(models);
				}
			}

			// synchronize models to create tables
			db.sync(function(err) {
				console.log(err || 'ORM: tables synchronized!');
			});

			// create the admin user if it doesn't exist already
			models.User.find({
				username: 'admin'
			}, function(err, users) {
				if (users.length < 1) {
					bcrypt.hash(config.default_admin_pass, config.bcrypt_cost, function(err, hash) {
						if (err) {
							console.log(err);
							return;
						}

						// all is well, create the user
						models.User.create([{
							username: 'admin',
							password: hash
						}], function(err, newUsers) {
							if (err) {
								console.log(err);
							}
						});
					});
				}
			});

			// export the models
			for (model in models) {
				module.exports[model] = models[model];
			}
		}
	}));
};

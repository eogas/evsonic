
var config = require('./config.js');

var express = require('express'),
    app = express(),
    swig = require('swig'),
    passport = require('passport');

var models = require('./models')(app);

// express config
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({ secret: config.session_secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// integrate swig into express
app.engine('html', swig.renderFile);
app.set('view_engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);

// disable view caching in dev mode
if (config.dev) {
    swig.setDefaults({ cache: false });
}

var auth = require('./auth'),
    routes = require('./routes')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');

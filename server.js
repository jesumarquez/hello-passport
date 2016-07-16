var express         = require('express'),
    expressSession	= require('express-session')
    bodyParser      = require('body-parser'),
    app             = express(),
    passport        = require('passport'),
    passportInit    = require('./app/config/passport.js'),
    routes          = require('./app/routes.js'),
    port            = process.env.PORT || 3000;

//config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,})
);
app.use(passport.initialize());
app.use(passport.session());

//passport
passportInit(passport);

//routes
routes(app, passport);

//server listen
app.listen(port, function(){
    console.log('server is running...');
});
var express         = require('express'),
    expressSession	= require('express-session')
    bodyParser      = require('body-parser'),
    app             = express(),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    port            = process.env.PORT || 3000;

function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login.html')
  }
}

const user = {  
  username: 'asdf',
  password: 'asdf',
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.use(new LocalStrategy(  
  function(username, password, done) {
    findUser(username, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (password !== user.password  ) {
        return done(null, false)
      }
      return done(null, user)
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  findUser(username, function (err, user) {
    done(err, user);
  });
});

//passport configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,})
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static('public'));
app.post('/login', 
  passport.authenticate('local'),
  function (req, res) {
    res.redirect('/');
  }
);
app.get('/secure',
  authenticationMiddleware(),
  function(req, res){
    res.send('secure page');
  }
);

app.listen(port, function(){
    console.log('server is running...');
});
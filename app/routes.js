var express = require('express');

module.exports = function (app, passport) {
    
    app.use('/', express.static('public'));

    app.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            res.redirect('/');
        }
    );
    
    app.get('/secure',
        authenticationMiddleware(),
        function (req, res) {
            res.send('secure page');
        }
    );

    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next()
            }
            res.redirect('/login.html')
        }
    }
}
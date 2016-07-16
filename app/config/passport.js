var	LocalStrategy = require('passport-local');

module.exports = function (passport) {

    const user = {
        username: 'asdf',
        password: 'asdf',
        id: 1
    }

    function findUser(username, callback) {
        if (username === user.username) {
            return callback(null, user)
        }
        return callback(null)
    }

    passport.use(new LocalStrategy(
        function (username, password, done) {
            findUser(username, function (err, user) {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false)
                }
                if (password !== user.password) {
                    return done(null, false)
                }
                return done(null, user)
            })
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        findUser(username, function (err, user) {
            done(err, user);
        });
    });

}
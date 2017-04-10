var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../src/server/models/User');
var cookies = require('react-cookie');

var host = process.env.NODE_ENV !== 'production' ? 'localhost:3000' : 'slackclone.herokuapp.com'
if (process.env.NODE_ENV !== 'production') {
  var oAuthConfig = require('./oAuthConfig.dev');
} else {
  var oAuthConfig = require('./oAuthConfig.prod');
}

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ 'local.username': username}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false);
      } else {
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function(err, user) {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ 'local.username': username}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false)
      }
      return done(null, user);
    });
  }));

  // NOTE: to set up FB auth you need your own clientID, clientSecret and set up your callbackURL.  This can all be done at https://developers.facebook.com/
  passport.use(new FacebookStrategy({
    clientID: oAuthConfig.facebook.clientID,
    clientSecret: oAuthConfig.facebook.clientSecret,
    callbackURL: "http://" + host + "/api/auth/facebook/callback"
  },
    function(accessToken, refreshToken, profile, done) {
      cookies.save('username', profile.displayName)
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err) { console.log(err); }
        if (!err && user !== null) {
          done(null, user);
        } else {
          var newUser = new User({ 'facebook.id': profile.id, 'facebook.username': profile.displayName});
          newUser.save(function(err, user) {
            if (err) {
              console.log(err);
            } else {
              done(null, user);
            }
          });
        }
      })
    }
  ));
}

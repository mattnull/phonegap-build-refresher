// Generated by CoffeeScript 1.6.2
(function() {
  var User, mongoose;

  mongoose = require('mongoose');

  User = mongoose.model('User');

  exports.login = function(req, res) {
    if (!req.isAuthenticated()) {
      return res.render('login');
    } else {
      return res.redirect('/');
    }
  };

  exports.logout = function(req, res) {
    req.logout();
    return res.redirect('/');
  };

  exports.auth = function(req, res) {
    return res.redirect('/');
  };

  exports.fbCallback = function(req, res) {
    var user;

    user = req.user;
    return User.findOne({
      linkedID: user.id
    }, function(err, data) {
      var userObj, _ref, _ref1, _ref2;

      if (!data) {
        userObj = {};
        userObj.linkedID = user.id;
        userObj.firstName = (_ref = user.name.givenName) != null ? _ref : '';
        userObj.lastName = (_ref1 = user.name.familyName) != null ? _ref1 : '';
        userObj.fullName = (_ref2 = user.displayName) != null ? _ref2 : '';
        userObj.gender = user.gender;
        userObj.location = user._json.location.name;
        userObj.avatar = "http://graph.facebook.com/" + user.username + "/picture";
        userObj.emails = user.emails.value != null ? user.emails.value : [];
        userObj.primaryEmail = user.emails[0] != null ? user.emails[0].value : null;
        return new User(userObj).save();
      } else {
        return res.redirect("/");
      }
    });
  };

}).call(this);

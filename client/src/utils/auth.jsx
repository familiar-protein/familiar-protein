function pretendRequest(email, pass, cb) {
  setTimeout(function() {
    if (email === 'drew' && pass === 'password') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      cb({authenticated: false});
    }
  }, 0);
}


module.exports = {
  login: function(user, pass, cb) {
    // TODO: ACTUAL AUTH REQUEST //
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    var context = this;
    pretendRequest(user, pass, function(res){
      if(res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        context.onChange(true);
      } else {
        if (cb) cb(false);
        context.onChange(false);
      }
    });
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn: function () {
    console.log(localStorage.token);
    console.log('Logged in?: ',!!localStorage.token);
    return !!localStorage.token;
  },

  onChange: function () {}
};

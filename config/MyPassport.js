// Import User model
const MyUser = require('../models/user.js');

// Import Passport middleware
const MyPassport = require('passport');

// Import GitHub Strategy for Passport
const MyGitHubStrategy = require('passport-github').Strategy;

// Configure the new GitHub Strategy for Passport
MyPassport.use(new MyGitHubStrategy(
  
  // Settings for GitHub Strategy
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://" + process.env.HOST + ":" + process.env.PORT + "/signin/github/callback",
    scope: "read:user"
  },
  
  // Verification function
  function(accessToken, refreshToken, profile, done) {
    
    MyUser.findOrCreate(profile, function (err, user) {
      
      // If technical error occurs (such as loss connection with database)
      if (err) {
        return done(err);
      }
      
      // If user doesn't exist (this case should never happen with this Strategy because a new user will be automatically created)
      if (!user) {
        return done(null, false);
      }
      
      // If everything all right, the user will be authenticated
      return done(null, user);
        
    });
               
  }

));


// Import HTTP Bearer Strategy for Passport
MyBearerStrategy = require('passport-http-bearer').Strategy;

// Import JWT module
const jwt = require('jsonwebtoken');

// Configure the new HTTP Bearer Strategy for Passport
MyPassport.use(new MyBearerStrategy(

  function (token, done) {
    
    // Check JWT
    jwt.verify(token, process.env.JWT_SECRET, function(err, payload) {
      
      // If checking failed
      if (err) {
        return done(err)
      };
      
      // If user is empty
      if (!payload){
        return done(null, false);
      }
      
      // Find user in database
      
      MyUser.findById(payload.id, function (err, user) {
      
        // If technical error occurs (such as loss connection with database)
        if (err) {
          return done(err);
        }
      
        // If user doesn't exist
        if (!user) {
          return done(null, false);
        }
      
        // If everything all right, the user will be authenticated
        return done(null, user);
      
    });
      
  });
}));


// Export passport object
module.exports = MyPassport
 

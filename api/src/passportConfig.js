const{User}= require('./db');
const passport = require('passport');
// const bcrypt =require('bcryptjs');
const LocalStrategy= require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const { use } = require('chai');


function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    //console.log('Profile:',profile);
    return {
        googleId: profile.id,
        name: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        image: imageUrl,
    };
}


passport.use('login',

  new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
  },
    (username, password, done)=>{ //()req, username, pass, done
      console.log(username, password)
      User.findOne({
          where:{
              username: username
          }
      })
      .then((user)=>{
          if(!user){
              return done(null, false,{
                  message: 'Username inexistente'
              })
          }
          if(!user && user.validPassword(password)){
              return done(null, false,{
                  message: 'Contraseña incorrecta'
              })
          }
          if(user){
            return done(null, user)

          }    
      })
      .catch((error)=>{
          if(error){
              return done(error)
          }

      })

  })
)
passport.use(new GoogleStrategy({
  clientID: config.clientId,
  clientSecret: config.secret,
  callbackURL: config.callback,
  accessType: 'offline',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
      where:{ googleId: profile.id },
      defaults: extractProfile(profile),
    }).then(user=>{
      return done(null,user)
    })

    //return done(null,extractProfile(profile));
  }))

passport.serializeUser((user, done)=> { 
  //console.log('user',user);
  let userId=''
  if(Array.isArray(user)){
    userId=user[0].id
  }else{
    userId=user.id
  }
  done(null, userId);
});

passport.deserializeUser((id, done)=> { //lo necesita cuando le llega un id de una cookie
  User.findOne({where: id})
  .then(user => {
    done(null, user);
  })
  .catch(err => done(err));
    
});
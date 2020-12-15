var express = require('express');
const server = express.Router();
const  {User} =require('../db');
const passport = require('passport');


isLogged= (req, res, next)=>{
    if (req.isAuthenticated() ) {return next()}
    else{
        res.json({
            loggedin: false,
            message: 'Usuario no autenticado',
          });
    }
};

isAdmin = (req, res, next) => {
    if (req.user.typeUser === 'Admin') return next();
    else
      return res.json({
        loggedin: false,
        isAdmin: false,
        message: 'No es Admin',
      });
};
  
server.get('/me', isLogged, function(req, res){
  res.status(200).json({
    loggedin: true,
    message: 'Usuario autenticado',
    user: req.user,
  });
});

//google login
server.get('/google'
        ,passport.authenticate('google', {scope: ['email', 'profile'],display:'popup'}),
     (req,res)=>{
           return res.send(req.user);
});

// In this route you can see that if the user is logged in u can acess his info in: req.user
server.get('/success',isLogged, (req, res) => { 
  console.log(req.user) 
  res.send(req.user)})
server.get('/failed', (req, res) => res.send('You Failed to log in!'))

server.get('/google/callback', 
  passport.authenticate('google', { successRedirect: 'http://localhost:3006/googleLoginSuccess'}));

server.post('/login',(req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      
      if (err) {
       res.json({
          success: false,
          message: err.message,
          info,
        });
      }
      if (!user) {
        res.json({
          success: false,
          info,
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          res.json(err);
        }
        res.json({
          success: true,
          message: 'You have successfully logged in!',
          info,
          user,
        });
      });
    })(req, res, next);
  });


server.get('/logout', isLogged, (req, res)=> {
        req.logout();
        res.json({ message: 'Logged out!' });
});

server.put('/promote/:id',(req, res)=>{
  const {id}=req.params
  User.findOne({
    where: {id:id}
  }).then((us)=>{
    if(us){
      User.update({
        typeUser: 'Admin'
      },{where: {id:us.id}})
      .then(user=>{
        res.send('Usuario Actualizado')
      })
    

    }

  })
 
})

module.exports =server;

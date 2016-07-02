// All routes for application
module.exports = function(app,passport) {
   //Home page with login links
   app.get('/', function(req, res){
      res.render('index.ejs');
   });

   //login page
   app.get('/login', function(req,res){
     res.render('login.ejs',{message: req.flash('loginMessage') });
   });

   //process the login form
   app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

   //Signup page
   app.get('/signup', function(req,res){
     res.render('signup.ejs',{message: req.flash('signupMessage') });
   });

   //process the signup form
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


//Profile Section
//Will want this protected. Will need sign in to view
//Using route middleware to verify (isLoggedIn function)

   app.get('/profile', isLoggedIn, function(req,res){
     res.render('profile.ejs', {
       user : req.user //get user out of session and pass to template
     });
   });

    //logout (passport function)
    app.get('/logout', function(req,res){
      req.logout();
      res.redirect('/');
    });

//***********FACEBOOK ROUTE ***************
// route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


}; //END MODULE.EXPORT


function isLoggedIn(req, res, next) {
  //if user is authenticated carry on
  if (req.isAuthenticated())
  return next();
  //if not return to home login
  res.redirect('/');
}

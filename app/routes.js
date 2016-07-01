// All routes for application
module.exports = function(app,passport) {
   //Home page with login links
   app.get('/', function(req, res){
      res.render('index.html');
   });

   //flash login message
   app.get('/login', function(req,res){
     res.render('login.html', {message:req.flash('loginMessage')});
   });

   //process the login form
   //app.post('login', do all passport stuff here);

   //Signup
   app.get('/signup', function(req,res){
     res.render('signup.html',{message: req.flash('signupMessage') });
   });

   //process the signup form
   // app.post('signup', do passport stuff here);


   //Profile Section
   //Will want this protected. Will need sign in to view
   //We will use route middleware to verify (isLoggedIn function)

   app.get('/profile', isLoggedIn, function(req,res){
     res.render('profile.html', {
       user : req.user //get user out of session and pass to template
     });
   });

    //logout
    app.get('/logout', function(req,res){
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

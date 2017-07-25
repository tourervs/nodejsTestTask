var express = require('express'),
    bodyParser = require('body-parser'),
    session    = require('express-session'),
    pgSession = require('connect-pg-simple')(session),
    app = express();

const pgPool        = require('./lib/db.js');
const messageModule = require('./lib/messages.js'); 
const messages      = messageModule.messages ; 


var sessionOptions = {
    secret : "secret",
    //
    resave: false,
    saveUninitialized: false,
    //
    store: new pgSession({
        pool   : pgPool,
    }) 
};
//
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use( bodyParser.json());
app.use( session(sessionOptions));
app.use(express.static('static'));

app.get("/", function( req, res ) {
    res.redirect('/welcome');
});

app.get("/welcome", function( req, res ) {
    var url_header    = req.protocol + '://' + req.get('host') ;
    var signOutUrl    = url_header + "/signout" ;
    var signUpUrl     = url_header + "/signup" ;
    var loginMessages = [] ;
    console.log("user is authorized :"+req.session.authorized);
    if ( req.session.authorized != true ) {
        res.redirect("/signin");
    } else {
        res.render("welcome.ejs", { url:url_header , signout_url:signOutUrl });
    }
});

//
app.get("/signup", function( req, res ) {

    var url_header          = req.protocol + '://' + req.get('host') ;
    var signUpUrl           = url_header  + req.originalUrl; 
    var loginMessages       = [] ;
    req.session.current_url = signUpUrl ;
    res.render("sign-up.ejs", { url:url_header, signup_url:signUpUrl , messages:loginMessages});
    
});

app.post("/signup", function( req, response ) {
    //
    var url_header    = req.protocol + '://' + req.get('host') ;
    var signUpUrl     = url_header  + req.originalUrl;
    var username      = req.body.username ;
    var password      = req.body.encrypted_password ;
    var loginMessages = [] ;
    //
    pgPool.query("select count(*) from users where users.name = $1 ;",[username], function(err, res) {
        if ( res.rows.length > 0 ) {
            if ( res.rows[0].count > 0  ){
                loginMessages.push(messages.already_exists);
                response.render("sign-up.ejs", { url:url_header , signup_url:signUpUrl  ,  messages:loginMessages });
                console.log(">> >> >> signup >> user "+username+" was found >>");
            } else {
                console.log(">> >> >> signup >> user "+username+" was NOT found >>");
                pgPool.query("insert into users (name,password) values ( $1 , $2 );",[username,password]).then((res) => { 
                    req.session.authorized = true ; 
                    response.redirect("/welcome" );
                });
            }
        } else {
            loginMessages.push(messages.internal_error);
            response.render("sign-up.ejs", { url:url_header , signup_url:signUpUrl  ,  messages:loginMessages });
        }
    });
    //
});
//
//
app.get("/signin", function( req, res ) {
    var url_header = req.protocol + '://' + req.get('host') ;
    var signOutUrl = url_header + "/signout" ; 
    var signUpUrl  = url_header + "/signup" ; 
    var previousUrl = req.session.current_url ;
    var loginMessages = [] ;
    if( previousUrl == signOutUrl ) {
        loginMessages.push(messages.info);
        req.session.destroy();
        res.render("sign-in.ejs", { url:url_header , signup_url:signUpUrl  ,  messages:loginMessages });
    }else if ( req.session.authorized != true ) {
        res.render("sign-in.ejs", { url:url_header , signup_url:signUpUrl  ,  messages:loginMessages });
    }else {
        res.redirect('/welcome');
    }
});

app.post("/signin", function( req, response ) {
    var username     = req.body.username;
    var password     = req.body.encrypted_password;
    var url_header   = req.protocol + '://' + req.get('host') ;
    var signOutUrl   = url_header + "/signout" ;
    var signUpUrl    = url_header + "/signup" ;
    var loginMessages = [] ;
    pgPool.query("select count(*) from users where users.name = $1 and users.password = $2 ;",[username,password]).then((res) => {
        //
        if ( res.rows.length > 0 ) {
            if ( res.rows[0].count > 0  ){
                req.session.authorized = true ;
                response.redirect('/welcome');
            } else {
                // req.session.authorized = false ;
                loginMessages.push(messages.wrong_credentials);
                response.render("sign-in.ejs", { url:url_header , signup_url:signUpUrl  ,  messages:loginMessages });
            }
        } else {
            // req.session.authorized = false ;
            loginMessages.push(messages.wrong_credentials);
            response.render("sign-in.ejs", { url:url_header , signup_url:signUpUrl  ,  messages:loginMessages });
        }
        //
    });







});
//
//
app.get("/signout", function( req, res ) {
    var url = req.protocol + '://' + req.get('host') + req.originalUrl ;
    console.log("::: ::: ::: Url from signout get"+url)
    req.session.current_url = url ;
    // req.session.authorized = false ; 
    // req.session.destroy();
    res.redirect('/signin');
});
//
//



app.listen(3000, function () { console.log('app is working on :3000 '); });

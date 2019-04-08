
// ===================
// AUTH ROUTES
// ===================

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Diary = require("../models/diary");
var middleware = require("../middleware");
// var async = require("async");
// var nodemailer=require("nodemailer");
// var crypto = require("crypto");

//root route
router.get("/", function(req,res){
    // res.send("This will be the landing page soon");
    res.render("landing");
});


// show register form 
router.get("/register", function(req,res){
    res.render("register", {page:"register"});
});

//handle sign up logic
router.post("/register", function(req,res){
    var newUser=new User({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    });

    User.register(newUser, req.body.password, function(err,user){
        if (!user){
            return res.render("/register", {error:err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Successfully Signed Up! Nice to meet you " + user.username);
            res.redirect("/diaries")
        });
    });
});

//show login form
router.get("/login", function(req,res){
    res.render("login", {page:"login"});
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect:"/diaries",
    failureRedirect:"/login"
    }), function(req,res){
        req.flash("success","Successfully Logged in! Nice to meet you " + req.body.username);
        res.redirect("/diaries");
});

//logout route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged out successfully!");
    res.redirect("/diaries");
});


//USERs profile
router.get("/users/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error","Something went wrong!");
            res.redirect("/");
        }
        Diary.find().where("author.id").equals(foundUser._id).exec(function(err, diaries){
            if(err){
                req.flash("error","Something went wrong!");
                res.redirect("/");
            }
            res.render("users/show", {user:foundUser, diaries:diaries});
        });
        
    });
});

// EDIT USER PROFILE ROUTE
router.get("/users/:id/edit", middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if (err){
            res.redirect("back");
        } else {
            res.render("users/edit", {user: foundUser});
        }
    });
});

// UPDATE USER PROFILE ROUTE
router.put("/users/:id", middleware.isLoggedIn, function(req, res){
    // find and update the correct diary
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            res.redirect("back"); 
        } else {
            res.redirect("/users/"+req.params.id);
       }
    });
});

//DESTROY USER PROFILE ROUTE
router.delete("/users/:id", middleware.isLoggedIn, function(req,res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;
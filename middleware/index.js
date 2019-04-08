//all middleware


var Diary = require("../models/diary"),
    Comment = require("../models/comment");
var middlewareObj = {};

// middlewareObj.checkIsAdmin=function(req,res,next){
//     if(req.user.isAdmin.equals(true)){
//         next();
//     } else {
//         req.flash("error","You don't have permission!");
//         res.redirect("back");
//     }
// }

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error","You need to be logged in!");
        res.redirect("/login");
    }
}

middlewareObj.checkDiaryOwnership= function(req,res,next){
    if(req.isAuthenticated()){
            //does user own the diary?
            Diary.findById(req.params.id, function(err, foundDiary){
                if(err){
                    req.flash("error","Diary was not found!");
                    res.redirect("back");
                } else {
                    if(foundDiary.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","You don't have permission!");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error","You need to be logged in!");
            res.redirect ("back");
        }
}



middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        //does user own the diary?
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error","Comment was not found!");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be logged in!");
        res.redirect ("back");
    }
}

module.exports = middlewareObj;
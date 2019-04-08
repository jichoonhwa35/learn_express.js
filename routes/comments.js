
// ===================
// COMMENTS ROUTES
// ===================

var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Diary = require("../models/diary"),
    Comment = require("../models/comment");
var middleware = require("../middleware");

// new comments
router.get("/new", middleware.isLoggedIn, function(req,res){
    // find diary by id
    console.log(req.params.id);
    Diary.findById(req.params.id, function(err, diary){
        if (err){
            console.log(err);
        }else{
            res.render("comments/new", {diary: diary});
        }
    });
});

// create comments
router.post("/", middleware.isLoggedIn , function(req, res){
    // lookup campgournd using id
    Diary.findById(req.params.id, function(err, diary){
        if (err){
            console.log(err);
            res.redirect("/diaries");
        }else {
            console.log(req.body.comment)
            // create new comment
            Comment.create(req.body.comment, function(err,comment){
                if (err){
                    req.flash("error","Something went wrong!");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    // connec new comment to campgorund
                    diary.comments.push(comment);
                    diary.save();
                    req.flash("success","Successfully added comment!");
                    // redirect diary show page
                    res.redirect("/diaries/"+diary._id);
                }
            });
        }
    });
});

// Comment edit routes
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
          res.render("comments/edit", {diary_id: req.params.id, comment: foundComment});
      } 
    });
});

//comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/diaries/"+req.params.id);
        }
    });
});

//Destroy comment routes
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back") 
        } else{
            req.flash("success","Comment deleted!");
            res.redirect("/diaries/"+req.params.id)
        }
    })
})


module.exports = router;
var express = require("express");
var router = express.Router();
var Diary = require("../models/diary");
var middleware = require("../middleware");
var multer=require("multer");
var storage=multer.diskStorage({
    fileName:function(req,file,callback){
        callback(null,Date.now()+file.originalname);
    }
});
var imageFilter=function(req,file,cb){
    //accept image file only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
}

var upload=multer({storage:storage, fileFilter:imageFilter});
var cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name:"jichoonhwa35",
    api_key:"535268698565569",
    api_secret:"uby1o3Ff6MQmwWtkAGwEdRmFmLM"
});


// ===================
// HOME ROUTES
// ===================

// INDEX - show all diaries
router.get("/", function(req,res){
    var noMatch;
    if(req.query.search){
       const regex = new RegExp(escapeRegex(req.query.search),"gi");
       Diary.find({name:regex},function(err, allDiaries){
        if(err){
            console.log(err);
        }else{
            if(allDiaries.length<1){
                noMatch="No diaries found, please try again!";
            }
            res.render("diaries/index",{diaries:allDiaries, noMatch:noMatch});
        }
    }); 
    } else{
    // Get all diaries from DB
        Diary.find({},function(err, allDiaries){
            if(err){
                console.log(err);
            }else{
                res.render("diaries/index",{diaries:allDiaries, noMatch:noMatch});
            }
        });
    }
});

// CREATE -add new diary to DB
router.post("/", middleware.isLoggedIn, upload.single("image"), function(req,res){
    // res.send("YOU HIT THE POST ROUTE!")
    // get data from form and add to diaries array
    var name = req.body.name;
    var image = req.body.image;
    var location = req.body.location;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newDiary = {name:name, image:image, location:location, description:desc, author: author};
    
    cloudinary.uploader.upload(req.file.path,function(result){
       //add cloudinary url for the iamge to the campgorund object under image property
       req.body.diary.image=result.secure_url;
       //add author to campgorund
       req.body.diary.author={
           id: req.user._id,
           username: req.user.username
       }
    // create a new diary and save to database
    Diary.create(req.body.diary, function(err, diary){
        if(err){
            req.flash("error", err.message);
            return res.redirect("back");
        }else{
            // redirect back to cmapgrounds page
            res.redirect("/diaries/"+ diary.id);
        }
    });
    });
});

// NEW - show form to create new diary
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("diaries/new");
});

// SHOW -show more info about one diary
router.get("/:id", function(req, res) {
    //find the diary with provided id
    Diary.findById(req.params.id).populate("comments").exec(function(err, foundDiary){
        if(err){
            console.log(err);
        }else{
            console.log(foundDiary);
            // render show template with that campround
            res.render("diaries/show", {diary:foundDiary}); 
        }
    });
});

// EDIT CAMPGOUND ROUTE
router.get("/:id/edit", middleware.checkDiaryOwnership, function(req,res){
    Diary.findById(req.params.id, function(err, foundDiary){
        if (err){
            res.redirect("back");
        } else {
            res.render("diaries/edit", {diary: foundDiary});
        }
    });
});

// UPDATE diary ROUTE
router.put("/:id", middleware.checkDiaryOwnership, function(req, res){
    // find and update the correct diary
    Diary.findByIdAndUpdate(req.params.id, req.body.diary, function(err, updatedDiary){
        if(err){
            res.redirect("back"); 
        } else {
            res.redirect("/diaries/"+req.params.id);
       }
    });
});

//DESTROY CAMPTOUND ROUTE
router.delete("/:id", middleware.checkDiaryOwnership,function(req,res){
    Diary.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/diaries");
        } else {
            res.redirect("/diaries");
        }
    });
});


function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}

module.exports = router;
# Associations

## Intro to Associations
* relationship between dataset
* one : one  ex) employee:ID
* one : many ex) facebook account : photoes
* many : many ex) books: authors
 

## Embedding Datan in User
embed.js
User
Post

    posts:[postSchema]

## Referenceing Data in User 
reference.js

     posts:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Psot"
     }] // referencing the suer

## Module.Exports
### in campground.js
var     mongoose    = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image:String,
   description:String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);

### in app.js
var  Campground  = require("./models/campground"),
# RESTful 
REST - a mapping between HTTP routes and CRUD (create, read, update, destroy)

# 7 RESTful routes

name     path            HTTP verb  purpose                                               mongoose method
=================================================================================================================
index   /blogs              GET     list all blogs                                      blog.find()
new     /blogs/new          GET     show new blog form                                  N/A
create  /blogs              POST    create a new blog, then redirect somewhere          blog.create()
show    /blogs/:id          GET     show info about one specific blogs                  blog.findById()
edit    /blogs/:id/edit     GET     show edit form for one blog                         blog.findById
update  /blogs/:id          PUT     update a particular blog, then redirect somewhere   blog.findByIdAndUpdate()
destroy /blogs/:id          DELETE  delete a particular blog, then redirect somewhere   blog.findByIdAndRemove()



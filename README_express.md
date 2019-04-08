# Introduction about Express
* It is light weight framwork

# NPM Init and package.json 
* contians all metadata of relavent to the specific project
* use the "--save" flag to install packages 
* nstall the package and save into the exist pakage file alreday.
* use "npm init" to create a new pakage.json

# Routing
* (route matcher) "*" instead of all other keywords does not mentioned to match all the route 
* route order from up to down, once one of the route is triggered, the other will not run anymore
* write routes containing route parameters in ""
* ex) app.get("/r/subredditName")
* res.send() only send once can not used in loop.
* app.listen(process.eve.PORT, process.env.IP) is needed to start the server


# Rendering HTML
* EJS allows embed JS into html file 
* res.render("") to render ejs file
* <%= %> pass JS code in ejs file into html 

# EJS control flow
* <%=  %> value turns(shows) into html
* <% %> do not shown in html for logic things like loops

# Styles & Partials
* assets - use link tag in ejs file and make styles files in publi directory
* app.use(express.static("directory name")); means use the files in that directory
* to use EJS
* partials to dry up code: partials directory to simplify code for some template such as header.ejs or footer.ejs

# Post requests
* routes for post requests : app.post()
* postman:  an app
* form to send post requests: <form> </form>
* body-parser to get from data: npm install body-parser --save
* body-parser take the request body and parse it to JS

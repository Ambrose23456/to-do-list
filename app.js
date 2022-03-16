const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let tasks = ["clean", "wash", "cook"];
let workItems = [];

app.get("/", function(req, res){
    
    let day = date.getDay();
    res.render("lists", {listTitle: day, newListItems: tasks});
});

app.post("/", function(req, res){

   let item = req.body.newItem;

   if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work")
   } else{
    tasks.push(item);
    res.redirect("/")
   }

});

app.get("/work", function(req, res){
    res.render("lists", {listTitle: "Work List", newListItems: workItems})
})

app.get("/about", function(req,res){
    res.render("about")
})

app.listen(8080, function(){
console.log("server is now running at port 8080")
});
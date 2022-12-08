//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const _ = require("lodash");

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', './views');

//app.js

 // view engine setup
 app.set('views', './views');
 app.engine('html', require('ejs').renderFile);
 app.set('view engine', 'html');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose schema setting
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser : true});
mongoose.connect("mongodb+srv://admin:test123@cluster0.tlhfumi.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser : true});
const itemsSchema = {
  name : String
}

// mongoose model setting
const Item = mongoose.model("Item", itemsSchema);

// default mongoose document
const item1 = new Item ({
  name : "Welcome to your todolist!❤"
});
const item2 = new Item ({
  name : "Hit the ➕ button to add a new item"
});
const item3 = new Item ({
  name : "👈 Hit this ✔ to delete an item"
});

const defaultItems = [item1, item2, item3];

// parent schema for the itemsSchema
const listSchema = {
  name : String,
  items : [itemsSchema]
}

const List = mongoose.model("List", listSchema);




app.get("/", function(req, res) {

const day = date.getDate();

// {} 로 하면 전부가 된다.
Item.find ({}, function(err, foundItems) {

  if (foundItems.length === 0) {
    Item.insertMany(defaultItems, (err) => {
      if (err) {
        console.log(err);
      }else {
        console.log("insert success!!");
        res.redirect("/");
      }
    })


  } else {
      res.render("index", {listTitle: "Today", newListItems: foundItems});
  }

});
});


app.get("/:customListName", function(req,res) {
  const customListName = _.capitalize(req.params.customListName);
  console.log("customListName :: " , customListName);

  // findOne returns only one object
  List.findOne({name : customListName} , (err, foundList) => {
   if (!err) {
     if (!foundList) {
       // create a new list
         const list = new List({ // model
           name : customListName,
           items : defaultItems
         });

         list.save();
         res.redirect("/" + customListName);

     } else {
       // show an existing list
       res.render("index",  {listTitle: foundList.name, newListItems: foundList.items });
     }
   }
  });


});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list; // name

  const item = new Item({ // new document
    name : itemName
  });

  if (listName === "Today") { // default page
    item.save(); // insert one item
    res.redirect("/");

  } else { // custom list
    List.findOne({ name : listName} , function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName );
    })
  }

});

app.post("/delete", function(req,res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId , (err) => {
      if (!err) {
        console.log(checkedItemId ," has removed from default page!");
      }
    });
    res.redirect("/");

  } else { // condition, update, callback
    List.findOneAndUpdate({name : listName}, {$pull:{items:{_id:checkedItemId} }} , function(err, foundList) {
      if(!err) {
        console.log(checkedItemId ,` has removed from ${listName} list!`);
        res.redirect("/" + listName);
      }
    })
  }

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000
}


app.listen(port, function() {
  console.log("Server has started !");
});

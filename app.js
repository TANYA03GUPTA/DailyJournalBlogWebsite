//jshint esversion:6

const  express = require('express');
const  bodyParser = require('body-parser');
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const port = 3008;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//mongodbconnection
mongoose.connect("mongodb+srv://gupta14aynat:IDKMZJcwlr9PLMDW@journalcluster.xxcqeqs.mongodb.net/JblogDB", { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, ' MongoDb connection error: '));

//dB configure create
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title : String,
  content : String
})
// create mongomodel for this
const Post = mongoose.model("Post", postSchema);
//deleting post array
//let postsarray = [];
app.get("/",(req,res)=>{
 
  /*res.render("home",{data1: homeStartingContent,
  posts: postsarray});*/
  //making changes to fit mongodb
  // Assuming this code is inside an async function
 Post.find().then(posts =>{
  res.render("home",{
    data1 : homeStartingContent,
    posts: posts
  });
 })
 .catch(function(err){
  console.log(err);
 });
});



app.get("/compose",async (req,res)=>{
  console.log("on /compose page");
  //const result = await axios.post()
  res.render("compose")
})

app.post("/submit",  (req,res)=>{
    //mongodb changes to store info in db 
    const post = new Post({
      title: req.body.posttitle,
      content : req.body.postBody
    })
    /*  const post= {
      title : req.body.posttitle,
      bodypost : req.body.content
    };*/
    
    post.save();
    res.redirect("/");
})

app.get("/posts/:postName",(req,res)=>{

 console.log("postanem read more pr hun")
 const requestedTitle = _.lowerCase(req.params.postName);

  Post.findOne({title: requestedTitle})
  .then((post)=>{
   res.render("post",{
     title: post.title,
     content: post.content
   });
  });
});
app.get("/about",(req,res)=>{
  res.render("about",{data2: aboutContent});
  console.log("on /about page");
})

app.get("/conttact",(req,res)=>{
  res.render("contact",{data3: contactContent});
  console.log("on /contact page");
})

app.listen(port,()=>{
  console.log(`Listening on port ${port}`);
})













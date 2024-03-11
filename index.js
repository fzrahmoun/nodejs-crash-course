const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article")

const app = express();

mongoose.connect("mongodb+srv://fati:fati123@cluster0.0zljujv.mongodb.net/?retryWrites=true&w=majority")
.then( () => {
    console.log("connected");
}).catch( (error) => {
    console.log("error with connecting database",error);
})

app.use(express.json())

app.get("/hello", (req,res) => {
    // res.send("hello")

    res.render("index.ejs",{
      "name":"fati", 
    });
})
app.get("/", (req,res) => {
    res.send("welcome to node js app")
})
app.get("/sum/:number1/:number2", (req,res) => {
   const num1 = req.params.number1;
   const num2 = req.params.number2;
   const total = Number(num1) + Number(num2);
   res.send(`${total}`);

})

app.get("/bodyparam", (req,res) => {
    const bodyparam = req.body.name
    console.log(`${bodyparam}`)
    res.send(`hello ${bodyparam}`);
 })

 app.get("/queryparam", (req,res) => {
    const bodyparam = req.body.name
    const queryparam = req.query
    
    res.send(`hello ${bodyparam} ,age is ${queryparam.age}`);
 })

app.put("/hi", (req,res) => {
    res.send("hi")
})

app.post("/test", (req,res) => {
    res.send("test")
})

app.delete("/deletePage", (req,res) => {
    res.send("delete Page")
})


// Articles endpoints

app.post("/articles", async (req,res) => {

   const titleArt = req.body.titleArticle;
   const bodyArt = req.body.bodyArticle;

    const newArticle = new Article()
    newArticle.title = titleArt
    newArticle.body = bodyArt
    newArticle.numberOfLikes = 2
    await newArticle.save()

    res.json(newArticle)
})

app.get("/articles",async (req,res) =>{
const getArticle = await Article.find()
res.json(getArticle)
})

app.get("/articles/:articleId", async (req,res) =>{
    const id = req.params.articleId;
    const getArticleById = await Article.findById(id)
    res.json(getArticleById)

})

app.delete("/articles/:articleId", async (req,res) =>{
    const id = req.params.articleId;
    const deleteArticleById = await Article.findByIdAndDelete(id)
    res.json(deleteArticleById)

})


app.get("/showArticles",async (req,res) =>{
    const getArticles = await Article.find()

    res.render("articles.ejs",{allArticles:getArticles});
    })


app.listen(3000, () => {
    console.log("I am listening in port 3000")
})
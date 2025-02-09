const express = require("express");
const app = express();
const user = require("./routes/user");
const post = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const sessionOption = {
    secret: "mysupersecretstring",resave:false, saveUninitialized: true 
}

app.use(cookieParser("secretcode"));

app.use(session(sessionOption));

app.get("/register" , (req,res) =>{
    let {name ="anonymous"} = req.query;
    res.send(name);
});

app.get("/hello" , (req,res) =>{
    res.send("hello");
})



app.get("/reqcount", (req,res) =>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send(`you sent a request ${req.session.count} times`)
});
// app.get("/", (req, res) =>{
//     res.send("you sent a request x times")
// })

app.get("/test" , (req, res) =>{
    res.send("test sucessful ");
});

app.use("/user" , user);
app.use("/post", post);





app.listen(3000, () =>{
    console.log("server is listening to port 3000")
});
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Delta";
const session = require("express-session");
const flash = require("connect-flash"); //for using flash(single time appear on screen like alert or error part)

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err)
});


async function main() {
    await mongoose.connect(MONGO_URL);
};

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const sessionOption = {
    secret: "mysupersecretstring",resave:false, saveUninitialized: true ,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,  //for how much time this cookie will save our info like here we set it for 1 week( day * hour * min * sec * milisecond)
        maxage : 7* 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
};

app.get("/", (req,res) => {
    res.send("hi i m root");
});

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    next();
})





const validateListing = (req,res,next) =>{
   let {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
};

const validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
     
     if(error){
         let errMsg = error.details.map((el) =>el.message).join(",");
         throw new ExpressError(400,errMsg)
     }else{
         next();
     }
 };



 app.use("/listings",listings);
 app.use("/listings/:id/reviews", reviews);

app.all("*",(req,res,next) =>{
    next(new ExpressError(404, "Page Not Found !"));
});

app.use((err,req,res,next) =>{
    let {statusCode = 500, message = "something went wrong!"} = err;
    res.status(statusCode).render("listings/error.ejs", {message});
    // res.status(statusCode).send(message);
});


app.listen(8080, () => {
    console.log("server is listening to port 8080 ");
});
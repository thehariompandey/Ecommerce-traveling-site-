if(process.env.NODE_ENV != "production"){
  require('dotenv').config();

}

console.log(process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/User.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/Delta";
const dburl = process.env.ATLASDB_URL;

const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash"); //for using flash(single time appear on screen like alert or error part)
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/User.js")

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () =>{
  console.log("Error in mongo store", err);
});

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //for how much time this cookie will save our info like here we set it for 1 week( day * hour * min * sec * milisecond)
    maxage: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// app.get("/", (req, res) => {
//   res.send("hi i m root");
// });


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get( "/demouser",async(req,res) => {
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username: "hariom-pandey"
//     });

//     let registerUser = await User.register(fakeUser, "helloworld");
//     res.send(registerUser);

// })

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found !"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080 ");
});

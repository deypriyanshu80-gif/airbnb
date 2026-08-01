const session=require("express-session");
const flash=require("connect-flash");
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const Listing = require("./models/listing");
const path=require("path");
const wrapasync=require("./utils/wrapAsync");
const ExpressError=require("./utils/expressError");
const wrapAsync = require("./utils/wrapAsync");
const { reviewSchema } = require("./schema");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true    //////
};

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate); 
app.set('view engine', 'ejs');
app.set('view engine', 'ejs');
const mongo_url="mongodb://127.0.0.1:27017/wanderLust";
main().then(()=>{
    console.log("visca barca");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(mongo_url);
}
app.get("/",(req,res)=>{
    res.send("app working at root");
});
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
})
app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).send(message);
})
app.listen(8080,()=>{
    console.log("the server is listening to port 8080");
});
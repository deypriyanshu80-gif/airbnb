const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const expressError=require("../utils/expressError.js");
const {reviewSchema}=require("../schema");
const Listing = require("../models/listing.js");
const review = require("../models/review.js");
const { isLoggedIn,reviewAuthor } = require("../middleware.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}//router post
router.post("/",validateReview,isLoggedIn,wrapAsync(async(req,res)=>{
       let listing=await Listing.findById(req.params.id);
    let newReiew=new Review(req.body.review);
    newReiew.author=req.user._id;  /// 
    listing.reviews.push(newReiew);
    await newReiew.save();
    await listing.save();
    req.flash("success","new listing created!");
   
    res.redirect(`/listings'${listing._id}`);
}))//router delete
router.delete("/",isLoggedIn,reviewAuthor,wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))
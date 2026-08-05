const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const expressError=require("../utils/expressError.js");
const {listingSchema,reviewSchema}=require("../schema");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController=require("../controllers/listings.js")
//index route
router.get("/",wrapAsync(ListingController.index));

//new route
router.get("/new",isLoggedIn,ListingController.newList);
//show route
router.get("/:id",
    wrapAsync(ListingController.showForm));

//CREATE ROUTE
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id;  ////
    await newlisting.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
}))
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditForm));


//update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(ListingController.updateListing));

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing)); 

module.exports=router;
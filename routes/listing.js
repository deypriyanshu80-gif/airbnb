const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const expressError=require("../utils/expressError.js");
const {listingSchema,reviewSchema}=require("../schema");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

//index route
router.get("/",wrapAsync(async(req,res)=>{
   const allListings = await Listing.find({}).populate("owner");
    res.render("listings/index.ejs",{allListings});
})
);
//new route
router.get("/new",isLoggedIn,(req,res)=>{
   
   res.render("listings/new.ejs");
});
//show route
router.get("/:id",
    wrapAsync(async(req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id).populate({        ////
            path:"reviews",
           populate:{
            path:"author",
           } 
        }).populate("owner");
        if(!listing){
            req.flash("error","listing does not exist");
            res.redirect("/listing");
        }
        res.render("listings/show.ejs",{listing});
    })
)
//CREATE ROUTE
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id;  ////
    await newlisting.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
}))
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findbyId(id);
    if(!listing){
        req.flash("error","listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}))

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing });///
        req.flash("success","listing updated!");
        res.redirect(`/listing/${id}`);
   
    
}))
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let removedListing = await Listing.findByIdAndDelete(id);
    console.log(removedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));
module.exports=router;
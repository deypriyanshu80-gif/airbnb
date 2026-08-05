const Listing = require("../models/listing");

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.js",{allListinbgs});
}
module.exports.newList=async(req,res)=>{
       res.render("listings/new.ejs");
}
module.exports.showForm=async(req,res)=>{
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
}
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
   const listing=await Listing.findById(id);
   if(!listing){
    req.flash("error","listing does not exist");
    res.redirect("/listings");
   }
    res.render("listings/edit.ejs",{listing});
   }
   module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
      await Listing.findByIdAndUpdate(id,{...req.body.listing });
            req.flash("success","listing updated!");
            res.redirect(`/listing/${id}`);
   }
   module.exports.destroyListing=async(req,res)=>{
     let { id } = req.params;
    let removedListing = await Listing.findByIdAndDelete(id);
    console.log(removedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
   }
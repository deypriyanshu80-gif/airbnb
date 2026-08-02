
const Review = require("./models/review.js");
const ExpressError=require("./utils/expressError.js");
const {listingSchema,reviewSchema}=require("./schema");
module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.path,"..",req.orginalUrl);       /////
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;       /////
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{        ////
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    
    // 1. Import the model with a CAPITAL 'L'
    const Listing = require("./models/listing"); 
    
    // 2. Fetch data using the Capital 'L' model, save to lowercase 'l' listing
    let listing = await Listing.findById(id);
    
    // 3. NOW we can safely check the owner
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    
    // 4. Move on to the delete route
    next();
};
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);          ////

        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }
    }
module.exports.reviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you dont have permission to edit this review");
        return res.redirect(`/listings/${id}`);
    }next();
}

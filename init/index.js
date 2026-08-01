const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");


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
const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data.map((obj)=>({...obj,owner:"652d0081ae547c5d37e56b5f"})); /////
    await Listing.insertMany(initData.data);
    console.log("data was initilaliased");
}
initDB();

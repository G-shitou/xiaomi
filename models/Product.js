var mongoose=require('mongoose');
var ProductSchema=new mongoose.Schema({
    id:Number,
    name:String,
    title:String,
    count:Number,
    price:Number,
    url:String,
    url1:String,
    url2:String
});
module.exports=mongoose.model('Product',ProductSchema);
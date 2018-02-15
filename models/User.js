var mongoose=require('mongoose');
var UserSchema=new mongoose.Schema({
    name:String,
    pwd:String,
    sex:String,
    tel:String
});
module.exports=mongoose.model('User',UserSchema);
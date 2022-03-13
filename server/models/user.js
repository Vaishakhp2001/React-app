const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
});

const adminSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    console.log(token)
    return token
}

adminSchema.methods.generateAuthToken = function(){
    const admintoken = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    console.log(admintoken)
    return admintoken
}

const User = mongoose.model('user',userSchema);
const Admin = mongoose.model('admin',adminSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName:Joi.string().required().label('First Name'),
        lastName:Joi.string().required().label("Last Name"),
        email:Joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password")
    })
    
    return schema.validate(data) 
}

const validates = (data) => {
   
    const schemas = Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password")
    })
    return schemas.validate(data)
}  

module.exports = {User,Admin,validate,validates};
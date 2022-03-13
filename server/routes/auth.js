const router = require('express').Router();
const {User,validates} = require('../models/user')
const joi = require("joi");
const bcrypt = require('bcrypt');
const req = require('express/lib/request');
const { valid } = require('joi');
const Joi = require('joi');
// const userRouter = require('./routes/auth')
// const authRouter = require('./routes/auth')


router.post('/',async(req,res)=>{
    console.log(req.body)
    try{
        const {error} = validates(req.body)
        
        if(error)
            return res.status(400).send({message:error.details[0].message});
        
        const user = await User.findOne({email:req.body.email});
        console.log(user)
        if(!user)
            return res.status(401).send({message:"Invalid Email or Password"});

        const validPassword = await bcrypt.compare(
            req.body.password,user.password
        );
        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or Password"});
        
        const token = user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in successfully"})
        
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:"Internal server error"})
        
        
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password")
    })
}  

module.exports = router;
const router = require('express').Router()
const { response } = require('express')
const { User,Admin } = require('../models/user')
const { validates } = require('../models/user')


router.get('/', async (req, res) => {
    try {
        const user = await User.find({})
        res.json(user)
    }
    catch (error) {
        console.log("error:", error)
    }
})
router.get('/delete-user/:id', (req, res) => {
    try {
        User.deleteOne({ _id: req.params.id }).then((response) => {

            res.json({ status: true })
        })
    }
    catch (error) {
        console.log(error)
    }
})
router.get('/user/:id', async (req, res) => {
    try {
        console.log('id', req.params.id)
        const user = await User.findOne({ _id: req.params.id })
        console.log(user)
        res.json(user)
    }
    catch (error) {
        console.log(error)
    }
})
router.post('/user/edit/:id', async (req, res) => {
    try {
        console.log("post id", req.params.id)
        await User.updateOne({ _id: req.params.id }, {
            $set: { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }
        }).then((response) => {
            console.log(response)
            res.json(response)
        })
    }
    catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validates(req.body)
        console.log("error",{error})
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // const admin = await Admin.findOne({email:req.body.email,password:req.body.password})
        const data = req.body
        
        const admin = await Admin.findOne({email:req.body.email,password:req.body.password})
        console.log("admin",admin)
        if (!admin)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const admintoken = admin.generateAuthToken();
        res.status(200).send({ data: admintoken, message: "Logged in successfully" })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" })
    }
})

module.exports = router
const router = require('express').Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/authMiddleware')

// user Registration

router.post('/register', async (req, res) =>{
    try{
        
        // check if user already exist or not
        const user = await User.findOne({ email: req.body.email });
        if(user){
            return res.send({
                message: "User already exist",
                success: false
            })
        }

        // create a new user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({...req.body, password: hashedPassword})
        
        return res.status(200).send({
            message: "User created successfully",
            success: true,
            
        })
        

    }catch(err){
        res.send({
            message: err.message,
            success: false
        })

    }
})


// user Login
router.post('/', async (req, res) => {
    try {
        // check for user
        const user = await User.findOne({email : req.body.email});
        if(!user){
            return res.send({
                message: "User not found",
                success: false
            })
        }

        // check for password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.send({
                message: "Invalid password",
                success: false
            })
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })


        return res.status(200).send({
            message: "User logged in successfully",
            success: true,
            data: token
        })

        
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})

// get current user
router.get("/get-current-user", authMiddleware ,async (req, res)=>{
    const user = await User.findOne({ _id: req.body.userId })
    if(!user){
        return res.send({
            message: "User not found",
            success: false
        })
    }

    return res.send({
        message: "User found",
        success: true,
        data: user
    })
    

})

// get all users except current user
router.get("/allusers", authMiddleware , async (req, res) => {
    try
    {
     const allUsers = await User.find({ _id: { $ne: req.body.userId }})
    
        return res.status(200).send({
            message: "Users found",
            success: true,
            data: allUsers
        })
     }
    
    catch(error){
        return res.send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;
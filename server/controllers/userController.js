const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req,res) => {
    try{
        const existingUser = await User.findOne({email: req.body.email});
        
        if(existingUser){
            res.status(403).send({
                success:false,
                message:"User already exists"
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPassword;

        const newUser = await User.create(req.body);
        res.status(200).send({
            success:true,
            message:"Registration successful. Please Login!"
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Something went wrong. Please try again after some time."
        });
    }
};

const login = async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            res.status(401).send({
                success:false,
                message:"Invalid credentials!"
            });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password,user.password);

        if(!validPassword){
            res.status(401).send({
                success:false,
                message:"Invalid credentials!"
            });
            return; 
        }

        const token = jwt.sign(
            {userId:user._id, emailId:req.body.email},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
        );

        res.status(200).send({
            success:true,
            message:"User Logged In!",
            data:token
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Something went wrong. Please try again after some time."
        });
    }
}

const getCurrentUser = async (req, res) => {
    try{
        const user = await User.findById(req.body.userId).select("-password");
        res.status(200).send({
            success: true,
            message: "User details fetched successfully",
            data: user
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Something went wrong. Please try again after some time."
        });
    }
}

module.exports = {
    register,
    login,
    getCurrentUser
}
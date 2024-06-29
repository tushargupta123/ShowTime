const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decodedToken.userId;
        next();
    }catch(err){
        console.log(err);
        res.status(401).send({
            success: false,
            message: "Invalid token"
        })
    }
}
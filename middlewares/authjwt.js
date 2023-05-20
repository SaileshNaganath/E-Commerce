const jwt = require("jsonwebtoken");
const config = require ("../configs/auth.config");
const db = require ("../models");
const User = db.user;

verifyToken = (req,res,next)=>{
    
    let token=req.headers("x-access-token");//get access to token passed by user

    if(!token){//if no token passed, throw err 
        return res.status(403).send({
            message:"No Token Provided"
        });
    }

    //Do the verification of the token
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorised"
            });
        }

        req.userID = decoded.id ;
        next();
    })

}

//Check whether the user who hit the API is admin or nto
isAdmin =(req,res,next)=>{

    User.findByPK(req.userID)
    .then(user=>{
        user.getRoles()
        .then(roles=>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"Required Admin role"
            });
            return;
        });
    });
};

const authJwt={
    verifyToken:verifyToken,
    isAdmin:isAdmin
}

module.exports = authJwt;
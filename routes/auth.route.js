const express = require("express");
const router = express.Router();
const { authCtrl } = require("../controllers/auth.controller");
const { error } = require("../utils/validationSchema.util");


router.post("/signUp", authCtrl.signUp);
router.get("/verifyEmailPage", authCtrl.renderVerifyEmailPage);
router.post("/login", authCtrl.login);
router.post("/refreshToken", authCtrl.refreshToken);
router.post("/forgotPassword",  authCtrl.forgotPassword);
router.put("/verifyOtp", authCtrl.verifyOtp);

router.get("/example", async(req,res)=> {
    try { 
        return res.status(502).json({message : "Bad Gateway Error"});
    }catch(error){
        return res.status(502).json({message : "Bad Gateway Error"});
    }
})
router.get("/notImplemented", async(req,res)=> {
    try {
        return res.status(501).json({message : "Not Implmented"});
    }catch (err){
        
    }
});
router.get("/noContent", async(req,res)=> {
    try {
        return res.status(204).json({message : "No content"});
    }catch (err){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
});
router.head("/setHeader", async(req,res)=>{
    try {
        res.set("Content-Type", 'text/plain');
        res.cookie('IIITSurat', "dhaskjdhakjsdhjkashdjkhasjkadkhsdjkashdjkhajksh");
        console.log(req.headers);
        console.log(res.header);
        return res.status(200).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
})

// router.post("/changePassword",  authCtrl.changePassword);

module.exports = router;

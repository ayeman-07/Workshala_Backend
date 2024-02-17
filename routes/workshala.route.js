const express = require("express");
const router = express.Router();
const { workshalaCtrl } = require("../controllers/workshala.controller");
const { Token } = require("../middlewares/token.middleware");
const User = require('../models/user.model')

router.get("/dashboard", Token.verifyAccessToken, workshalaCtrl.dashBoard);
router.get("/profile", Token.verifyAccessToken, workshalaCtrl.getProfile);
router.get("/jobs", workshalaCtrl.getJobs);
router.get("/getCompanies", workshalaCtrl.getCompanies);
router.get("/getJobsByCompanyName", workshalaCtrl.getJobsByCompanyName);
router.put('/name',Token.verifyAccessToken, async(req,res)=> {
  try {
      const userId = req.user.id;
      const {name} = req.body;
      const user = await User.findByIdAndUpdate(userId,{name:name});
      return res.status(201).json({message : "Name updated Successfully"})
  } catch (error) {
      console.log(error);
      return res.status(500).json({message : "Internal Server Error"})
  }
})
router.delete('/deleteUser',Token.verifyAccessToken, async(req,res)=> {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    console.log(user);
    return res.json({message : "User Account deleted Successfully"}).status(204);
  }catch(err){
      console.log(err);
      return res.status(500).json({message : "Internal Server Error"});
  }
})

// router.post("/addToCart" , Token.verifyAccessToken ,workshalaCtrl.addToCart);
// router.get("/getCartItems", Token.verifyAccessToken, workshalaCtrl.getCartItems);

module.exports = router;

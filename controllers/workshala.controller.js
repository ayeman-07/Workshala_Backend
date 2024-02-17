const Job = require("../models/job.model");
const Profile = require("../models/profile.model");
const axios = require('axios');
const Company = require('../models/company.model');



const workshalaCtrl = {
    dashBoard : async (req, res) => {
        try {
            const userId = req.user.id;
            const existingProfile = await Profile.findOne({ userId : userId });

            if(!existingProfile) {
                const newProfile = new Profile({
                    userId : userId,
                    name : req.user.name
                });
                await newProfile.save();
            }

            const { verificationToken , password , ...filteredData } = { ...req.user._doc } ;  

            res.status(200).json(filteredData);

        }catch(err){
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"}); 
        }
    },
    getProfile : async (req, res) => {       
        try{
            const userId = req.user.id;
            const existingProfile = await Profile.findOne({ userId: userId });
            res.status(200).json(existingProfile);
        }catch(err){
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }

    },
    
    getJobs : async (req, res) => {
        try {
            
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    },
    getCompanies : async (req, res) => {
        try {
            const companies = await Company.find();
            res.status(200).json(companies);
        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    },
    getJobsByCompanyName : async (req, res) => {
        try {
            const {companyName} = req.body;
            const jobs = await Job.find({ companyName: companyName });
            const company = await Job.findOne({ companyName: companyName });
            
            
            res.status(200).json(jobs);
        } catch(err) {
            console.log(err);
            res.status(500).json({ message : "Internal Server Error"});
        }
    },

    // addToCart : async (req, res) => {
    //     try {
    //         const {jobId} = req.body ;

    //         const userId = req.user.id ;
    //         const existingCart = await Cart.findOne({ userId : userId });

    //         if(!existingCart){
    //             const newCart = new Cart({
    //                 userId : userId ,
    //                 jobsApplied : [jobId]
    //             });               

    //             await newCart.save();
    //         } else {
    //             if (!Array.isArray(existingCart.jobsApplied)) {
    //               existingCart.jobsApplied = []; 
    //             }

    //             if (!existingCart.jobsApplied.includes(jobId)) {
    //               existingCart.jobsApplied.push(jobId);
    //               await existingCart.save();
    //             } else {
                  
    //               return res
    //                 .status(400)
    //                 .json({ message: "Job is already in the Cart" });
    //             }
    //         }
            
    //         const job = await Job.findById(jobId);
            
    //         job.applicants.push(userId);
    //         await job.save();

    //         return res.status(201).json({message : "Job Added to Cart Successfully"});           


    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message : "Internal Server Error"});
    //     }
    // },
    // getCartItems : async (req, res) => {
    //     try {
    //         const userId = req.user.id ;
    //         const cart = await Cart.findOne({ userId : userId}).populate('jobsApplied');

    //         if( !cart || !cart.jobsApplied.length ) {
    //             return res.status(404).json({ message: "No Items found in Cart" });
    //         
    //         } else{
    //             const jobs = cart.jobsApplied;
    //             return res.status(200).json({ jobs });
    //            
    //         }

    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message : "Internal Server Error "});
    //     }
    // }
};

module.exports = {workshalaCtrl};


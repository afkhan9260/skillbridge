import validator from 'validator';
import bycrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import tutorModel from '../models/tutorModel.js';

const addTutor = async (req,res) => { 

    try{

        const {name, email, password, specialty, about, fees, address}= req.body;
        const image = req.file

        //checking data to add tutor
        if(!name || !email || !password || !specialty || !about || !fees || !address){
            return res.json({success: false, message: "All fields are required"});
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Invalid email format"});
        }

        //validating password length
        if(password.length < 6){
            return res.json({success: false, message: "Password must be at least 6 characters long"});
        }

        //hashing password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        //uploading image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(image.path, {resource_type: "image"});
        const imageUrl = imageUpload.secure_url;

        const tutorData = {
            name,
            email,
            password: hashedPassword,
            specialty,
            about,
            fees,
            address: JSON.parse(address),
            image: imageUrl,
            date: Date.now()
        };

        // Save tutor data to database
        const newTutor = new tutorModel(tutorData);
        await newTutor.save();

        res.json({success: true,message: "Tutor added successfully"});

    }catch(error){
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

export {addTutor};
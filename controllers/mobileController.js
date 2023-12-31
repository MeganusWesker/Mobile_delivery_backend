import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import { Mobile } from "../models/mobileModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";


export const addMobile = catchAsyncErrors(async (req, res, next) => {
    const { name,price,processor,ram,rom,os,type} = req.body;

    console.log(req.body);

    const file =req.file;
    
    if (!name || !price || !processor,!ram, !rom, !os,!file) {
      return next(new ErrorHandler("please enter all fields ", 400));
    }

    const fileUrl =getDataUri(file);

    const myCloud =await cloudinary.v2.uploader.upload(fileUrl.content,{
        folder:"mobile",
    });
  
   const price1=Number(price),
    ram1=Number(ram),
    rom1=Number(rom);

    
    const mobile= await Mobile.create({
        name,
        price:price1,
        processor,
        images:[{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }],
        ram:ram1,
        rom:rom1,
        os,
        type,
    });

    res.status(201).json({
        success:true,
        mobile,
        message:"mobile added"
    })

});


export const addImagesForMobile = catchAsyncErrors(async (req, res, next) => {

    const {id} =req.params;
    const file =req.file;

    const mobile= await Mobile.findById(id);
    
    if (!mobile ) {
        return next(new ErrorHandler("mobile not found with the id", 404));
    }

    if (!file ) {
      return next(new ErrorHandler("please enter all fields", 400));
    }

    const fileUrl =getDataUri(file);

    const myCloud =await cloudinary.v2.uploader.upload(fileUrl.content,{
        folder:"mobile",
    });
  
    mobile.images.push({
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    });

    await mobile.save();

    res.status(201).json({
        success:true,
        message:"image added sucessfully"
    })

});


export const getAllMobile = catchAsyncErrors(async (req, res, next) => {
    const name = req.query.name || "";
    const processor = req.query.processor || "";
    const os = req.query.os || "";
    const price = req.query.price;  
    const ram=req.query.ram;
    const rom=req.query.rom;


   
    const query = {
        name: {
            $regex: name,
            $options: "i"
        },
        processor: {
            $regex: processor,
            $options: "i"
        },
        os: {
            $regex: os,
            $options: "i"
        }
    };

    if (price !== undefined && price !== "") {
        query.price = {
            $lte: price
        };
    }
    

    if (ram !== undefined && ram !== "") {
        query.ram = {
            $gte: ram
        };
    }

    if (rom !== undefined && rom !== "") {
        query.rom = {
            $gte: rom
        };
    }
    const mobiles = await Mobile.find(query);
    
    res.status(201).json({
        success: true,
        mobiles
    });
});

export const getAllMobiles = catchAsyncErrors(async (req, res, next) => {
    const mobiles = await Mobile.find();
    res.status(200).json({
        success: true,
        mobiles,
    });
  });
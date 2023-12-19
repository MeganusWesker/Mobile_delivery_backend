import app from './app.js';
import connectToDataBase from './config/database.js';
import cloudinary from "cloudinary";

// connecting to database 
connectToDataBase();

cloudinary.v2.config({
   cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET
});


app.listen(process.env.PORT,()=>{
   console.log(`Server Started on Port ${process.env.PORT}`);
});

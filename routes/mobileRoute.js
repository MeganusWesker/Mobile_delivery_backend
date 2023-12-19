import express from "express";
const router =express.Router();

import { isAuthenticated,isAdmin } from "../middlewares/auth.js";
import {addMobile,addImagesForMobile, getAllMobile} from "../controllers/mobileController.js"
import singleUpload from "../middlewares/multer.js"


router.route('/addMobile').post(singleUpload,isAuthenticated,isAdmin,addMobile);
router.route('/getAllMobiles').get(getAllMobile);
router.route('/add/image/:id').put(singleUpload,isAuthenticated,isAdmin,addImagesForMobile);

export default router;
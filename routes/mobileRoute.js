import express from "express";
const router =express.Router();

import { isAuthenticated,isAdmin } from "../middlewares/auth.js";
import {addMobile,addImagesForMobile, getAllMobile,getAllMobiles} from "../controllers/mobileController.js"
import singleUpload from "../middlewares/multer.js"



router.route('/getAllMobiles').get(getAllMobile);

// admin routes
router.route("/admin/mobiles").get(isAuthenticated, isAdmin, getAllMobiles);
router.route('/add/image/:id').put(singleUpload,isAuthenticated,isAdmin,addImagesForMobile);
router.route('/addMobile').post(singleUpload,isAuthenticated,isAdmin,addMobile);

export default router;
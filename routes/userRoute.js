import express from "express";
const router =express.Router();

import { isAuthenticated,isAdmin } from "../middlewares/auth.js";
import {register,login,logout} from "../controllers/userController.js"
//import singleUpload from "../middlewares/multer.js"


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated,logout);

export default router;
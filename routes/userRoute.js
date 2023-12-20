import express from "express";
const router =express.Router();

import { isAuthenticated,isAdmin } from "../middlewares/auth.js";
import {register,login,logout,getAllUsers,updateUser} from "../controllers/userController.js"
//import singleUpload from "../middlewares/multer.js"


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated,logout);

// admin routes
router.route("/admin/users").get(isAuthenticated, isAdmin, getAllUsers);
router.route("/admin/updateUser/:id").get(isAuthenticated, isAdmin, updateUser);


export default router;
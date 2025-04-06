import { Router } from "express";
import { register,login,updateUser } from "../controller/userController.js";
import { upload } from "../utils/multer.js";

const route=Router()

route.post("/register",register)
route.post("/login",login)
route.post("/update/profile/:id",upload.single("avatar"),updateUser)

export default route
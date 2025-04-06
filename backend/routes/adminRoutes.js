import { Router } from "express";
import { getallUsers,addUser,updateUser,deleteUser } from "../controller/adminController.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js"


const router=Router()

router.get("/users",authenticateJWT,getallUsers)
router.put("/users/:id",authenticateJWT,updateUser)
router.post("/users/",authenticateJWT,addUser)
router.delete("/users/:id",authenticateJWT,deleteUser)

export default router
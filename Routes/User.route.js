import express from "express";
import {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  loginUserController
} from "../Controllers/User.controller.js";

const router = express.Router();
import {verifyToken} from "../Middleware/jwt_token_verification.js";

router.use(verifyToken);

router.post("/login", loginUserController);

router.post("/", createUserController);
router.get("/", getUserByIdController);
router.put("/", updateUserController);
router.delete("/", deleteUserController);


export default router;
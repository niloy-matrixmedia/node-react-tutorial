import express from "express";
import {getUsers, login, Register} from "../Controller/UserController.js";

const router = express.Router();

router.post("/register",Register)
router.get("/users",getUsers)
router.post("/login",login)

export default router
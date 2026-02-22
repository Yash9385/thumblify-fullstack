import express from "express";
import { saveContact } from "../controllers/ContactController.js";

const router = express.Router();
router.post("/", saveContact);

export default router;
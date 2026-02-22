import { Request, Response } from "express";
import Contact from "../models/Contact.js";

export const saveContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.json({ message: "Message stored successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";

// 🔹 Demo images (random thumbnails)
const demoImages = [
  "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  "https://res.cloudinary.com/demo/image/upload/balloons.jpg",
  "https://res.cloudinary.com/demo/image/upload/couple.jpg",
  "https://res.cloudinary.com/demo/image/upload/coffee.jpg",
  "https://res.cloudinary.com/demo/image/upload/shoes.jpg",
];

// 🔹 Fake delay helper (AI feel)
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session as any;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    // 1️⃣ Create DB entry (generating state)
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    // 2️⃣ Fake AI processing delay (1.5 sec)
    await delay(1500);

    // 3️⃣ Pick a random demo image
    const randomImage =
      demoImages[Math.floor(Math.random() * demoImages.length)];

    // 4️⃣ Save final result
    thumbnail.image_url = randomImage;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    // 5️⃣ Response
    res.json({
      message: "Thumbnail Generated (Demo Mode)",
      thumbnail,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Thumbnail generation failed",
    });
  }
};

// 🗑️ Delete thumbnail
export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session as any;

    await Thumbnail.findByIdAndDelete({ _id: id, userId });
    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};

import express from "express";
import {protect} from "../middleware/auth.middleware.js";
import {getChapterById} from "../controllers/chapter.controller.js";

const router = express.Router();

router.get('/:id', protect, getChapterById);

export default router;

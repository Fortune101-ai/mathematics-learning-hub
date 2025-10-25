import express from "express";
import {protect} from "../middleware/auth.middleware.js";
import {getQuizById, submitQuiz} from "../controllers/quizzes.controller.js";

const router = express.Router();

router.get('/:id', protect, getQuizById);
router.post('/:id/submit', protect, submitQuiz);

export default router;
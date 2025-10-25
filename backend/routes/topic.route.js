import express from 'express'
import { protect } from '../middleware/auth.js'
import { getAllTopics, getTopicById } from '../controllers/topic.controller.js'

const router = express.Router();

router.get('/', protect, getAllTopics);
router.get('/:id', protect, getTopicById);

export default router;

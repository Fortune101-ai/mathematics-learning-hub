import express from 'express'
import {protect} from "../middleware/auth.middleware.js"
import { getAllPosts,createPost,getPostById, addReply, votePost } from '../controllers/forum.controller.js'

const router = express.Router()

router.get('/',protect,getAllPosts)
router.post('/',protect,createPost)
router.get('/:id',protect,getPostById)
router.post('/:id/reply',protect,addReply)
router.patch('/:id/vote',protect,votePost)
export default router
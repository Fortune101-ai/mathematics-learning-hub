import mongoose from "mongoose"

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  authorName: {
    type: String,
    default: "Anonymous",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const forumPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
      default: "Anonymous",
    },
    topic: {
      type: String,
      required: true,
    },
    replies: [replySchema],
    views: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)


const ForumPost = mongoose.model('ForumPost', forumPostSchema);

export default ForumPost;


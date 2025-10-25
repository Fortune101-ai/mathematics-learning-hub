import mongoose from "mongoose";
const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    quizAttempts: [
      {
        score: Number,
        totalQuestions: Number,
        passed: Boolean,
        attemptedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, topicId: 1, chapterId: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;

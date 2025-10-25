import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["multiple-choice", "true-false", "short-answer"],
          required: true,
        },
        options: [String],
        correctAnswer: {
          type: String,
          required: true,
        },
        explanation: String,
        points: {
          type: Number,
          default: 1,
        },
      },
    ],
    passingScore: {
      type: Number,
      default: 80,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;

import Quiz from "../models/Quiz.js";
import logger from "../config/logger.js";
import Progress from "../models/Progress.js";

const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    const quizData = quiz.toObject();
    quizData.questions = quizData.questions.map((q) => ({
      _id: q._id,
      question: q.question,
      type: q.type,
      options: q.options,
      points: q.points,
    }));

    return res.status(200).json({
      success: true,
      data: quizData,
    });
  } catch (error) {
    logger.error(`Error fetching quiz by ID: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, chapterId, topicId } = req.body;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    let correctAnswers = 0;
    const results = quiz.questions.map((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;

      if (isCorrect) correctAnswers += 1;

      return {
        questionId: question._id,
        yourAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      };
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    await Progress.findOneAndUpdate(
      {
        userId: req.user.id,
        topicId,
        chapterId,
      },
      {
        $push: {
          quizAttempts: {
            score,
            totalQuestions: quiz.questions.length,
            passed,
          },
        },
        $set: {
          completed: passed,
          lastAccessedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      data: {
        score,
        passed,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        results,
      },
    });
  } catch (error) {
    logger.error(`Error submitting quiz: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

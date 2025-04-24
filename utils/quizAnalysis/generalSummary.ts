import { getGeminiModel } from "@/lib/genAI";
import type { QuizQuestion } from "../generateQuiz";

const model = getGeminiModel();

export async function generateGeneralSummary(
  questions: QuizQuestion[],
  userAnswers: string[],
): Promise<string> {
  const quizData = questions.map((q, index) => ({
    question: q.question,
    options: q.options,
    correctAnswer: q.answer,
    userAnswer: userAnswers[index],
  }));

  const prompt = `
You are an educational AI assistant.
Here is the quiz data:
${JSON.stringify(quizData, null, 2)}

Generate only the following section:

General Summary:
- Total questions, correct answers, wrong answers, percentage
- Overall performance remark (e.g., Excellent, Needs Improvement)
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Error generating general summary:", err);
    return "Error generating general summary.";
  }
}

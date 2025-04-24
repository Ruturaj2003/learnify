import { getGeminiModel } from "@/lib/genAI";
import type { QuizQuestion } from "../quiz";

const model = getGeminiModel();

export async function generateDetailedReview(
  questions: QuizQuestion[],
  userAnswers: string[]
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

Detailed Review:
- For each incorrect answer, explain why the user's answer was wrong
- Provide a brief explanation of the correct answer
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Error generating detailed review:", err);
    return "Error generating detailed review.";
  }
}

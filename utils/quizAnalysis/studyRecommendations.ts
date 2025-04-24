import { getGeminiModel } from "@/lib/genAI";
import type { QuizQuestion } from "../quiz";

const model = getGeminiModel();

export async function generateStudyRecommendations(
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

Study Recommendations:
- List 3–5 topics or concepts the user should review based on their mistakes
- Provide links or keywords for further reading (if applicable)
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Error generating study recommendations:", err);
    return "Error generating study recommendations.";
  }
}

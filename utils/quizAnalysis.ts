import { getGeminiModel } from "@/lib/genAI";
import type { QuizQuestion } from "./quiz";

const model = getGeminiModel();

/**
 * Analyze user's quiz performance and return feedback.
 * @param questions - The original quiz questions.
 * @param userAnswers - Answers submitted by the user.
 * @param correctAnswers - Correct answers to the quiz.
 * @returns AI-generated feedback text based on quiz performance.
 */
export async function analyzeQuizResults(
  questions: QuizQuestion[],
  userAnswers: string[],
  correctAnswers: string[]
): Promise<string> {
  const quizData = questions.map((q, index) => ({
    question: q.question,
    options: q.options,
    correctAnswer: correctAnswers[index],
    userAnswer: userAnswers[index],
  }));

  const prompt = `
You are an educational AI assistant. Analyze the quiz performance of a student.

Here is the quiz data:
${JSON.stringify(quizData, null, 2)}

Generate the following sections:

1. General Summary:
- Total questions, correct answers, wrong answers, percentage
- Overall performance remark (e.g., Excellent, Needs Improvement)

2. Study Recommendations:
- List 3–5 topics or concepts the user should review based on their mistakes
- Provide links or keywords for further reading (if applicable)

3. Detailed Review:
- For each incorrect answer, explain why the user's answer was wrong
- Provide a brief explanation of the correct answer

Output the result in 3 separate sections using clear headings.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Error analyzing quiz:", err);
    return "Error analyzing quiz results.";
  }
}

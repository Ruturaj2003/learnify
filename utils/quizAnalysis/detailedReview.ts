import { getGeminiModel } from "@/lib/genAI";
import type { QuizQuestion } from "../generateQuiz";

const model = getGeminiModel();

export async function generateDetailedReview(
  questions: QuizQuestion[],
  userAnswers: string[]
): Promise<{ question: string, userAnswer: string, explanation: string }[]> {
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

Task:
- Only review the questions where the user's answer was incorrect.
- For each incorrect answer, follow this structure:
  1. Write the actual question text.
  2. Mention the user's wrong answer.
  3. Explain why the user's answer was wrong.
  4. Provide a brief explanation of the correct answer.
- Be clear and concise.
- Do not use any code block formatting (no \`\`\`).
- Start directly with the detailed review.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Process the response text into an array of objects
    const detailedReview = text.split("\n\n").map((entry) => {
      const lines = entry.split("\n");
      return {
        question: lines[0],
        userAnswer: lines[1].split(":")[1]?.trim(),
        explanation: lines.slice(2).join(" ").trim(),
      };
    });

    return detailedReview;
  } catch (err) {
    console.error("Error generating detailed review:", err);
    return [];
  }
}

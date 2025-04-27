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

Analyze the following quiz data:
${JSON.stringify(quizData, null, 2)}

Instructions:
- Count and display: total questions, correct answers, wrong answers, percentage.
- Give an overall performance remark based on percentage:
  - 90-100%: Excellent
  - 75-89%: Good
  - 50-74%: Needs Improvement
  - Below 50%: Poor

Format output like this:

General Summary:
- Total Questions: X
- Correct Answers: Y
- Wrong Answers: Z
- Score Percentage: P%
- Remark: [Remark]

Only output the formatted summary. No extra text.
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

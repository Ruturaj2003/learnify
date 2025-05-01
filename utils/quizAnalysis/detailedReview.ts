import { getGeminiModel } from '@/lib/genAI';

type ReviewData = {
  questionId: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  userAnswer: string;
};

const model = getGeminiModel();

export async function generateDetailedReview(reviewData: ReviewData[]): Promise<
  {
    questionId: string;
    question: string;
    userAnswer: string;
    explanation: string;
  }[]
> {
  const quizData = reviewData.map((item) => ({
    questionId: item.questionId,
    question: item.question,
    options: item.options.map((opt) => opt.text),
    correctAnswer: item.correctAnswer,
    userAnswer: item.userAnswer,
  }));

  const prompt = `
You are an educational AI assistant.

Here is the quiz data:
${JSON.stringify(quizData, null, 2)}

Task:
- Review **each answer**, whether correct or incorrect.
- Always For each item, give:
  1. The question.
  2. The user's answer (mention if it's correct or wrong).
  3. A short explanation of why it is correct or incorrect.
  4. A brief explanation of the correct answer (even if the user got it right).
- Use this format for each item:

Question ID: <questionId>
Question: <actual question>
User Answer: <user's answer> (Correct/Wrong)
Explanation: <clear explanation>

Start directly with the review. No headings or code blocks.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    const detailedReview = text.split('\n\n').map((entry) => {
      const lines = entry.split('\n');
      return {
        questionId: lines[0]?.split(':')[1]?.trim() || '',
        question: lines[1]?.split(':')[1]?.trim() || '',
        userAnswer: lines[2]?.split(':')[1]?.trim() || '',
        explanation: lines[3]?.split(':')[1]?.trim() || '',
      };
    });

    return detailedReview;
  } catch (err) {
    console.error('Error generating detailed review:', err);
    return [];
  }
}

import { getGeminiModel } from '@/lib/genAI';

const model = getGeminiModel();

type ReviewData = {
  questionId: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  userAnswer: string;
};

export async function generateStudyRecommendations(
  reviewData: ReviewData[]
): Promise<string> {
  const quizData = reviewData.map((item) => ({
    questionId: item.questionId,
    question: item.question,
    options: item.options.map((opt) => opt.text),
    correctAnswer: item.correctAnswer,
    userAnswer: item.userAnswer,
  }));
  const prompt = `
You are an intelligent educational assistant helping a student improve their understanding.

Below is the student's quiz data, including the questions, the user's answers, the correct answers, and explanations:
${JSON.stringify(quizData, null, 2)}

Analyze the data and generate only the following section:

Study Recommendations:
- Identify 3 to 5 key topics or concepts where the student made mistakes or showed confusion
- Focus on patterns of incorrect answers or misunderstood explanations
- Use clear, helpful language appropriate for a high school or early college level
- Do NOT restate the quiz data or list specific question numbers
- Present the recommendations as a simple bullet-point list
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error('Error generating study recommendations:', err);
    return 'Error generating study recommendations.';
  }
}

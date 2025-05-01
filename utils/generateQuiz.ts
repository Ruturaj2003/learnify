import { getGeminiModel } from '@/lib/genAI';

const model = getGeminiModel();

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export async function generateQuiz(chapterText: string): Promise<string> {
  const prompt = `
You're an expert teacher preparing a quiz from a textbook chapter.

Generate exactly 10 multiple-choice questions based on the chapter below:
- 4 Easy
- 3 Medium
- 3 Hard

Each question must include:
- A clear question
- Four plausible options
- One correct answer

Ensure:
- The options are randomized
- Questions are not repeated
- There's a mix of conceptual and factual content

Format output as a JSON array like this:

[
  {
    "id": "qX",
    "question": "What is ...",
    "options": [
      { "id": "qX_a", "text": "..." },
      { "id": "qX_b", "text": "..." },
      { "id": "qX_c", "text": ".." },
      { "id": "qX_d", "text": "..." }
    ],
    "correctOptionId": "qX_b"
  },
]

Chapter Text:
"""
${chapterText}
"""`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error('Error generating quiz:', err);
    return 'Error generating quiz.';
  }
}

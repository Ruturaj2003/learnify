import { getGeminiModel } from "@/lib/genAI";

const model = getGeminiModel();

export type DifficultyLevel = "easy" | "medium" | "hard";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

/**
 * Generate a quiz based on chapter text and difficulty.
 * @param chapterText - The source text of the chapter.
 * @param difficulty - The difficulty level for the quiz.
 * @returns A JSON string containing an array of quiz questions.
 */
export async function generateQuiz(
  chapterText: string,
  difficulty: DifficultyLevel
): Promise<string> {
  const prompt = `
You're an expert teacher preparing a quiz based on a chapter from a textbook. Your task is to create 10 high-quality, clear multiple-choice questions from the chapter below.

Generate questions based on the following difficulty level: ${difficulty}

Each question must have:
- One correct answer
- Three plausible incorrect options
- No repeated questions
- A balance of conceptual and factual questions

Format the output as a JSON array like this:

[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct option text"
  }
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
    console.error("Error generating quiz:", err);
    return "Error generating quiz.";
  }
}

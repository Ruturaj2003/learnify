import { getGeminiModel } from '@/lib/genAI';

const model = getGeminiModel();

// Type for allowed explanation types
type ExplanationType = 'simple' | 'detailed';

/**
 * Generates a simple or detailed explanation using Gemini AI.
 * @param chapterText - The original chapter text to explain.
 * @param explanationType - Type of explanation: 'simple' or 'detailed'.
 * @returns The AI-generated explanation as a string.
 */
export async function getChapterExplanation(
  chapterText: string,
  explanationType: ExplanationType
): Promise<string> {
  let prompt: string;

  if (explanationType === 'simple') {
    prompt = `
You are a helpful , intelligent teacher guiding high school students.

Your task is to explain the following chapter content in a simple, clear, and short way. 
- Use easy-to-understand language.
- Keep it concise — about 45% of the original chapter length.
- Focus only on the main points.
- Organize the explanation logically.
- Format the response using Markdown syntax only.

Chapter Text:
"""
${chapterText}
"""
    `.trim();
  } else if (explanationType === 'detailed') {
    prompt = `
You are a subject matter expert creating a detailed explanation for high school students.

Your task is to explain the following chapter content thoroughly but clearly.
- Length should be around 65% of the original chapter.
- Cover all important ideas, give examples, and explain the context.
- Use easy and clear language suitable for high school learners.
- Format your answer using Markdown with the following structure:

Introduction
Brief overview of the topic.

Key Concepts
Main ideas explained in a simple way.

Examples
Short examples to support each key concept.

Summary
Highlight the most important takeaways.

Chapter Text:
"""
${chapterText}
"""
    `.trim();
  } else {
    throw new Error(
      "Invalid explanation type. Choose either 'simple' or 'detailed'."
    );
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error('Error from Gemini:', err);
    return "Sorry, couldn't get an explanation.";
  }
}

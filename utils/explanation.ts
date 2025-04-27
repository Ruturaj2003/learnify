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
You are a teacher breaking down complex ideas for high school students. Offer a clear and straightforward explanation of the following chapter. Keep the explanation concise, around 30% of the original chapter length. Structure the explanation logically, focusing on the key points to ensure it's easy to understand.
And Give in Markdown syntax only Please.

Chapter Text:
"""
${chapterText}
"""
`;
  } else if (explanationType === 'detailed') {
    prompt = `
You are a subject matter expert. 
Provide a detailed and thorough explanation of the following chapter text. 
The explanation should be about 45% of the original chapter's length, covering all essential details, examples, and context:

Chapter Text:
"""
${chapterText}
"""
`;
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

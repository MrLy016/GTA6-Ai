import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// "Nano banana" maps to 'gemini-2.5-flash-image' as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Generates a GTA 6 style image based on user input.
 * @param base64Image The base64 encoded string of the user's uploaded image.
 * @returns Promise<string> The base64 string of the generated image.
 */
export const generateGTAStyleImage = async (base64Image: string): Promise<string> => {
  try {
    // Clean the base64 string if it has a prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    
    const prompt = `
      Transform the person in this image into a character from the video game Grand Theft Auto VI (GTA 6). 
      
      Style Requirements:
      1. Realistic Graphics: Use a hyper-realistic, high-fidelity game engine aesthetic (Unreal Engine 5 style) typical of modern AAA games.
      2. Atmosphere: Create a "Vice City" vibe. Warm, sun-drenched lighting with high contrast, or a neon-lit evening.
      3. Character: Keep the facial features recognizable but adapt the skin texture, hair, and clothing to look like a high-res in-game 3D model. 
      4. Background: Place them in a Miami-inspired setting (South Beach, Ocean Drive, or a gritty urban alleyway).
      5. Quality: 4k resolution, cinematic depth of field, sharp textures.
      
      Output ONLY the image.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
        ],
      },
      // No system instruction or special tools needed for this specific image-to-image task on Flash Image
    });

    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data returned from Gemini.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
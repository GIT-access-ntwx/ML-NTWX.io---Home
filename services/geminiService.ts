import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAEOContent = async (topic: string, keywords: string, contentType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Generate optimized content for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). 
      
      Topic: ${topic}
      Target Keywords: ${keywords}
      Content Format: ${contentType}
      
      Structure the response as a direct answer suitable for an AI overview snippet, followed by a structured list of key facts that an LLM would easily parse. Keep it concise, authoritative, and fact-based. Use Markdown formatting. If the requested format is 'table', ensure a Markdown table is provided.`,
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API key and try again.";
  }
};

export const generateChatPageTips = async (url: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the concept of this URL (or page topic) for AI Chat Page Optimization: ${url}.
        Provide 3 specific technical recommendations on how to structure the data on this page so that AI Chatbots (like Gemini, ChatGPT) can better understand and cite it as a product source. Focus on Schema.org, semantic HTML, and data clarity.`
    });
    return response.text || "No tips generated.";
  } catch (error) {
      console.error("Gemini API Error:", error);
      return "Error generating tips.";
  }
}
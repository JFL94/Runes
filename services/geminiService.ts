import { GoogleGenAI } from "@google/genai";
import { Rune } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in process.env.API_KEY");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRuneInterpretation = async (runes: Rune[], question: string = ""): Promise<string> => {
  try {
    const ai = getAiClient();
    const runeNames = runes.map(r => r.name).join(", ");
    
    // Vibe Coding: Prompt for an emotional, mystical, and supportive response in Traditional Chinese
    const prompt = `
      你是一位充滿智慧、富有同理心且神秘的北歐盧恩符文先知。
      使用者抽到了以下符文：${runeNames}。
      ${question ? `使用者的問題是："${question}"` : "使用者尋求一般的指引。"}
      
      請提供一段占卜解讀，必須符合以下要求：
      1. 使用繁體中文 (Traditional Chinese)。
      2. 語氣溫柔、撫慰人心 (Vibe Coding/情緒編碼)。
      3. 富有詩意但語意清晰。
      4. 將符文的意義串連成一個完整的故事或指引。
      5. 字數控制在 150 字以內。
      
      請直接輸出一段優美的文字段落。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "你是一個神秘的盧恩符文 App 占卜助手，請使用繁體中文回答。",
        temperature: 1.2, // Higher temperature for more creative/mystical language
      }
    });

    return response.text || "迷霧過濃... 請稍後再試。";
  } catch (error) {
    console.error("Interpretation Error:", error);
    return "眾神靜默。請檢查您的網路連線並重試。";
  }
};

export const generateRuneVisual = async (rune: Rune): Promise<string | null> => {
  try {
    const ai = getAiClient();
    
    // Prompt for watercolor, ethereal style as requested (Keep in English for better image gen adherence)
    const imagePrompt = `
      A masterpiece tarot-style card illustration of the Nordic Rune ${rune.name} (${rune.symbol}).
      Style: Ethereal watercolor, dreamy, soft purple and indigo palette, starry night sky background.
      Visuals: ${rune.meaning} represented abstractly. Glowing magical symbol in the center.
      No text, high quality, highly detailed, magical atmosphere.
    `;

    // Using flash-image for speed and efficiency in this demo
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: imagePrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    // Iterate to find image part
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
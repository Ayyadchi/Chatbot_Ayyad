
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MOCK_DATA, SYSTEM_PROMPT } from "../constants";

const getApiKey = () => process.env.API_KEY || '';

export const sendMessageToAgent = async (message: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "Maaf, kunci API tidak dikonfigurasi. Sila semak tetapan persekitaran.";
  }

  const ai = new GoogleGenAI({ apiKey });
  const dataContext = JSON.stringify(MOCK_DATA);
  const fullSystemInstruction = SYSTEM_PROMPT.replace('${DATA_JSON}', dataContext);

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: fullSystemInstruction,
      }
    });

    // We don't use direct history in chat.sendMessage because it only takes message, 
    // but the session maintains it if we reuse the chat object. 
    // For a single request pattern:
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Tiada respon dari agent.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Berlaku ralat semasa menghubungi Agent Dashboard. Sila cuba sebentar lagi.";
  }
};

import axios from "axios";

export class AIService {
  private geminiApiUrl = "http://localhost:8000/ask-gemini-ai";
  private openAiApiUrl = "http://localhost:8000/ask-open-ai";

  constructor(private geminiApiKey?: string, private openAIApiKey?: string) {}

  async generateResponse(
    prompt: string,
    model: "gemini" | "openai"
  ): Promise<string> {
    try {
      let response;

      if (model === "gemini") {
        // Sending POST request to /ask-gemini-ai
        response = await axios.post(this.geminiApiUrl, {
          prompt,
          apiKey: this.geminiApiKey, // Include geminiApiKey if needed
        });
      } else if (model === "openai") {
        // Sending POST request to /ask-open-ai
        response = await axios.post(this.openAiApiUrl, {
          prompt,
          apiKey: this.openAIApiKey, // Include openAIApiKey if needed
        });
      } else {
        throw new Error("Invalid model specified");
      }

      return response.data?.message || "No response generated";
    } catch (error) {
      console.error("Error generating response:", error);
      throw new Error("Error making API request");
    }
  }
}

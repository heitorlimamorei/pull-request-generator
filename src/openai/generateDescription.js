import axios from "axios";
import OpenAI from "openai";
import { getBasePrompt } from "./getBasePrompt.js";

export async function generatePullRequestDescription(commits, model, apiKey) {
  const data = commits.map(({ commit }) =>
    JSON.stringify({
      message: commit.message,
      diff: commit.patch,
    }),
  );

  const prompt = `Gerar uma descrição de pull request a partir das seguintes mensagens de commit:\n\n${data.join(
    "\n",
  )}`;

  const openai = new OpenAI({ apiKey });

  try {
    const basePrompt = await getBasePrompt();

    if (model === "llama3") {
      const resp = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "llama3",
          prompt: ` ${basePrompt} 
          ${prompt}
          `,
          stream: false,
        },
        { timeout: 100000 },
      );

      return resp.data.response;
    }

    const response = await openai.chat.completions.create({
      model: model,
      max_tokens: 10000,
      messages: [
        {
          role: "system",
          content: basePrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(`Erro ao gerar descrição com OpenAI: ${error}`);
    return "Não foi possível gerar a descrição do pull request.";
  }
}

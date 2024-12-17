import readJSONFile from "../utils/readJSONFile.js";

export async function getBasePrompt() {
  const config = await readJSONFile("data/config.json");

  if (
    !config.template ||
    !config.base_prompt ||
    !config.analysis_prompt ||
    !config.description_prompt
  ) {
    throw new Error("Occoreu um erro durante a leitura do config.json");
  }

  return `${config.base_prompt} ${config.analysis_prompt} ${config.description_prompt}: ${config.template}`;
}

#!/usr/bin/env node

import axios from "axios";
import OpenAI from "openai";
import inquirer from "inquirer";
import readJSONFile from "./utils/readJSONFile.js"
import { configDotenv } from "dotenv";

configDotenv();

const apiKey = process.env.OPEN_AI_KEY;
const githubToken = process.env.GIT_HUB_TOKEN;

if (!apiKey || !githubToken) {
  console.error(
    "As chaves de API (OPEN_AI_KEY) e GitHub token (GIT_HUB_TOKEN) são necessárias."
  );
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: apiKey,
});

async function getBasePrompt() {
  const config = await readJSONFile('data/config.json');
  
  if (!config.template || !config.base_prompt || !config.analysis_prompt || !config.description_prompt) {
    throw new Error('Occoreu um erro durante a leitura do config.json')
  }

  return `${config.base_prompt} ${config.analysis_prompt} ${config.description_prompt}: ${config.template}`;
}

async function generatePullRequestDescription(commits, model) {
  const data = commits.map(({commit}) => JSON.stringify({
    message: commit.message,
    diff: commit.patch
  }));

  const prompt = `Gerar uma descrição de pull request a partir das seguintes mensagens de commit:\n\n${data.join(
    "\n"
  )}`;

  try {
    const basePrompt = await getBasePrompt();

    if (model == 'llama3') {
      const resp = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3',
        prompt: ` ${basePrompt} 
        ${prompt}
        `,
        stream: false
      }, {timeout: 100000});

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

async function createPullRequest({
  owner,
  repo,
  headBranch,
  baseBranch,
  title,
  body,
}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;

  const headers = {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  const data = {
    title: title,
    head: headBranch,
    base: baseBranch,
    body: body,
  };

  console.log("Dados do PR:", data); // Verifique os dados antes de fazer a requisição

  try {
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao criar o Pull Request: ${error.response.status} - ${error.response.statusText}`
    );
    console.error("Detalhes do erro:", error.response.data); // Logging adicional
    return null;
  }
}

async function main() {
  const answers = await inquirer.prompt([
    {
      name: "owner",
      message: "Digite o nome do proprietário do repositório (owner):",
    },
    { name: "repo", message: "Digite o nome do repositório (repo):" },
    {
      name: "baseBranch",
      message: "Digite o nome da branch base (baseBranch):",
    },
    {
      name: "headBranch",
      message: "Digite o nome da branch de origem (headBranch):",
    },
    { name: "title", message: "Digite o título do Pull Request:" },
    {
      name: "model",
      message: "Digite o nome do modelo GPT a ser usado (model):",
      default: "gpt-4o-mini-2024-07-18",
    },
  ]);

  const { owner, repo, baseBranch, headBranch, model, title } = answers;

  const githubUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${baseBranch}...${headBranch}`;

  const githubHeaders = {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const response = await axios.get(githubUrl, { headers: githubHeaders });
    const commits = response.data.commits;

    if (commits.length === 0) {
      console.log("Nenhum commit novo encontrado para gerar a descrição.");
      return;
    }

    const description = await generatePullRequestDescription(commits, model);
    console.log('Descrição do Pull Request Gerada:\n', description);

    const pr = await createPullRequest({
      owner,
      repo,
      headBranch,
      baseBranch,
      title,
      body: description,
    });

    if (pr) {
      console.log(`Pull Request criado com sucesso: ${pr.html_url}`);
    }
  } catch (error) {
    console.error(`Failed to get commits from GitHub: ${error}`);
  }
}

main();

#!/usr/bin/env node

import { configDotenv } from "dotenv";
import inquirer from "inquirer";
import { loadEnv, ensureTokens } from "./config/env.js";
import { getPrompts } from "./config/prompts.js";
import { detectBranch, detectOwnerAndRepo } from "./git/detectRepo.js";
import { getCommitsFromGitHub } from "./github/getCommits.js";
import { createPullRequest } from "./github/createPullRequest.js";
import { generatePullRequestDescription } from "./openai/generateDescription.js";

configDotenv();

const { apiKey, githubToken, originalDir } = loadEnv();
ensureTokens(apiKey, githubToken);

async function main() {
  let currentBranch = "";
  try {
    currentBranch = detectBranch(originalDir);
  } catch (err) {
    console.error(
      "Falha ao detectar a branch atual. Você poderá informá-la manualmente.",
    );
  }

  const { detectedOwner, detectedRepo } = detectOwnerAndRepo(originalDir);

  const answers = await inquirer.prompt(
    getPrompts({
      detectedOwner,
      detectedRepo,
      currentBranch,
    }),
  );

  const { owner, repo, headBranch, baseBranch, model, title } = answers;

  const commits = await getCommitsFromGitHub({
    owner,
    repo,
    baseBranch,
    headBranch,
    githubToken,
  });

  if (!commits || commits.length === 0) {
    console.log("Nenhum commit novo encontrado para gerar a descrição.");
    return;
  }

  const description = await generatePullRequestDescription(
    commits,
    model,
    apiKey,
  );

  console.log("Descrição do Pull Request Gerada:\n", description);

  const pr = await createPullRequest({
    owner,
    repo,
    headBranch,
    baseBranch,
    title,
    body: description,
    githubToken,
  });

  if (pr) {
    console.log(`Pull Request criado com sucesso: ${pr.html_url}`);
  }
}

main();

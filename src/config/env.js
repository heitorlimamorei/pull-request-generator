export function loadEnv() {
  const args = process.argv.slice(2);
  let originalDir;
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--original-dir=")) {
      originalDir = args[i].split("=")[1];
      break;
    }
  }

  const apiKey = process.env.OPEN_AI_KEY;
  const githubToken = process.env.GIT_HUB_TOKEN;

  return { apiKey, githubToken, originalDir };
}

export function ensureTokens(apiKey, githubToken) {
  if (!apiKey || !githubToken) {
    console.error(
      "As chaves de API (OPEN_AI_KEY) e GitHub token (GIT_HUB_TOKEN) são necessárias.",
    );
    process.exit(1);
  }
}

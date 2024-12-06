import axios from "axios";

export async function createPullRequest({
  owner,
  repo,
  headBranch,
  baseBranch,
  title,
  body,
  githubToken,
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

  try {
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao criar o Pull Request: ${error.response?.status} - ${error.response?.statusText}`,
    );
    console.error("Detalhes do erro:", error.response?.data);
    return null;
  }
}

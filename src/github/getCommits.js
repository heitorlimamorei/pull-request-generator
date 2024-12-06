import axios from "axios";

export async function getCommitsFromGitHub({
  owner,
  repo,
  baseBranch,
  headBranch,
  githubToken,
}) {
  const githubUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${baseBranch}...${headBranch}`;
  const githubHeaders = {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const response = await axios.get(githubUrl, { headers: githubHeaders });
    return response.data.commits;
  } catch (error) {
    console.error(`Failed to get commits from GitHub: ${error}`);
    return null;
  }
}

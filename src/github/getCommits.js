import axios from "axios";

export async function getCommitsFromGitHub({
  owner,
  repo,
  baseBranch,
  headBranch,
  githubToken,
}) {
  const githubHeaders = {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  const compareUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${baseBranch}...${headBranch}`;

  try {
    const compareResponse = await axios.get(compareUrl, {
      headers: githubHeaders,
    });
    const { commits } = compareResponse.data;

    const result = [];

    for (const commit of commits) {
      const commitSha = commit.sha;
      const commitMessage = commit.commit.message;
      const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;

      const commitResponse = await axios.get(commitUrl, {
        headers: githubHeaders,
      });
      const commitFiles = commitResponse.data.files.map((file) => ({
        filename: file.filename,
        status: file.status,
        patch: file.patch || "",
      }));

      result.push({
        sha: commitSha,
        message: commitMessage,
        files: commitFiles,
      });
    }

    return result;
  } catch (error) {
    console.error("❌ Failed to fetch commits with changes:", error.message);
    return [];
  }
}

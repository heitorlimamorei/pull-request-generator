export function parseGitHubUrl(url) {
  const cleanedUrl = url.replace(/\.git$/, "");

  let ownerRepoPart = "";
  if (cleanedUrl.includes("github.com/")) {
    ownerRepoPart = cleanedUrl.split("github.com/")[1];
  } else if (cleanedUrl.includes("github.com:")) {
    ownerRepoPart = cleanedUrl.split("github.com:")[1];
  }

  if (!ownerRepoPart) {
    return { owner: "", repo: "" };
  }

  const [owner, repo] = ownerRepoPart.split("/");
  return { owner, repo };
}

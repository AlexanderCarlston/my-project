import GithubService from "../services/github-service";
const CurrentGithubService = new GithubService("https://api.github.com")

describe("Github Service Check", () => {
  it("Sets base url", async () => {
    expect(CurrentGithubService.baseUrl).toBe("https://api.github.com")
  });
});
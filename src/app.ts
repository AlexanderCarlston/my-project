import express from "express";
import GithubService from "./services/github-service";
const CurrentGithubService = new GithubService("https://api.github.com")
const app = express();
const port = 8080;

app.get("/", async(req: any, res: any) => {
  res.send("API works!");
})

// commits_url
app.get("/repos/:owner/:repo/pulls", async(req: any, res: any) => {
  // TODO: Add params validation
  let {owner, repo} = req.params

  try {
    let response = await CurrentGithubService.getPulls(owner, repo)
    
    if(!response.data) {res.send("Interal server erorr").status(500)}

    const getCommits = async () => {
      return Promise.all(response.data.map(async(repo: any) => {
        let commits = await CurrentGithubService.callApi(repo.commits_url)
        repo.number_of_commits = commits.data.length
        return repo
      }))
    }

    let changedRepos = await getCommits()

    res.send(changedRepos).status(201)
  } catch(err) {
    res.send(err).status(500)
  }
})

app.listen(port)
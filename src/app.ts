import express from "express";
import GithubService from "./services/github-service";
const CurrentGithubService = new GithubService("https://api.github.com")
const app = express();
const port = 8080;

app.get("/", async(req: any, res: any) => {
  res.send("API works!");
})

app.get("/repos/:owner/:repo/pulls", async(req: any, res: any) => {
  let {owner, repo} = req.params
  if(typeof owner !== 'string' || typeof repo !== 'string') {res.send("Owner/Repo should be strings").status(400)}

  try {
    let response = await CurrentGithubService.getPulls(owner, repo)
    
    if(!response.data) {res.send("Interal server erorr").status(500)}

    const getCommits = async () => {
      return Promise.all(response.data.map(async(repo: any) => {
        // TODO: possibly add try catch and set number of commits to undefined in case of error (instead of failing entire request)
        let commits = await CurrentGithubService.callApi(repo.commits_url)
        repo.number_of_commits = commits.data.length
        return repo
      }))
    }

    let changedRepos = await getCommits()

    res.send(changedRepos).status(200)
  } catch(err) {
    res.send(err).status(500)
  }
})

app.listen(port)

export default app
const axios = require('axios')

class GithubService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getCommitsForPull(owner: string, repo: string, pullNumber: string) {
    return axios.get(this.baseUrl + `/repos/${owner}/${repo}/pulls/${pullNumber}commits`)
  }

  getCommits(owner: string, repo: string): Promise<any> {
    return axios.get(this.baseUrl + `/repos/${owner}/${repo}/commits`)
  }

  getPulls(owner: string, repo: string): Promise<any> {
    return axios.get(this.baseUrl + `/repos/${owner}/${repo}`)
  }
}
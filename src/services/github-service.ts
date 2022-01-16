const axios = require('axios')

export default class GithubService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  callApi(url: string) {
    return axios.get(url)
  }

  getCommitsForPull(owner: string, repo: string, pullNumber: string) {
    return axios.get(this.baseUrl + `/repos/${owner}/${repo}/pulls/${pullNumber}commits`)
  }

  getCommits(owner: string, repo: string): Promise<any> {
    return axios.get(this.baseUrl + `/repos/${owner}/${repo}/commits`)
  }

  // Defaults to open pull requests
  getPulls(owner: string, repo: string): Promise<any> {
    return axios.get(this.baseUrl + `/repos/${owner}/${repo}/pulls`)
  }
}
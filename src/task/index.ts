import * as Listr from 'listr'
import githubFindSponsorStatus from './github-find-sponsor-status'
import githubQueryRepositories from './github-query-repositories'
import initialize from './initialize'
import npmFindGithubRepositories from './npm-find-github-repositories'

const tasks = (query: string, token: string): Listr => {
  return new Listr([
    initialize(token),
    githubQueryRepositories(query, token),
    npmFindGithubRepositories(),
    githubFindSponsorStatus(token),
  ])
}

export default tasks

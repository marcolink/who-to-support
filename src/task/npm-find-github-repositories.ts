import fetchGithubLogins from '../action/fetch-github-logins'
import {Context, Task} from '../types'

function npmFindGithubRepositories(): Task {
  return {
    title: 'Find github projects',
    task: async (ctx: Context, task) => {
      const response = await fetchGithubLogins(
        ctx.model.npm.getDependencies(), status => {
          task.output = status
        }, task.report)
      Object.keys(response.logins).forEach(dependency => {
        ctx.model.npm.setGithubOwner(dependency, response.logins[dependency])
      })
      task.output = ctx.model.npm.getOwners().length.toString()
      task.title = `Found ${Object.keys(response.logins).length} github projects`
    },
  }
}

export default npmFindGithubRepositories

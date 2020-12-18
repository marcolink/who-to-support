import fetchGithubRepositories from '../action/fetch-github-repositories'
import {Context, Task} from '../types'
const chalk = require('chalk')

function githubQueryRepositories(query: string, token: string): Task {
  return {
    title: `Search repositories for ${chalk.yellow(query)}`,
    task: async (ctx: Context, task) => {
      const response = await fetchGithubRepositories(
        token,
        query,
        status => {
          task.output = status
        }
      )

      response.dependencies.forEach(ctx.model.npm.addDependency)

      let title = `Found ${chalk.yellow(response.repositoryCount)} repositories for query `
      title += `${chalk.yellow(query)} with ${chalk.yellow(ctx.model.npm.getDependencies().length)} `
      title += 'unique dependencies'
      task.title = title
    },
  }
}

export default githubQueryRepositories

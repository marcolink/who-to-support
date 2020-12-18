import fetchGithubOwners from '../action/fetch-github-owners'
import {Task} from '../types'

function githubFindSponsorStatus(token: string): Task {
  return {
    title: 'Get dependency owners',
    task: async (ctx, task) => {
      const response = await fetchGithubOwners(
        token,
        ctx.model.npm.getOwners(),
        status => {
          task.output = status
        }, task.report,
      )
      response.map(ctx.model.addOwner)
      task.title = `Received data for ${response.length} dependencies`
    },
  }
}

export default githubFindSponsorStatus

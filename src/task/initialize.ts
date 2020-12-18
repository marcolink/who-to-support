import createClient from '../api/github'
import {Model} from '../model'
import {Task} from '../types'

function initialize(token: string): Task {
  return {
    title: 'Initializing ...',
    task: async (ctx, task) => {
      ctx.model = new Model()
      const client = createClient(token)
      const response = await client.getViewerInfo()
      task.title = `Initialized as ${response.viewer.name}`
    },
  }
}

export default initialize

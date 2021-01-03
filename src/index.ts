import {Command, flags} from '@oclif/command'
import tasks from './task'
import render from './render'

class WhoToSupport extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    token: flags.string({char: 't'}),
  }

  static args = [{name: 'query'}]

  async run(): Promise<void> {
    const {args, flags} = this.parse(WhoToSupport)

    const token = flags.token || process.env.GH_TOKEN

    if (!token) {
      this.error('no token provided')
    }

    if (!args.query) {
      this.error('arg "scope" missing')
    }

    this.log('')

    return tasks(args.query, token)
    .run()
    .then(ctx => render(ctx.model, this))
    .catch(this.error)
  }
}

export = WhoToSupport

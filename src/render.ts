import {Command} from '@oclif/command'
import {Model} from './model'
import Table = require('cli-table')
const emoji = require('node-emoji')
const chalk = require('chalk')

export default function render(model: Model, command: Command): void {
  const table = new Table({
    head: ['Owner', 'Occurrences', 'User/Org', 'Sponsored'],
    colAligns: ['middle', 'right', 'left', 'middle'],
    chars: {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      mid: '─',
      'mid-mid': '┼',
      right: '║',
      'right-mid': '╢',
      middle: '│',
    },
  })

  type Row = [string, number, string, string]

  const rows: Row[] = []

  const exclamationMark = (count: number) => {
    if (count >= 100) {
      return 'heavy_exclamation_mark'
    }
    if (count >= 10) {
      return 'exclamation'
    }
    return 'grey_exclamation'
  }

  const sponsorableOwners = model.getOwners().filter(owner => owner.viewerCanSponsor)

  sponsorableOwners
  .forEach(owner => {
    const count = model.npm.dependenciesCount(owner.login)

    rows.push([
      chalk.bold(owner.name || owner.login),
      count,
      owner.url,
      // model.npm.getDependencies(owner.login).toString(),
      emoji.get(owner.viewerIsSponsoring ?
        'white_check_mark' :
        exclamationMark(count)
      ),
    ])
  })

  function compare(a: Row, b: Row) {
    if (a[1] > b[1]) {
      return -1
    }
    if (a[1] < b[1]) {
      return 1
    }
    return 0
  }

  rows.sort(compare)
  rows.forEach(row => table.push(row))

  command.log('')
  command.log(table.toString())
  command.log('')

  let message = `You use ${chalk.yellow(model.npm.getDependencies().length)} unique `
  message += `npm dependencies from ${chalk.yellow(model.getOwners().length)} different creators.\n`
  message += `You're currently sponsoring ${chalk.yellow(sponsorableOwners.filter(o => o.viewerIsSponsoring).length)} `
  message += `creators of ${chalk.yellow(sponsorableOwners.length)} who could be sponsored.`
  command.log(message)
}

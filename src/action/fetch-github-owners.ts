const PromisePool = require('@supercharge/promise-pool')
import createClient from '../api/github'
import {Owner} from '../types'

export default async function fetchGithubOwners(
  token: string,
  githubLogins: string[],
  statusCb: (status: string) => void,
  errorCb: (error: Error) => void,
): Promise<Owner[]> {
  const client = createClient(token)

  const request = async (handle: string): Promise<Owner | null> => {
    try {
      const userInfo = await client.getUserInfo(handle)
      statusCb(`Received github sponsor status for user "${handle}"`)
      return userInfo.user as Owner
    } catch (error) {
      if (error.message.includes('Could not resolve to a User with the login of')) {
        try {
          const orgInfo = await client.getOrgInfo(handle)
          statusCb(`Received github sponsor status for org "${handle}"`)
          return orgInfo.organization as Owner
        } catch (error) {
          errorCb(error)
          return null
        }
      }
    }
    return null
  }

  const {results: owners} = await PromisePool
  .for(githubLogins)
  .withConcurrency(10)
  .process(request)

  return owners.filter(Boolean)
}

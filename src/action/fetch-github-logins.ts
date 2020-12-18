import {getPackageMetadata} from '../api/npm'

const PromisePool = require('@supercharge/promise-pool')

type Response = {
  logins: Record<string, string>;
}

function extractOwner(url?: string): string {
  if (!url) {
    return ''
  }
  const startMatch = 'github.com/'
  const start = url.indexOf(startMatch) + startMatch.length
  return url.substring(start, url.indexOf('/', start)).toLowerCase()
}

export default async function fetchGithubLogins(
  dependencies: string[],
  statusCb: (status: string) => void,
  errorCb: (error: Error) => void,
): Promise<Response> {
  const request = async (dependency: string) => {
    try {
      const metadata = await getPackageMetadata(dependency).then(response => response.json())
      statusCb(`found github repository "${dependency}"`)
      return extractOwner(metadata.repository.url)
    } catch (error) {
      errorCb(error)
      return null
    }
  }

  const logins: Record<string, string> = {}

  await PromisePool
  .for(dependencies)
  .withConcurrency(10)
  .process(async (dependency: string) => {
    const response = await request(dependency)
    if (response) {
      logins[dependency] = response
    }
  })

  return {
    logins,
  }
}

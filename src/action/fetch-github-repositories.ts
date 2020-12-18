import {PackageJson} from 'type-fest'
import createClient from '../api/github'
import Dependency = PackageJson.Dependency

function extractDependencies(dependencies: Dependency) {
  return Object.keys(dependencies)
}

type Response = {
  repositoryCount: number;
  dependencies: string[];
}

function parseResponse(nodes: any[]): string[] {
  return nodes
  .reduce((acc: string[], node: any) => {
    if (node.pkg) {
      const pkg: PackageJson = JSON.parse(node.pkg.text)
      if (pkg.dependencies) {
        extractDependencies(pkg.dependencies).forEach(dependency => {
          acc.push(dependency)
        })
      }
      if (pkg.devDependencies) {
        extractDependencies(pkg.devDependencies).forEach(dependency => {
          acc.push(dependency)
        })
      }
      if (pkg.peerDependencies) {
        extractDependencies(pkg.peerDependencies).forEach(dependency => {
          acc.push(dependency)
        })
      }
    }
    return acc
  }, [])
  // .filter((dependency: string) => !dependency.startsWith('@types/'))
}

export default async function fetchGithubRepositories(
  token: string,
  query: string,
  statusCb: (status: string) => void,
): Promise<Response> {
  async function fetchPage(after: string | null = null, nodes: any[] = []): Promise<any[]> {
    statusCb(`fetching ${nodes.length} - ${nodes.length + 100} repos`)
    const client = createClient(token)
    return client.queryDependencies(query, after)
    .then(response => {
      const result = [...nodes, ...response.search.nodes]
      if (response.search.pageInfo.hasNextPage) {
        return fetchPage(response.search.pageInfo.endCursor, result)
      }
      return result
    })
  }

  const nodes = await fetchPage(null)

  return {
    dependencies: parseResponse(nodes),
    repositoryCount: nodes.length,
  }
}

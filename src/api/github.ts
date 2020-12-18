import {gql, GraphQLClient} from 'graphql-request'

const endpoint = 'https://api.github.com/graphql'

function queryDependencies(client: GraphQLClient, queryString: string, after: string | null = null) {
  const query = gql`
  query {
    search(query: "${queryString}" type:REPOSITORY first:100 after:${after ? `"${after}"` : 'null'}) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      repositoryCount
      nodes {
        ... on Repository {
          name
          pkg: object(expression: "HEAD:package.json") {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
`
  return client.request(query)
}

function getUserInfo(client: GraphQLClient, login: string) {
  const query = gql`
  query {
    user(login: "${login}"){
      login
      name
      viewerCanSponsor
      viewerIsSponsoring
      url
    }
  }
`
  return client.request(query)
}

function getOrgInfo(client: GraphQLClient, login: string) {
  const query = gql`
  query {
    organization(login: "${login}"){
      login
      name
      viewerCanSponsor
      viewerIsSponsoring
      url
    }
  }
`
  return client.request(query)
}

function getViewerInfo(client: GraphQLClient) {
  const query = gql`
  query {
    viewer {
      name
    }
  }
`
  return client.request(query)
}

function createClient(token: string) {
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer ' + token,
    },
  })

  return {
    getViewerInfo: () => getViewerInfo(client),
    getOrgInfo: (login: string) => getOrgInfo(client, login),
    getUserInfo: (login: string) => getUserInfo(client, login),
    queryDependencies: (queryString: string, after: string | null = null) => queryDependencies(client, queryString, after),
  }
}

export default createClient

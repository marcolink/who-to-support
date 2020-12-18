import {Dependency, Owner} from './types'

export class Model {
  private owners: Map<string, Owner>

  private npmDependencies: Map<string, Dependency>

  constructor() {
    this.owners = new Map()
    this.npmDependencies = new Map()
  }

  public addOwner = (owner: Owner): void => {
    this.owners.set(owner.login, owner)
  }

  public getOwners(): Owner[] {
    return [...this.owners.values()]
  }

  public get npm() {
    return {
      addDependency: (dependency: string): void => {
        if (this.npmDependencies.has(dependency)) {
          this.npmDependencies.get(dependency)!.count += 1
        } else {
          this.npmDependencies.set(dependency, {count: 1, name: dependency})
        }
      },
      getDependencies: (owner?: string): string[] => {
        return owner ?
          [...this.npmDependencies.values()]
          .filter(dependency => dependency.owner === owner)
          .map(dependency => dependency.name) :
          [...this.npmDependencies.keys()]
      },
      getDependency: (key: string): Dependency | undefined => {
        return this.npmDependencies.get(key)
      },
      setGithubOwner: (dependency: string, owner: string): void => {
        const entry = this.npmDependencies.get(dependency)
        if (entry) {
          entry.owner = owner.toLowerCase()
        } else {
          throw new Error('Not found ' + dependency)
        }
      },
      getOwners: (): string[] => {
        return [...this.npmDependencies.values()]
        .reduce((result: string[], dependency: Dependency) => {
          if (dependency.owner && !result.includes(dependency.owner)) {
            result.push(dependency.owner)
          }
          return result
        }, [])
      },
      dependenciesCount: (login: string): number => {
        return [...this.npmDependencies.values()]
        .reduce((result: number, dependency: Dependency) => {
          if (dependency.owner && dependency.owner.toLowerCase() === login.toLowerCase()) {
            result += dependency.count
          }
          return result
        }, 0)
      },
    }
  }
}

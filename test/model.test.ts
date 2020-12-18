import {expect} from '@oclif/test'
import {Model} from '../src/model'

describe('A ContextModel instance', () => {
  let model: Model

  beforeEach(() => {
    model = new Model()
  })

  it('can add a single dependency', () => {
    model.npm.addDependency('test')
    expect(model.npm.getDependencies()).eql(['test'])
  })

  it('can add multiple dependencies', () => {
    model.npm.addDependency('test1')
    model.npm.addDependency('test2')
    model.npm.addDependency('test1')
    expect(model.npm.getDependencies()).eql(['test1', 'test2'])
  })

  it('can count dependencies', () => {
    model.npm.addDependency('test1')
    model.npm.addDependency('test1')
    expect(model.npm.getDependency('test1')).not.undefined
    expect(model.npm.getDependency('test1')!.count).eql(2)
  })

  it('can count by owner', () => {
    model.npm.addDependency('test1')
    model.npm.addDependency('test2')
    model.npm.addDependency('test2')
    model.npm.addDependency('test3')
    model.npm.setGithubOwner('test1', 'marco')
    model.npm.setGithubOwner('test2', 'marco')
    expect(model.npm.dependenciesCount('marco')).eql(3)
  })
  it('can list owners', () => {
    model.npm.addDependency('test1')
    model.npm.addDependency('test2')
    model.npm.addDependency('test3')
    model.npm.setGithubOwner('test1', 'hello')
    model.npm.setGithubOwner('test2', 'world')
    expect(model.npm.getOwners()).eql(['hello', 'world'])
  })
})

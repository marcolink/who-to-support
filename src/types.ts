import * as Listr from 'listr'
import {Model} from './model'

export type Context = {
  repositoriesCount?: number;
  model: Model;
}

export type Owner = {
  login: string;
  name: string;
  url: string;
  viewerCanSponsor: boolean;
  viewerIsSponsoring: boolean;
}

export type Dependency = {
  owner?: string;
  name: string;
  count: number;
}

export type Task = Listr.ListrTask<Context>

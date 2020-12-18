/*
const https = require('https')
const baseOptions = {
  hostname: 'https://registry.npmjs.org/',
  port: 443,
  family: 4,
  agent: false,
  method: 'GET',
  ,
}
 */
import fetch from 'node-fetch'

function getPackageMetadata(packageName: string): Promise<any> {
  return fetch(`https://registry.npmjs.org/${packageName}`, {
    method: 'GET',
    headers: {
      // Accept: 'application/vnd.npm.install-v1+json',
    },
  })

  /*
  return new Promise(resolve => {
    https.request({...baseOptions, path: packageName}, resolve)
  })
   */
}

export {getPackageMetadata}

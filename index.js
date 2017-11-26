#!/usr/bin/env node

const got = require('got')
const assert = require('assert')
const ghauth = require('ghauth')
const GitHub = require('github')
const args = require('minimist')(process.argv.slice(2))
const query = args._[0]
require('colors')

const authOptions = {configName: 'libcc-check', note: 'electron/libcc-check'}
const url = 'https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent'
const platforms = [
  'osx/x64',
  'mas/x64',
  'win/ia32',
  'win/x64',
  'linux/ia32',
  'linux/x64',
  'linux/arm',
  'linux/arm64'
]
const branches = []

ghauth(authOptions, function (err, authData) {
  const github = new GitHub()
  github.authenticate({type: 'token', token: authData.token})

  github.repos.getBranches({owner: 'electron', repo: 'libchromiumcontent'})
    .then(res => {
      const assets = []
      res.data.forEach(branch => {
        platforms.forEach(platform => {
          assets.push({
            branch: branch.name,
            commit: branch.commit.sha,
            platform: platform,
            url: `${url}/${platform}/${branch.commit.sha}/libchromiumcontent.zip`
          })
        })
      })

      return Promise.all(assets.map(asset => fetch(asset)))
    })
    .then((assets) => {
      const matches = assets
        .filter(asset => !query || JSON.stringify(asset).includes(query))

      if (!matches.length) {
        console.log(`No matches found for ${query}. Try again without a query.`)
      }

      matches.forEach((asset, i) => {
          const status = asset.available ? '\u2713'.green : '\u2717'.red
          
          // add space between branches
          if (!query && i > 0 && asset.branch != assets[i-1].branch) console.log('')
          
          if (args.urls) {
            console.log(`${status} ${asset.branch} - ${asset.url}`)
          } else {
            console.log(`${status} ${asset.branch} - ${asset.commit} - ${asset.platform}`)
          }
          
        })
    })
    .catch(err => {
      throw err
    })
})

async function fetch (asset) {
  try {
    await got.head(asset.url)
    return Object.assign(asset, {available: true})
  } catch (error) {
    return Object.assign(asset, {available: false})
  }
}
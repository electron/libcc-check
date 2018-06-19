#!/usr/bin/env node

const got = require('got')
const octokit = require('@octokit/rest')()
const args = require('minimist')(process.argv.slice(2))
const query = args._[0]
require('colors')

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

octokit.repos.getBranches({
  owner: 'electron',
  repo: 'libchromiumcontent'
}).then(checkFiles).then((matches) => {
  console.log(`Matches are`, matches)
  if (!matches.length && query) {
    console.log(`No matches found for ${query}. Try again without a query.`)
  }

  matches.forEach((asset, i) => {
    const status = asset.available ? '\u2713'.green : '\u2717'.red

    // add space between branches
    if (!query && i > 0 && asset.branch !== matches[i - 1].branch) console.log('')
    if (args.urls) {
      console.log(`${status} ${asset.branch} - ${asset.url}`)
    } else {
      console.log(`${status} ${asset.branch} (${asset.static ? 'static' : 'shared'}) - ${asset.commit} - ${asset.platform}`)
    }
  })
}).catch(err => {
  throw err
})

async function checkFiles (res) {
  const branches = res.data
  const assets = []
  for (const branch of branches) {
    let extension = 'tar.bz2'
    if (branch.name.indexOf('electron-1-') === 0 || args.zip) {
      extension = 'zip'
    }
    console.log(`Checking urls for ${branch.name}`)
    if (!query || query === branch.commit.sha) {
      for (const platform of platforms) {
        assets.push(await fetch({
          branch: branch.name,
          commit: branch.commit.sha,
          platform: platform,
          url: `${url}/${platform}/${branch.commit.sha}/libchromiumcontent.${extension}`
        }))
        assets.push(await fetch({
          branch: branch.name,
          commit: branch.commit.sha,
          platform: platform,
          url: `${url}/${platform}/${branch.commit.sha}/libchromiumcontent-static.${extension}`,
          static: true
        }))
      }
    }
  }
  return assets
}

async function fetch (asset) {
  try {
    await got.head(asset.url)
    return Object.assign(asset, {available: true})
  } catch (error) {
    return Object.assign(asset, {available: false})
  }
}

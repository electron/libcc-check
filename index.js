#!/usr/bin/env node

const got = require('got')
const assert = require('assert')
require('colors')

const commit = process.argv[2]

assert(commit, `specify a commit SHA as the first argument`)
assert(commit.length === 40, `full 40-character SHA is required`)

const url = 'https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent'

const platforms = [
  'osx/x64',
  'mas/x64',
  'win/ia32',
  'win/x64',
  'linux/ia32',
  'linux/x64',
  'linux/arm'
].sort()

async function fetch (platform, commit) {
  const fullURL = `${url}/${platform}/${commit}/libchromiumcontent.zip`
  try {
    await got.head(fullURL)
    return {platform, available: true}
  } catch (error) {
    return {platform, available: false}
  }
}

function logResult ({platform, available}) {
  if (available) {
    console.log(`${'\u2713'.green} ${platform}`)
  } else {
    console.log(`${'\u2717'.red} ${platform}`)
  }
}

Promise.all(platforms.map((platform) => {
  return fetch(platform, commit)
})).then((platforms) => {
  platforms.forEach(logResult)
})
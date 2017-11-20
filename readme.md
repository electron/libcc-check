# libcc-check 

A little tool for checking up on [libchromiumcontent](https://github.com/electron/libchromiumcontent) builds.

It checks all open branches and displays the status of compiled assets for each.

## Requirements

Node.js version 7.6.0 or above.

## Installation

```sh
npm i -g electron/libcc-check
```

## Usage

To see status for all remote branches, run the command with no arguments.

```
libcc-check
```

The first time you run the CLI, you'll be asked to authenticate with your GitHub
account. The token is stored in your home directory so this will only happen 
once.

You can also filter by a specific commit SHA:

```
libcc-check ebaf0cac1543c32b6a7a567aad95ca051d3a0607
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - osx/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - mas/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - win/ia32
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - win/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - linux/ia32
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - linux/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - linux/arm
```

Or by branch name:

```
libcc-check upgrade-to-chromium-59
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - osx/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - mas/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - win/ia32
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - win/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - linux/ia32
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - linux/x64
✓ upgrade-to-chromium-59 - ebaf0cac1543c32b6a7a567aad95ca051d3a0607 - linux/arm
```

You could also just `libcc-check | grep foo`, but  then you'd lose the colored 
output.

If you want to see the actual file URLs, use the `--urls` flag:

```
libcc-check 1-6-x --urls
✓ electron-1-6-x - https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent/osx/x64/f3e99add3753f82f9ce02788144b9ea9cd6367d8/libchromiumcontent.zip
✓ electron-1-6-x - https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent/mas/x64/f3e99add3753f82f9ce02788144b9ea9cd6367d8/libchromiumcontent.zip
✓ electron-1-6-x - https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent/win/ia32/f3e99add3753f82f9ce02788144b9ea9cd6367d8/libchromiumcontent.zip
✓ electron-1-6-x - https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent/win/x64/f3e99add3753f82f9ce02788144b9ea9cd6367d8/libchromiumcontent.zip
✓ electron-1-6-x - https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent/linux/ia32/f3e99add3753f82f9ce02788144b9ea9cd6367d8/libchromiumcontent.zip
✓ electron-1-6-x - https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent/linux/x64/f3e99add3753f82f9ce02788144b9ea9cd6367d8/libchromiumcontent.zip
✓ electron-1-6-x - https://s3.amazonaws.com/github-janky-artifacts/libchromiumcontent/linux/arm/f3e99add3753f82f9ce02788144b9ea9cd6367d8/libchromiumcontent.zip
```

## License

MIT
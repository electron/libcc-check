# libcc-check 

A little tool for checking up on [libchromiumcontent](https://github.com/electron/libchromiumcontent) builds.

## Installation

```sh
npm i -g electron/libcc-check
```

## Usage

Pass the SHA you're interested in to find out if it's been successfully 
compiled for all targets:

```
libcc-check 7a9d4a1c9c265468dd54005f6c1920b2cc2c8ec3
✓ linux/arm
✓ linux/ia32
✓ linux/x64
✓ mas/x64
✓ osx/x64
✓ win/ia32
✓ win/x64
```

## License

MIT

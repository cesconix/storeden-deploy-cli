> :warning: **Archived Repository:** This project is no longer maintained and is kept here for archival purposes only. Please note that the code may be outdated and no longer functional.

# Storeden Deploy CLI

> deploy template made easy

[![build status](https://travis-ci.com/cesconix/storeden-deploy-cli.svg)](https://travis-ci.com/cesconix/storeden-deploy-cli)
[![npm version](https://img.shields.io/npm/v/storeden-deploy-cli.svg)](https://www.npmjs.com/package/storeden-deploy-cli)
[![dependencies](https://img.shields.io/david/cesconix/storeden-deploy-cli.svg)](https://david-dm.org/cesconix/storeden-deploy-cli)
[![devDependencies](https://img.shields.io/david/dev/cesconix/storeden-deploy-cli.svg)](https://david-dm.org/cesconix/storeden-deploy-cli?type=dev)
[![vulnerabilities](https://snyk.io/test/github/cesconix/storeden-deploy-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cesconix/storeden-deploy-cli?targetFile=package.json)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![conventional commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

CLI to deploy template on a Storeden instance.

## Quick Overview

<img src="https://raw.githubusercontent.com/cesconix/storeden-deploy-cli/master/screencast.svg?sanitize=true" width='600'>

## Installation

```bash
npm install -g storeden-deploy-cli
```

## Usage

```
Usage: storeden-deploy [options]

Options:
  --apiKey, -k       API Key associated with your Storeden Store      [required]
  --apiExchange, -e  API Exchange associated with your Storeden Store [required]
  --sourcePath, -p   Path to template folder to deploy                [required]
  --watch, -w        Enable watch mode to deploy automatically         [boolean]
  --help             Show help                                         [boolean]
  --version          Show version number                               [boolean]

Missing required arguments: apiKey, apiExchange, sourcePath
```

### Example - Deploy template with watch mode enabled

```bash
$ storeden-deploy \
  --apiKey 'd27f134FAKE8376f' \
  --apiExchange '83cc5fb8FAKEdd9b' \
  --sourcePath './storeden/dist'
  --watch
```

### Example - Deploy template excluding some directory or file

```bash
$ storeden-deploy \
  --apiKey 'd27f134FAKE8376f' \
  --apiExchange '83cc5fb8FAKEdd9b' \
  --sourcePath './storeden/dist:**/{widgets,generated}/**'
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT. Copyright (C) 2019 H-FARM (Enabling Solutions) - [Francesco Pasqua](mailto:francesco.pasqua@h-farm.com).

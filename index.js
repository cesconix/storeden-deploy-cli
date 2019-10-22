#!/usr/bin/env node

const { EventEmitter } = require('events')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const Ora = require('ora')
const yargs = require('yargs')
const debounce = require('lodash.debounce')
const clear = require('clear')
const deploy = require('storeden-deploy')
const package = require('./package.json')

const argv = yargs
  .usage('Usage: $0 [options]')
  .option('apiKey', {
    alias: 'k',
    describe: 'API Key associated with your Storeden Store',
    demandOption: true
  })
  .option('apiExchange', {
    alias: 'e',
    describe: 'API Exchange associated with your Storeden Store',
    demandOption: true
  })
  .option('sourcePath', {
    alias: 'p',
    describe: 'Path to template folder to deploy',
    demandOption: true
  })
  .coerce('sourcePath', arg => {
    const [source, exclude] = arg.split(':')
    return { source: path.resolve(source), exclude }
  })
  .option('watch', {
    alias: 'w',
    describe: 'Enable watch mode to deploy automatically',
    type: 'boolean',
    demandOption: false
  })
  .demandCommand(0, 0)
  .help()
  .version().argv

const run = async argv => {
  const spinner = new Ora()
  const emitter = new EventEmitter()

  emitter.on('zip', () => {
    const exclude = argv.sourcePath.exclude
      ? ` (${argv.sourcePath.exclude})`
      : ''
    const output = argv.sourcePath.source + chalk.gray(exclude)
    spinner.start(`Creating zip archive of ${chalk.bold(output)}`)
  })

  emitter.on('upload', file => {
    spinner.succeed()
    spinner.start(`Uploading ${chalk.bold(file)}`)
  })

  try {
    const hrstart = process.hrtime()
    await deploy({ ...argv, emitter })
    const hrend = process.hrtime(hrstart)
    const executionTime = ((hrend[0] * 1e9 + hrend[1]) / 1e9).toFixed(1)

    spinner.succeed()
    console.log(
      `${chalk.cyan('Success!')} Deployment ready ` +
        chalk.gray('[' + executionTime + 's]')
    )

    if (!argv.watch) {
      process.exit(0)
    }
  } catch (e) {
    spinner.fail(e.message)
    console.log(chalk.red('Deploy failed'))
    if (!argv.watch) {
      process.exit(1)
    }
  }
}

const handleChanges = async (eventType, filename) => {
  if (filename) {
    console.log(
      `\n🚚 Detected ${chalk.cyan(eventType)} to ${chalk.cyan(
        filename
      )}. Deploying...`
    )
    await run(argv)
  }
}

;(async () => {
  if (argv.watch) {
    clear()
    console.log(
      chalk.bold(`Storeden Deploy CLI v${package.version}\n\n`) +
        `🔍 Watching for file changes on ${chalk.cyan(
          argv.sourcePath.source
        )}...`
    )
    fs.watch(
      argv.sourcePath.source,
      { recursive: true },
      debounce(handleChanges, 100)
    )
  } else {
    await run(argv)
  }
})()

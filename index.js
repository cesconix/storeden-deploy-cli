#!/usr/bin/env node

const { EventEmitter } = require('events')
const path = require('path')
const chalk = require('chalk')
const Ora = require('ora')
const yargs = require('yargs')
const deploy = require('storeden-deploy')

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
  .demandCommand(0, 0)
  .help()
  .version().argv

;(async () => {
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
    // await deploy({ ...argv, emitter })
    await deploy({
      apiKey:
        'd27f134fe4c92986a528376f33a16c3660dd9b4d198359435da5f4f1f1a2d780425668',
      apiExchange:
        '83c79cc5fb832839465df5d96fef15cae10584b58ab9379249ecbdd9bbe33ad7',
      sourcePath: '/Users/cesconix/Downloads/official',
      emitter
    })
    const hrend = process.hrtime(hrstart)
    const executionTime = ((hrend[0] * 1e9 + hrend[1]) / 1e9).toFixed(1)

    spinner.succeed()
    console.log(
      `${chalk.cyan('Success!')} Deployment ready ` +
        chalk.gray('[' + executionTime + 's]')
    )

    process.exit(0)
  } catch (e) {
    spinner.fail(e.message)
    console.log(chalk.red('Deploy failed'))
    process.exit(1)
  }
})()

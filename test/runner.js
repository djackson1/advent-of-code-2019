const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')
const { argv } = require('yargs')

const timeout = 2000

/**
 * Get all files in a directory, synchronously and recursively
 *
 * @param {string} dir directory to traverse
 * @returns {string[]} list of file paths
 */
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist) // recurse
      : filelist.concat(path.join(dir, file))
  })

  return filelist
}

/**
 * Create the Mocha object with the option to select only tests that match a
 * grep term passed in as an optional command line argument
 *
 * @returns {Object} a Mocha object
 */
const createMocha = () => {
  const [grep] = argv._
  console.log('TCL: createMocha -> grep', grep)

  // no grep
  if (!grep || grep.length === 0) {
    console.log('Running all tests')
    return new Mocha({ timeout })
  }

  console.log(`Running tests which contain "${grep}"`)

  return new Mocha({
    timeout,
    grep: new RegExp(grep, 'i'),
  })
}

function run () {
  const mocha = createMocha()
  const files = walkSync(path.resolve(__dirname, '../solutions'))

  files
    .filter(file => file.substr(-8) === '.spec.js')
    .forEach(file => {
      mocha.addFile(file)
    })

  mocha.run(failures => {
    process.exit(failures ? 1 : 0)
  })
}

run()

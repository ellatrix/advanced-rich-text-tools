const fs = require('fs-extra')
const path = require('path')
const { promisify } = require('util')
const po2json = promisify(require('po2json').parseFile)

const LANGUAGES_DIR = path.resolve(__dirname, '../editor-languages')

const args = process.argv.slice(2)

if (!args.length) {
  throw new Error('Usage: npm run-script po2json namespace handle dist-dir')
}

const I18N_NAMESPACE = args[0]
const HANDLE = args[1]
const DIST_DIR = args[2]
const PO2JSON_OPTIONS = {
  format: 'jed'
}

convert()

/**
 * @returns {string[]} list of files
 */
function findPoFiles () {
  const files = []

  fs.readdirSync(LANGUAGES_DIR).forEach(file => {
    if (path.extname(file) === '.po') {
      files.push(path.join(LANGUAGES_DIR, file))
    }
  })

  return files
}

/**
 * @param {{src: string; dist: string; options: Object}
 * @returns {Promise<void>}
 */
async function compile ({
  src,
  dist,
  options
}) {
  const jsonData = await po2json(src, options || { format: 'jed' })
  await fs.outputJson(dist, jsonData)
}

/**
 * @returns {Promise<void>}
 */
async function convert () {
  const poFiles = findPoFiles()
  const distDirIsAbsolute = path.isAbsolute(DIST_DIR)
  const cwd = process.cwd()

  const jobs = poFiles.map(src => {
    const lang = path.basename(src, '.po').split('-').pop()
    const filename = `${I18N_NAMESPACE}-${lang}-${HANDLE}.json`
    const dist = distDirIsAbsolute ? path.join(DIST_DIR, filename) : path.join(cwd, DIST_DIR, filename)
    return compile({
      src,
      dist,
      options: PO2JSON_OPTIONS
    })
  })

  await Promise.all(jobs)
}

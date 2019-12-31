const { getInputs } = require('../../utils/files')

const inputs = getInputs(14)

const a = () => {
  console.log('a = ?')
}
const b = () => {
  console.log('b = ?')
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {}

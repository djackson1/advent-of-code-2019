const { getInputs } = require('../../utils/files')
const { Opcode } = require('../../utils/opcode/v3')
const [code] = getInputs(9)

const a = () => {
  console.log('a = ?')
  const computer = new Opcode(code, { inputs: [1] })
  computer.runUntilFinished()
}
const b = () => {
  console.log('b = ?')
  const computer = new Opcode(code, { inputs: [2] })
  computer.runUntilFinished()
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {}

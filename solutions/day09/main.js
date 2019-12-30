const { getInputs } = require('../../utils/files')
const { Opcode } = require('../../utils/opcode/v3')

const [input] = getInputs(9)

const a = () => {
  console.log('a = ?')
  const computer = new Opcode(input)
  computer.addInput(1)

  computer.runUntilFinished()
}
const b = () => {
  console.log('b = ?')
  const computer = new Opcode(input)
  computer.addInput(2)

  computer.runUntilFinished()
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {}

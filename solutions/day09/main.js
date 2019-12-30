const { getInputs } = require('../../utils/files')
const { Opcode } = require('../../utils/opcode/v3')

const [input] = getInputs(9)

const a = () => {
  const computer = new Opcode(input)
  console.log('TCL: a -> input', input)
  computer.addInput(1)

  computer.runUntilFinished()

  // console.log(`a = ${solution}`)
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

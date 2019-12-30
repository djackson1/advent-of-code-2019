const { getInputs } = require('../../utils/files')
const { getOpcodeOutputs, runOpcodeInstructions } = require('../../utils/opcode/v2')
const [inputs] = getInputs(5)

const a = () => {
  const instructions = inputs.split(',').map(Number)
  const opcodeInput = 1

  console.log('part a:')
  runOpcodeInstructions(instructions, opcodeInput)
}
const b = () => {
  const instructions = inputs.split(',').map(Number)
  const opcodeInput = 5

  console.log('part b:')
  runOpcodeInstructions(instructions, opcodeInput)
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {
  getOpcodeOutputs,
  runOpcodeInstructions,
}

const { getInputs } = require('../../utils/files')
const { permute } = require('../../utils/sets')
const { getOpcodeOutputs, runOpcodeInstructions } = require('../../utils/opcode/v2')
const inputs =  getInputs(7)

const getMaxThrusterSignal = (instructions) => {
  const phaseSettings = permute([0,1,2,3,4])

  let maxOutput = 0
  phaseSettings.forEach(setting => {
    runOpcodeInstructions(instructions, [setting[0], 0], true)
    runOpcodeInstructions(instructions, [setting[1], getOpcodeOutputs()[0]], true)
    runOpcodeInstructions(instructions, [setting[2], getOpcodeOutputs()[0]], true)
    runOpcodeInstructions(instructions, [setting[3], getOpcodeOutputs()[0]], true)
    runOpcodeInstructions(instructions, [setting[4], getOpcodeOutputs()[0]], true)

    const thrusterOutput = getOpcodeOutputs()[0]
    if(thrusterOutput > maxOutput) {
      maxOutput = thrusterOutput
    }
  })

  return maxOutput
}

const a = () => {
  console.log(`a = ${getMaxThrusterSignal(inputs[0])}`)
}
const b = () => {
  console.log(`b = ?`)
}

var runningAsScript = !module.parent;
if(runningAsScript) {
  a();
  b();
}

module.exports = {
  getMaxThrusterSignal
}

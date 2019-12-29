const { getInputs } = require('../../utils/files')
const { permute } = require('../../utils/sets')
const { Opcode } = require('../../utils/opcode/v3')
const inputs =  getInputs(7)

const getMaxThrusterSignal = (instructions) => {
  const phaseSettings = permute([0,1,2,3,4])

  let maxOutput = 0
  phaseSettings.forEach(setting => {
    // setup 
    const computers = [
      new Opcode(instructions),
      new Opcode(instructions),
      new Opcode(instructions),
      new Opcode(instructions),
      new Opcode(instructions),
    ]

    // initial inputs
    computers.forEach((c,i) => {
      c.addInput(setting[i])
    })

    computers[0].addInput(0)
    // get the first output from computer 0 to use an input
    computers[1].addInput(computers[0].run())
    // output from computer 1 as input, etc.
    computers[2].addInput(computers[1].run())
    computers[3].addInput(computers[2].run())
    computers[4].addInput(computers[3].run())

    const output = computers[4].run()

    if(output > maxOutput) {
      maxOutput = output
    }
  })

  return maxOutput
}

const getMaxFeedbackThrusterSignal = (instructions) => {

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
  getMaxFeedbackThrusterSignal,
  getMaxThrusterSignal,
}

const { getInputs } = require('../../utils/files')
const { permute } = require('../../utils/sets')
const { Opcode } = require('../../utils/opcode/v3')
const inputs =  getInputs(7)

const setupComputers = (instructions, setting) => {
  const computers = setting.reduce((acc, _, index) => {
    const computer = new Opcode(instructions, { isSilent: true })
    computer.addInput(setting[index])

    acc.push(computer)

    return acc
  }, [])

  computers[0].addInput(0)

  return computers
}

const runComputerCycle = (computers) => {
  // get the first output from computer 0 to use an input
  computers[1].addInput(computers[0].run().value)
  // output from computer 1 as input, etc.
  computers[2].addInput(computers[1].run().value)
  computers[3].addInput(computers[2].run().value)
  computers[4].addInput(computers[3].run().value)

  return computers[4].run()  
}

const getMaxThrusterSignal = (instructions) => {
  const phaseSettings = permute([0,1,2,3,4])

  let maxOutput = 0
  phaseSettings.forEach(setting => {
    const computers = setupComputers(instructions, setting)

    const output = runComputerCycle(computers)

    if(output.value > maxOutput) {
      maxOutput = output.value
    }
  })

  return maxOutput
}

const getMaxFeedbackThrusterSignal = (instructions) => {
  const phaseSettings = permute([5,6,7,8,9])

  let maxOutput = 0
  phaseSettings.forEach(setting => {
    const computers = setupComputers(instructions, setting)

    // iterate the computer cycle
    let lastOutput 
    while(true) {
      const output = runComputerCycle(computers)

      if(output.type === 'PROGRAM_END') {
        if(lastOutput > maxOutput) {
          maxOutput = lastOutput
        }
        break;
      } else if (output.type === 'OUTPUT') {
        computers[0].addInput(output.value)
        lastOutput = output.value
      }
    }
  })

  return maxOutput
}

const a = () => {
  console.log(`a = ${getMaxThrusterSignal(inputs[0])}`)
}
const b = () => {
  console.log(`b = ${getMaxFeedbackThrusterSignal(inputs[0])}`)
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

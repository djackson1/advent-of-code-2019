// ==== Opcode computer V2 ====
const POSITION_MODE = 0
const IMMEDIATE_MODE = 1

let opcodeOutputs = []
const getOpcodeOutputs = () => opcodeOutputs

const runOpcodeInstructions = (instructions, defaultInput, isSilentOutput = false) => {
  if (typeof instructions === 'string') instructions = instructions.split(',').map(Number)

  opcodeOutputs = []

  for (var head = 0; head < instructions.length;) {
    const instruction = instructions[head]
    const opcode = Number(String(instruction).slice(-2))

    const paramModes = String(instruction).slice(0, String(instruction).length - 2).split('').map(Number).reverse()
    const c = paramModes[0] || POSITION_MODE
    const b = paramModes[1] || POSITION_MODE
    const a = paramModes[2] || POSITION_MODE

    // input
    if (opcode === 3) {
      if (typeof defaultInput === 'number') {
        instructions[instructions[head + 1]] = defaultInput
      } else {
        const [input] = defaultInput
        defaultInput = defaultInput.slice(1)
        instructions[instructions[head + 1]] = input
      }
      head += 2
    // output
    } else if (opcode === 4) {
      const output = instructions[instructions[head + 1]]
      if (!isSilentOutput) {
        console.log(`diagnostic check: ${output}`)
      }
      opcodeOutputs.push(output)
      head += 2
    // add or multiply
    } else if (opcode === 1 || opcode === 2 || opcode === 7 || opcode === 8) {
      // 0 = position; 1 = immediate
      const v1 = c === POSITION_MODE ? instructions[instructions[head + 1]] : instructions[head + 1]
      const v2 = b === POSITION_MODE ? instructions[instructions[head + 2]] : instructions[head + 2]

      let output
      switch (opcode) {
      case 1: output = v1 + v2; break
      case 2: output = v1 * v2; break
      case 7: output = v1 < v2 ? 1 : 0; break
      case 8: output = v1 === v2 ? 1 : 0; break
      }

      const outputPosition = a === POSITION_MODE ? instructions[head + 3] : head + 3
      instructions[outputPosition] = output

      head += 4
    // jumps
    } else if (opcode === 5 || opcode === 6) {
      const v1 = c === POSITION_MODE ? instructions[instructions[head + 1]] : instructions[head + 1]
      const v2 = b === POSITION_MODE ? instructions[instructions[head + 2]] : instructions[head + 2]

      if ((opcode === 5 && v1 !== 0) || (opcode === 6 && v1 === 0)) {
        head = v2
      } else {
        head += 3
      }

    // return
    } else if (opcode === 99) {
      break
    } else {
      console.log('bad', opcode)
      break
    }
  }
}
// ==== Opcode computer ====

module.exports = {
  getOpcodeOutputs,
  runOpcodeInstructions,
  POSITION_MODE,
  IMMEDIATE_MODE,
}

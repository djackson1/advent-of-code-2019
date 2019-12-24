const { getInputs } = require('../../utils/files')

const inputs =  getInputs(5)[0]

const a = () => {
  let instructions = inputs.split(',').map(Number)

  // set from the site
  const defaultInput = 1;

  for(var head = 0; head < instructions.length; ) {
    // console.log("TCL: a -> head", head)
    const instruction = instructions[head];
    // console.log("TCL: a -> instruction", instruction)
    const opcode = Number(String(instruction).slice(-2))
    console.log("TCL: a -> opcode", opcode)

    if(opcode === 3) {
      // input
      instructions[instructions[head + 1]] = defaultInput;
      head += 2;
    } else if (opcode === 4) {
      // output
      console.log(`diagnostic check: ${instructions[instructions[head + 1]]}`)
      head += 2;
    } 
    // else if (opcode === 1) {
    //   // add
    // } else if (opcode === 2) {
    //   // multiply
    // }
    else if (opcode === 1 || opcode === 2) {
      // add or multiply
      const paramModes = String(instruction).slice(0, String(instruction).length - 2).split('').map(Number).reverse()
      const c = paramModes[0] || 0
      const b = paramModes[1] || 0
      const a = paramModes[2] || 0

      // 0 = position; 1 = immediate
      const v1 = c === 0 ? instructions[instructions[head + 1]] : instructions[head + 1]
      const v2 = b === 0 ? instructions[instructions[head + 2]] : instructions[head + 2]
      const result = opcode === 1 ? v1 + v2 : v1 * v2

      if(a === 0) {
        instructions[Number(instructions[head + 3])] = result
      } else {
        instructions[head + 3] = result
      }

      head += 4;
    } 
    else if (opcode === 99) {
      // return
      console.log('OPCODE 99')
      break;
    } else {
      console.log('bad', opcode)
      break;
    }
  }

  console.log(`a = ${solution}`)
}
const b = () => {
  console.log(`b = ?`)
}

var runningAsScript = !module.parent;
if(runningAsScript) {
  a();
  b();
}

const POSITION_MODE = 0
const IMMEDIATE_MODE = 1

class Opcode {
  constructor(instructions, { isSilent = false }) {
    this.inputs = []

    this.instructions = typeof instructions === 'string'
      ? instructions.split(',').map(Number)
      : instructions
    
    this.head = 0

    this.runGenerator = this.__run()

    this.isSilentOutput = isSilent
  }

  addInput (input) {
    this.inputs.push(input)
  }

  getNextInput () {
    return this.inputs.shift()
  }

  run () {
    return this.runGenerator.next().value
  }

  * __run () {
    for(; this.head < this.instructions.length;) {
      const instruction = this.instructions[this.head];
      const opcode = Number(String(instruction).slice(-2))
  
      const paramModes = String(instruction).slice(0, String(instruction).length - 2).split('').map(Number).reverse()
      const c = paramModes[0] || POSITION_MODE
      const b = paramModes[1] || POSITION_MODE
      const a = paramModes[2] || POSITION_MODE

      // input
      if(opcode === 3) {
        this.instructions[this.instructions[this.head + 1]] = this.getNextInput()
        this.head += 2;
      // output
      } else if (opcode === 4) { 
        const output = this.instructions[this.instructions[this.head + 1]]
        if(!this.isSilentOutput) {
          console.log(`diagnostic check: ${output}`)
        }
        yield output

        this.head += 2;
      // add or multiply
      } else if (opcode === 1 || opcode === 2 || opcode === 7 || opcode === 8) {
        // 0 = position; 1 = immediate
        const v1 = c === POSITION_MODE ? this.instructions[this.instructions[this.head + 1]] : this.instructions[this.head + 1]
        const v2 = b === POSITION_MODE ? this.instructions[this.instructions[this.head + 2]] : this.instructions[this.head + 2]
  
        let output
        switch (opcode) {
          case 1: output = v1 + v2; break;
          case 2: output = v1 * v2; break;
          case 7: output = v1 < v2 ? 1 : 0; break;
          case 8: output = v1 === v2 ? 1 : 0; break;
        }
  
        const outputPosition = a === POSITION_MODE ? this.instructions[this.head + 3] : this.head + 3
        this.instructions[outputPosition] = output
  
        this.head += 4;
      // jumps
      } else if (opcode === 5 || opcode === 6) {
        const v1 = c === POSITION_MODE ? this.instructions[this.instructions[this.head + 1]] : this.instructions[this.head + 1]
        const v2 = b === POSITION_MODE ? this.instructions[this.instructions[this.head + 2]] : this.instructions[this.head + 2]
  
        if((opcode === 5 && v1 !== 0) || (opcode === 6 && v1 === 0)) {
          this.head = v2
        } else {
          this.head += 3;
        }
  
      // return
      } else if (opcode === 99) {
        break;
      } else {
        console.log('bad', opcode)
        break;
      }
    }
  }
}

module.exports = {
  Opcode
}
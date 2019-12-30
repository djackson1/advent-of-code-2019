const POSITION_MODE = 0
const IMMEDIATE_MODE = 1

class Opcode {
  constructor (instructions, { isSilent = false } = {}) {
    this.inputs = []

    this.instructions = typeof instructions === 'string'
      ? instructions.split(',').map(Number)
      : instructions

    this.head = 0
    this.__relativeBase = 0
    this.runGenerator = this.__run()
    this.__outputs = []

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

  runUntilFinished () {
    while (true) {
      const output = this.run()

      if (['PROGRAM_END', 'ERROR_NO_VALUE_TO_OUTPUT'].includes(output.type)) {
        break
      }
    }
  }

  get relativeBase () {
    return this.__relativeBase
  }

  get outputs () {
    return this.__outputs
  }

  getParams (paramModes) {
    return paramModes.map((paramMode, i) => (
      paramMode === POSITION_MODE
        ? this.instructions[this.instructions[this.head + i + 1]]
        : paramMode === IMMEDIATE_MODE
          ? this.instructions[this.head + i + 1]
          : this.instructions[this.__relativeBase + this.instructions[this.head + i + 1]]
    ))
  }

  processInstruction () {
    const instruction = this.instructions[this.head]
    const opcode = Number(String(instruction).slice(-2))

    return {
      instruction,
      opcode,
    }
  }

  getParamIndex (paramMode, index) {
    return paramMode === POSITION_MODE
      ? this.instructions[this.head + index]
      : paramMode === IMMEDIATE_MODE
        ? this.head + index
        : this.__relativeBase + this.instructions[this.head + index]
  }

  setInstruction (position, value) {
    if (isNaN(value)) return

    while (position > this.instructions.length) {
      this.instructions.push(0)
    }

    this.instructions[position] = value
  }

  * __run () {
    for (; this.head < this.instructions.length;) {
      const { instruction, opcode } = this.processInstruction()

      const paramModes = String(instruction).slice(0, String(instruction).length - 2).split('').map(Number).reverse()
      const c = paramModes[0] || POSITION_MODE
      const b = paramModes[1] || POSITION_MODE
      const a = paramModes[2] || POSITION_MODE

      // input
      if (opcode === 3) {
        const paramIndex = this.getParamIndex(c, 1)
        // if (c === 2) {
        //   console.log('HEAD', this.head)
        //   console.log('RELATIVE BASE', this.__relativeBase)
        //   console.log('TCL: *__run -> outputPosition', paramIndex)
        // }

        const input = this.getNextInput()

        this.setInstruction(paramIndex, input)

        // while (paramIndex >= this.instructions.length) {
        //   this.instructions.push(0)
        // }

        // this.instructions[paramIndex] = input

        this.head += 2
      // output
      } else if (opcode === 4) {
        const [p1] = this.getParams([c])

        // const output = this.instructions[this.instructions[this.head + 1]]
        if (!this.isSilentOutput) {
          console.log(`diagnostic check: ${p1}`)
        }

        if (typeof p1 !== 'undefined') {
          this.__outputs.push(p1)
          yield { type: 'OUTPUT', value: p1 }
        } else {
          yield { type: 'ERROR_NO_VALUE_TO_OUTPUT' }
        }

        this.head += 2
      // add (1), multiply (2), less than (7) or equals (8)
      } else if (opcode === 1 || opcode === 2 || opcode === 7 || opcode === 8) {
        const [p1, p2] = this.getParams([c, b])

        let output
        switch (opcode) {
          case 1: output = p1 + p2; break
          case 2: output = p1 * p2; break
          case 7: output = p1 < p2 ? 1 : 0; break
          case 8: output = p1 === p2 ? 1 : 0; break
        }

        const outputPosition = this.getParamIndex(a, 3)
        // if (a === 2) {
        //   console.log('HEAD', this.head)
        //   console.log('RELATIVE BASE', this.__relativeBase)
        //   console.log('TCL: *__run -> outputPosition', outputPosition)
        // }
        // console.log('XXX', this.instructions[973])

        this.setInstruction(outputPosition, output)

        this.head += 4
      // jump if not equals (5), jump if equals (6)
      } else if (opcode === 5 || opcode === 6) {
        const [p1, p2] = this.getParams([c, b])

        if ((opcode === 5 && p1 !== 0) || (opcode === 6 && p1 === 0)) {
          this.head = p2
        } else {
          this.head += 3
        }
      } else if (opcode === 9) {
        const [p1] = this.getParams([c])

        this.__relativeBase += p1

        this.head += 2
      // return
      } else if (opcode === 99) {
        yield { type: 'PROGRAM_END' }
        break
      } else {
        console.log('bad', opcode)
        break
      }
    }
  }
}

module.exports = {
  Opcode,
}

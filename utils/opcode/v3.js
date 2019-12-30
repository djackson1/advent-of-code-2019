const POSITION_MODE = 0
const IMMEDIATE_MODE = 1

const TYPES = {
  PROGRAM_END: 'PROGRAM_END',
  ERROR_NO_VALUE_TO_OUTPUT: 'ERROR_NO_VALUE_TO_OUTPUT',
  OUTPUT: 'OUTPUT',
}

class Opcode {
  constructor (instructions, { isSilent = false, inputs = [] } = {}) {
    this.inputs = inputs

    this.instructions = typeof instructions === 'string'
      ? instructions.split(',').map(Number)
      : instructions

    this.__head = 0
    this.__relativeBase = 0
    this.__outputs = []
    this.isSilentOutput = isSilent

    this.runGenerator = this.__run()
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

      if ([TYPES.PROGRAM_END, TYPES.ERROR_NO_VALUE_TO_OUTPUT].includes(output.type)) {
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

  get isFinished () {
    return this.__isFinished
  }

  getParams (paramModes) {
    return paramModes.map((paramMode, i) => (
      this.instructions[this.getParamIndex(paramMode, i + 1)]
    ))
  }

  getParamIndex (paramMode, index) {
    const position = this.__head + index

    return paramMode === POSITION_MODE
      ? this.instructions[position]
      : paramMode === IMMEDIATE_MODE
        ? position
        : this.__relativeBase + this.instructions[position]
  }

  setInstruction (position, value) {
    if (isNaN(value)) return

    while (position > this.instructions.length) {
      this.instructions.push(0)
    }

    this.instructions[position] = value
  }

  getParamModes (instruction) {
    const paramModes = String(instruction).slice(0, String(instruction).length - 2).split('').map(Number).reverse()

    const c = paramModes[0] || POSITION_MODE
    const b = paramModes[1] || POSITION_MODE
    const a = paramModes[2] || POSITION_MODE

    return [c, b, a]
  }

  * __run () {
    for (; this.__head < this.instructions.length;) {
      const instruction = this.instructions[this.__head]
      const opcode = Number(String(instruction).slice(-2))

      const [c, b, a] = this.getParamModes(instruction)

      // input
      if (opcode === 3) {
        const paramIndex = this.getParamIndex(c, 1)
        const input = this.getNextInput()
        this.setInstruction(paramIndex, input)

        this.__head += 2
      // output
      } else if (opcode === 4) {
        const [p1] = this.getParams([c])

        if (!this.isSilentOutput) {
          console.log(`diagnostic check: ${p1}`)
        }

        if (typeof p1 !== 'undefined') {
          this.__outputs.push(p1)
          yield { type: TYPES.OUTPUT, value: p1 }
        } else {
          yield { type: TYPES.ERROR_NO_VALUE_TO_OUTPUT }
        }

        this.__head += 2
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
        this.setInstruction(outputPosition, output)

        this.__head += 4
      // jump if not equals (5), jump if equals (6)
      } else if (opcode === 5 || opcode === 6) {
        const [p1, p2] = this.getParams([c, b])

        if ((opcode === 5 && p1 !== 0) || (opcode === 6 && p1 === 0)) {
          this.__head = p2
        } else {
          this.__head += 3
        }
      } else if (opcode === 9) {
        const [p1] = this.getParams([c])

        this.__relativeBase += p1

        this.__head += 2
      } else if (opcode === 99) {
        this.__isFinished = true
        yield { type: TYPES.PROGRAM_END }
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

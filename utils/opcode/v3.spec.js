const chai = require('chai')
const { expect } = chai
const { Opcode } = require('./v3')

describe('Opcode computer v3', () => {
  it('should pause the program when an output is displayed', () => {
    // this will add pos 6 + 7 and put it into 8 and then display all the numbers
    const computer = new Opcode('1,11,12,13,4,11,4,12,4,13,99,16,17,12312321312', { isSilent: true })

    const outputs = [
      computer.run(),
      computer.run(),
      computer.run(),
      computer.run(),
    ]

    expect(outputs[0].value).to.equal(16)
    expect(outputs[1].value).to.equal(17)
    expect(outputs[2].value).to.equal(33)
    expect(outputs[3].value).to.equal(undefined)
  })

  describe('parameter modes', () => {
    describe('relative mode', () => {
      it('should set the relative base', () => {
        const computer = new Opcode('109,11,204,1,99,0,0,0,0,0,0,51,52,53')

        expect(computer.relativeBase).to.equal(0)
        const output = computer.run()
        expect(computer.relativeBase).to.equal(11)
        expect(output.value).to.equal(52)
      })
    })
  })

  describe('diagnostic checks', () => {
    it('should produce a copy of itself', () => {
      const programCode = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
      const computer = new Opcode(programCode)

      computer.runUntilFinished()

      expect(computer.outputs.join(',')).to.include(programCode)
    })

    it('should output a 16 digit number', () => {
      const computer = new Opcode('1102,34915192,34915192,7,4,7,99,0')

      const output = computer.run()
      expect(String(output.value).length).to.equal(16)
    })

    it('should output the large number in the middle', () => {
      const computer = new Opcode('104,1125899906842624,99')

      const output = computer.run()
      expect(output.value).to.equal(1125899906842624)
    })
  })
})

const chai = require('chai')
const expect = chai.expect
const { Opcode } = require('./v3')

describe('Opcode computer v3', () => {
  it('should pause the program when an output is displayed', () => {
    // this will add pos 6 + 7 and put it into 8 and then display all the numbers
    const computer = new Opcode("1,11,12,13,4,11,4,12,4,13,99,16,17,12312321312", { isSilent: true })

    const outputs = [
      computer.run(),
      computer.run(),
      computer.run(),
      computer.run(),
    ]
    
    expect(outputs[0]).to.equal(16)
    expect(outputs[1]).to.equal(17)
    expect(outputs[2]).to.equal(33)
    expect(outputs[3]).to.equal(undefined)
  })
})
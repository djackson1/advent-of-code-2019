const chai = require('chai')
const { expect } = chai
const { calculateAmountOfOreForFuel } = require('./main')

describe('day 14', () => {
  describe('part a examples', () => {
    const instructions = `
    10 ORE => 10 A
    1 ORE => 1 B
    7 A, 1 B => 1 C
    7 A, 1 C => 1 D
    7 A, 1 D => 1 E
    7 A, 1 E => 1 FUEL`

    it('should calculate the correct amount of A for FUEL', () => {
      expect(calculateAmountOfOreForFuel(instructions)).to.equal(31)
    })
  })

  describe('part b examples', () => {
    // tests
  })
})

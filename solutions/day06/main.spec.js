const chai = require('chai')
const expect = chai.expect
const { countTotalOrbits } = require('./main')

describe('day 06', () => {
  const data = ["COM)B","B)C","C)D","D)E","E)F","B)G","G)H","D)I","E)J","J)K","K)L"]

  describe('part a examples', () => {
    // tests
    it('should count the orbits correctly', () => {
      expect(countTotalOrbits(data)).to.equal(42)
    })
  })

  describe('part b examples', () => {
    // tests
  })
})

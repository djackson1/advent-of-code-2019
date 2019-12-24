const chai = require('chai')
const expect = chai.expect
const { isValidPassword } = require('./main')

describe('day 01', () => {
  describe('part a examples', () => {
    it('should pass for "111111"', () => {
      expect(isValidPassword("111111")).to.be.true
    })
    it('should not pass for "223450"', () => {
      expect(isValidPassword("223450")).to.be.false      
    })
    it('should not pass for "123789"', () => {
      expect(isValidPassword("123789")).to.be.false      
    })
  })
})
const chai = require('chai')
const { expect } = chai
const { isValidPassword, isValidPassword2 } = require('./main')

describe('day 01', () => {
  describe('part a examples', () => {
    it('should pass for "111111"', () => {
      expect(isValidPassword('111111')).to.be.true
    })
    it('should not pass for "223450"', () => {
      expect(isValidPassword('223450')).to.be.false
    })
    it('should not pass for "123789"', () => {
      expect(isValidPassword('123789')).to.be.false
    })
  })

  describe('part b examples', () => {
    it('should pass for "112233"', () => {
      expect(isValidPassword2('112233')).to.be.true
    })
    it('should not pass for "123444"', () => {
      expect(isValidPassword2('123444')).to.be.false
    })
    it('should pass for "111122"', () => {
      expect(isValidPassword2('111122')).to.be.true
    })
  })
})

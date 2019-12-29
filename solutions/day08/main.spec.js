const chai = require('chai')
const expect = chai.expect
const { createLayerData } = require('./main')

describe('day 08', () => {
  describe('part a examples', () => {
    const inputs = ["3,2", "123456789012"]

    it('should calculate layer data', () => {
      const [w,h] = inputs[0].split(',').map(Number)

      const layerData = createLayerData(inputs[1], w, h)
      console.log("TCL: layerData", layerData)

      expect(layerData[0]).to.deep.equal([[1,2,3], [4,5,6]])
      expect(layerData[1]).to.deep.equal([[7,8,9], [0,1,2]])
    })
  })

  describe('part b examples', () => {
    // tests
  })
})

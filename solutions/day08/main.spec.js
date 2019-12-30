const chai = require('chai')
const { expect } = chai
const { createLayerData, createStackedLayers } = require('./main')

describe('day 08', () => {
  describe('part a examples', () => {
    const inputs = [[3, 2], '123456789012']

    it('should calculate layer data', () => {
      const layerData = createLayerData(inputs[1], inputs[0][0], inputs[0][1])

      expect(layerData[0]).to.deep.equal([[1, 2, 3], [4, 5, 6]])
      expect(layerData[1]).to.deep.equal([[7, 8, 9], [0, 1, 2]])
    })
  })

  describe('part b examples', () => {
    const inputs = [[2, 2], '0222112222120000']

    it('should create an image from the layer data', () => {
      const stackedLayer = createStackedLayers(inputs[1], inputs[0][0], inputs[0][1])

      expect(stackedLayer).to.deep.equal([[0, 1], [1, 0]])
    })
  })
})

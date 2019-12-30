const chai = require('chai')
const { expect } = chai
const { calculateTotalEnergyAfterSteps, findRepeatingStepCount } = require('./main')

describe('day 12', () => {
  const examples = [
    [
      `<x=-1, y=0, z=2>
      <x=2, y=-10, z=-7>
      <x=4, y=-8, z=8>
      <x=3, y=5, z=-1>`,
      10,
      179,
    ], [
      `<x=-8, y=-10, z=0>
      <x=5, y=5, z=10>
      <x=2, y=-7, z=3>
      <x=9, y=-8, z=-3>`,
      100,
      1940,
    ],
  ]
  describe('part a examples', () => {
    // tests

    examples.forEach(([input, steps, totalEnergy], i) => {
      it(`scenario ${i} calculates the total energy correctly`, () => {
        expect(calculateTotalEnergyAfterSteps(input, steps)).to.equal(totalEnergy)
      })
    })
  })

  const examples2 = [
    [
      `<x=-8, y=-10, z=0>
      <x=5, y=5, z=10>
      <x=2, y=-7, z=3>
      <x=9, y=-8, z=-3>`,
    ],
  ]

  describe('part b examples', () => {
    // tests
    expect(findRepeatingStepCount(examples2[0][0])).to.equal(4686774924)
  })
})

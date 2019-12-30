const chai = require('chai')
const { expect } = chai
const { getOpcodeOutputs, runOpcodeInstructions } = require('./main')

describe('day 05', () => {
  describe('part a examples', () => {
    // tests
  })

  describe('part b examples', () => {
    // opcode instruction 7 and 8 test cases
    const equalityCases = [
      {
        instructions: '3,9,8,9,10,9,4,9,99,-1,8',
        expected: [
          { input: 0, output: 0 },
          { input: 7, output: 0 },
          { input: 8, output: 1 },
        ],
      }, {
        instructions: '3,9,7,9,10,9,4,9,99,-1,8',
        expected: [
          { input: 4, output: 1 },
          { input: 6, output: 1 },
          { input: 8, output: 0 },
          { input: 12, output: 0 },
        ],
      }, {
        instructions: '3,3,1108,-1,8,3,4,3,99',
        expected: [
          { input: 3, output: 0 },
          { input: 7, output: 0 },
          { input: 8, output: 1 },
          { input: 11, output: 0 },
        ],
      }, {
        instructions: '3,3,1107,-1,8,3,4,3,99',
        expected: [
          { input: 2, output: 1 },
          { input: 6, output: 1 },
          { input: 8, output: 0 },
          { input: 9, output: 0 },
        ],
      },
    ]

    equalityCases.forEach(({ instructions, expected }) => {
      describe(`instructions "${instructions}"`, () => {
        expected.forEach(({ input, output }) => {
          it(`with input "${input}" should output "${output}"`, () => {
            runOpcodeInstructions(instructions, input, true)
            expect(getOpcodeOutputs()[0]).to.equal(output)
          })
        })
      })
    })

    // jump test cases
    const jumpCases = [
      {
        /*
          3,12 // 0
          6,12,15 // 2
          1,13,14,13 // 5
          4,13 // 9
          99 // 11
          -1 // 12
          0 // 13
          1
          9 // 15
        */
        instructions: '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9',
        expected: [
          { input: -4, output: 1 },
          { input: 0, output: 0 },
          { input: 3, output: 1 },
          { input: 8, output: 1 },
        ],
      }, {
        instructions: '3,3,1105,-1,9,1101,0,0,12,4,12,99,1',
        expected: [
          { input: -3, output: 1 },
          { input: 0, output: 0 },
          { input: 1, output: 1 },
          { input: 9, output: 1 },
        ],
      }, {
        instructions: '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
        expected: [
          { input: 7, output: 999 },
          { input: 8, output: 1000 },
          { input: 9, output: 1001 },
          { input: 1001222, output: 1001 },
        ],
      },
    ]

    jumpCases.forEach(({ instructions, expected }) => {
      describe(`instructions "${instructions}"`, () => {
        expected.forEach(({ input, output }) => {
          it(`with input "${input}" should output "${output}"`, () => {
            runOpcodeInstructions(instructions, input, true)
            expect(getOpcodeOutputs()[0]).to.equal(output)
          })
        })
      })
    })
  })
})

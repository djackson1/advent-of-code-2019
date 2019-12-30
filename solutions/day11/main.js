const { getInputs } = require('../../utils/files')
const { Opcode } = require('../../utils/opcode/v3')
const [input] = getInputs(11)

const FACING = {
  0: { x: 0, y: -1 },
  1: { x: 1, y: 0 },
  2: { x: 0, y: 1 },
  3: { x: -1, y: 0 },
}

//   UP: 0,
//   RIGHT: 1,
//   DOWN: 2,
//   LEFT: 3
// }
const DIR = {
  LEFT: 0,
  RIGHT: 1,
}

const COLOR = {
  BLACK: 0,
  WHITE: 1,
}

const a = () => {
  const computer = new Opcode(input, { isSilent: true })
  computer.addInput(0)

  const grid = {}
  const robot = { x: 0, y: 0, facing: 0 }

  while (true) {
    const color = computer.run()
    if (computer.isFinished) break

    const dir = computer.run().value

    // paint current
    grid[`${robot.x}-${robot.y}`] = color.value

    // turn
    if (dir === DIR.LEFT) {
      robot.facing -= 1
      if (robot.facing < 0) robot.facing += 4
    } else {
      robot.facing += 1
      if (robot.facing > 3) robot.facing -= 4
    }

    // move
    const movement = FACING[robot.facing]
    robot.x += movement.x
    robot.y += movement.y

    // get new color underneath for input
    const colorUnder = grid[`${robot.x}-${robot.y}`]

    computer.addInput(colorUnder || COLOR.BLACK)
  }
  // computer.runUntilFinished()

  console.log('a', Object.keys(grid).length)
}
const b = () => {
  console.log('b = ?')
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {}

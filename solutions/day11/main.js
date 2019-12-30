const { getInputs } = require('../../utils/files')
const { Opcode } = require('../../utils/opcode/v3')
const [input] = getInputs(11)

const FACING = {
  0: { x: 0, y: -1 },
  1: { x: 1, y: 0 },
  2: { x: 0, y: 1 },
  3: { x: -1, y: 0 },
}

const DIR = {
  LEFT: 0,
  RIGHT: 1,
}

const COLOR = {
  BLACK: 0,
  WHITE: 1,
}

class Robot {
  constructor (instructions, initialInput) {
    this.__grid = {}
    this.__position = { x: 0, y: 0 }
    this.__facing = 0

    this.__computer = new Opcode(instructions, { isSilent: true })
    this.__computer.addInput(initialInput)
  }

  paint (color) {
    this.__grid[`${this.__position.x}~${this.__position.y}`] = color
  }

  turn (dir) {
    this.__facing += (dir === DIR.LEFT ? -1 : 1)
    this.__facing = (this.__facing + 4) % 4
  }

  moveForward () {
    const movement = FACING[this.__facing]
    this.__position.x += movement.x
    this.__position.y += movement.y
  }

  getCurrentColor () {
    return this.__grid[`${this.__position.x}~${this.__position.y}`] || COLOR.BLACK
  }

  get grid () {
    return this.__grid
  }

  drawGrid () {
    const { minX, maxX, minY, maxY } = Object.keys(this.__grid).reduce(({ minX, maxX, minY, maxY }, xy) => {
      const [x, y] = xy.split('~').map(Number)

      return {
        minX: x < minX ? x : minX,
        maxX: x > maxX ? x : maxX,
        minY: y < minY ? y : minY,
        maxY: y > maxY ? y : maxY,
      }
    }, { minX: 0, maxX: 0, minY: 0, maxY: 0 })

    for (let y = minY; y <= maxY; y++) {
      const strTokens = []
      for (let x = minX; x <= maxX; x++) {
        const token = this.__grid[`${x}~${y}`]

        strTokens.push(token ? '█' : ' ')
      }
      console.log(strTokens.join(''))
    }
  }

  runUntilFinished () {
    while (true) {
      const color = this.__computer.run()
      if (this.__computer.isFinished) break

      const dir = this.__computer.run()

      this.paint(color.value)
      this.turn(dir.value)
      this.moveForward()

      const colorUnder = this.getCurrentColor()

      this.__computer.addInput(colorUnder)
    }
  }
}

const a = () => {
  const robot = new Robot(input, 0)

  robot.runUntilFinished()

  console.log('a', Object.keys(robot.grid).length)
}
const b = () => {
  const robot = new Robot(input, 1)

  robot.runUntilFinished()

  console.log('b = ?')
  robot.drawGrid()
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {}

const { getInputs } = require('../../utils/files')
const { Opcode } = require('../../utils/opcode/v3')
const [input] = getInputs(13)

const a = () => {
  const cpu = new Opcode(input)

  const grid = {}
  while (true) {
    const [x, y, tileId] = [cpu.run(), cpu.run(), cpu.run()]
    if (cpu.isFinished) break

    grid[`${x.value}~${y.value}`] = tileId.value
  }

  const blockTiles = Object.values(grid).filter(id => id === 2)

  console.log(`a = ${blockTiles.length}`)
}

var util = require('util')

const drawGrid = (grid) => {
  // util.print('\u001b[2J\u001b[0;0H')
  // console.clear()
  process.stdout.write('\033c');

  for (let y = 0; y < 50; y++) {
    const strs = []
    for (let x = 0; x < 50; x++) {
      if (grid[y] && grid[y][x]) {
        strs.push(grid[y][x])
      } else {
        strs.push(' ')
      }
    }
    console.log(strs.join(''))
  }
}

const b = () => {
  const cpu = new Opcode(`2,${input.slice(2)}`, { isSilent: true })

  const grid = {}
  let paddleX

  while (true) {
    let [x, y, tileId] = [cpu.run(), cpu.run(), cpu.run()]
    if (cpu.isFinished) break

    x = x.value
    y = y.value
    tileId = tileId.value

    if (x === -1 && y === 0) {
      console.log(tileId)
    } else {
      if (!grid[y]) grid[y] = {}
      grid[y][x] = tileId

      if(tileId === 3){
        paddleX = x 
      } else if (tileId === 4) {
        if(paddleX < x) {
          cpu.addInput(1)
        } else if(paddleX > x) {
          cpu.addInput(-1)
        } else {
          cpu.addInput(0)
        }
      }
      // grid[`${x.value}~${y.val/ue}`] = tileId.value
    }

    drawGrid(grid)
  }

  console.log('b = ?')
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {}

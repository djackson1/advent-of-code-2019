const { getInputs } = require('../../utils/files')

const inputs =  getInputs(3).map(i => i.split(','))

const movementMap = {
  'U': { x: 0, y: 1 },
  'R': { x: 1, y: 0 },
  'D': { x: 0, y: -1 },
  'L': { x: -1, y: 0 },
}

const addWireToBoard = (board, instructions, index) => {
  const position = { x: 0, y: 0 }
  let curPos = 1

  instructions[index].forEach(instr => {
    const type = instr.slice(0, 1)
    const length = Number(instr.slice(1))

    for(var i=0; i<length; i++) {
      position.x += movementMap[type].x
      position.y += movementMap[type].y
      
      const coords = `${position.x}.${position.y}`
      if(!board[coords]) board[coords] = {}
      board[coords][index] = curPos;

      curPos++;
    }
  })
}

const a = () => {
  const board = {}

  addWireToBoard(board, inputs, 0)
  addWireToBoard(board, inputs, 1)

  let shortestDistance = 999999999
  
  Object.entries(board).forEach(([key, p]) => {

    if(Object.keys(p).length === 2) {
      const [x,y] = key.split('.').map(n => Number(n))
      const dist = Math.abs(x) + Math.abs(y)

      if(dist < shortestDistance) {
        shortestDistance = dist
      }
    }
  })


  console.log(`a = ${shortestDistance}`)
}
a();


const b = () => {
  const board = {}

  addWireToBoard(board, inputs, 0)
  addWireToBoard(board, inputs, 1)

  let shortestDistance = 999999999
  
  Object.entries(board).forEach(([key, p]) => {

    if(Object.keys(p).length === 2) {
      const [x,y] = key.split('.').map(n => Number(n))
      const dist = p[0] + p[1];

      if(dist < shortestDistance) {
        shortestDistance = dist
      }
    }
  })


  console.log(`b = ${shortestDistance}`)
}
b();
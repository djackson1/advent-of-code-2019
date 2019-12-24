const fs = require('fs-extra')
const path = require('path');


const getDayString = day => {
  if(day < 10) return `0${day}`
  return `${day}`
}
const getInputs = day => {
  const dayDir = path.resolve(__dirname, `../solutions/day${getDayString(day)}`, 'input.txt')
  return fs.readFileSync(dayDir, 'utf-8').split('\n')
} 

module.exports = {
  getInputs
}

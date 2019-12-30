const fs = require('fs-extra')
const path = require('path')

const calculateFuel = n => {
  const fuel = Math.floor(n / 3) - 2

  return fuel > 0 ? fuel : 0
}

const calculateTotalFuel = n => {
  const fuel = calculateFuel(n)

  if (fuel > 0) {
    return fuel + calculateTotalFuel(fuel)
  }
  return 0
}

const a = () => {
  const inputs = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8').split('\n')

  const answer = inputs.reduce((acc, n) => {
    return acc + Math.floor(n / 3) - 2
  }, 0)

  console.log(`a = ${answer}`)
}

const b = () => {
  const inputs = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8').split('\n')

  const answer = inputs.reduce((acc, n) => {
    return acc + calculateTotalFuel(n)
  }, 0)

  console.log(`b = ${answer}`)
}

a()
b()

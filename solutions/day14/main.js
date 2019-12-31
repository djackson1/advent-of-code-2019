const { getInputsRaw } = require('../../utils/files')

const inputs = getInputsRaw(14)

function mergeInto (obj1, obj2) {
  for (const attrname in obj2) {
    if (!obj1[attrname]) {
      obj1[attrname] = obj2[attrname]
    } else {
      obj1[attrname] += obj2[attrname]
    }
  }
}

const generateChemicalMap = (input) => {
  const split = input.split('\n').filter(r => r).map(r => r.trim().split(/=>/g))

  const map = split.reduce((acc, [recipe, output]) => {
    const [outputAmount, outputChemical] = output.trim().split(' ')

    const required = recipe.split(',').reduce((acc, r) => {
      const [amount, chemical] = r.trim().split(' ')
      acc[chemical] = Number(amount)
      return acc
    }, {})

    acc.push({
      outputChemical,
      outputAmount: Number(outputAmount),
      required,
    })

    return acc
  }, [])

  return map
}

const calculateFuelCount = (map) => {
  const chemicalsRaw = { FUEL: 1 }

  while (true) {
    const before = JSON.stringify(chemicalsRaw)

    map.forEach(({ outputChemical, outputAmount, required }) => {
      if (chemicalsRaw[outputChemical] > 0) {
        chemicalsRaw[outputChemical] -= outputAmount
        mergeInto(chemicalsRaw, required)
      }
    })

    const after = JSON.stringify(chemicalsRaw)

    if (before === after) {
      break
    }
  }

  return chemicalsRaw.ORE
}

const calculateAmountOfOreForFuel = (input) => {
  const chemicalMap = generateChemicalMap(input)
  const costs = calculateFuelCount(chemicalMap)

  return costs
}

const a = () => {
  console.log(`a = ${calculateAmountOfOreForFuel(inputs)}`)
}
const b = () => {
  console.log('b = ?')
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {
  a,
  b,
  calculateAmountOfOreForFuel,
}

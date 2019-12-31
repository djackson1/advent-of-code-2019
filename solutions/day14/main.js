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

const getMaxReactions = (count, cost, required) => {
  const times = Math.floor(count / cost) || 1

  const outputRequired = Object.entries(required).reduce((acc, [k, v]) => {
    acc[k] = v * times
    return acc
  }, {})

  return {
    outputTotal: cost * times,
    outputRequired,
  }
}

const convertAllToOre = (map, fuelCount) => {
  const chemicalsRaw = { FUEL: fuelCount }

  while (true) {
    const before = JSON.stringify(chemicalsRaw)

    map.forEach(({ outputChemical, outputAmount, required }) => {
      if (chemicalsRaw[outputChemical] > 0) {
        const { outputTotal, outputRequired } = getMaxReactions(chemicalsRaw[outputChemical], outputAmount, required)

        chemicalsRaw[outputChemical] -= outputTotal
        mergeInto(chemicalsRaw, outputRequired)
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
  const costs = convertAllToOre(chemicalMap, 1)

  return costs
}

const maximumFuelForATrillionOre = (input) => {
  const chemicalMap = generateChemicalMap(input)

  let min = 1
  let max = 999999999999
  let cur

  const counts = {} // easiest way to solve the "off by 1 problem"

  while (true) {
    cur = Math.floor((min + max) / 2)

    const oreCount = convertAllToOre(chemicalMap, cur)

    // store the amount of fuels with the ore count
    counts[cur] = oreCount

    if (oreCount < 1000000000000) {
      min = cur
    } else if (oreCount > 1000000000000) {
      max = cur
    } else if (oreCount === 1000000000000) {
      break
    }

    if (max - min === 1) break
  }

  return Number(Object.entries(counts)
    .filter(([_, count]) => count <= 1000000000000)
    .sort(([_a, a], [_b, b]) => b - a)[0][0])
}

const a = () => {
  console.log(`a = ${calculateAmountOfOreForFuel(inputs)}`)
}
const b = () => {
  console.log(`b = ${maximumFuelForATrillionOre(inputs)}`)
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
  maximumFuelForATrillionOre,
}

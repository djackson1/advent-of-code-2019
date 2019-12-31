const { getInputs } = require('../../utils/files')

const inputs = getInputs(14)

function mergeOptions (obj1, obj2) {
  const obj3 = {}
  for (const attrname in obj1) { obj3[attrname] = obj1[attrname] }
  for (const attrname in obj2) {
    if (!obj3[attrname]) {
      obj3[attrname] = obj2[attrname]
    } else {
      obj3[attrname] += obj2[attrname]
    }
  }
  return obj3
}

// 10 ORE => 10 A
// 7 A, 1 B => 1 C
const generateChemicalMap = (input) => {
  const split = input.split('\n').filter(r => r).map(r => r.trim().split(/=>/g))

  const map = split.reduce((acc, [recipe, output]) => {
    const [outputAmount, outputChemical] = output.trim().split(' ')

    const recipeSplit = recipe.split(',').reduce((acc, r) => {
      const [amount, chemical] = r.trim().split(' ')
      acc[chemical] = Number(amount)
      return acc
    }, {})
    // console.log('TCL: recipeSplit', recipeSplit)

    acc[outputChemical] = {
      amount: Number(outputAmount),
      required: recipeSplit,
    }

    return acc
  }, {})

  return map
}

const getChemicalReplacements = (map, chemicalCount) => {
  const [chemical] = Object.keys(chemicalCount)
  let count = chemicalCount[chemical]

  let raw = {}
  let extras = {}

  const { amount, required } = map[chemical]

  while (count >= amount) {
    count -= amount

    raw = mergeOptions(raw, required)
  }

  if (count !== 0) {
    extras = mergeOptions(raw, { [chemical]: count })
  }

  return [raw, extras]
}

const calculateFuelCount = (map) => {
  let chemicalsRaw = { ...map.FUEL.required }
  let chemicalsExtras = {}

  while (true) {
    console.log('TCL: calculateFuelCount -> chemicalsRaw', chemicalsRaw)
    console.log('TCL: calculateFuelCount -> chemicalsExtras', chemicalsExtras)

    if (chemicalsRaw.length !== 0) {
      const [firstKey] = Object.keys(chemicalsRaw) // .shift()

      const first = { [firstKey]: chemicalsRaw[firstKey] }
      delete chemicalsRaw[firstKey]

      console.log('TCL: calculateFuelCount -> first', first)
      // console.log('TCL: calculateFuelCount -> chemicalsRaw', chemicalsRaw)

      const [newRaw, newExtras] = getChemicalReplacements(map, first)
      console.log('TCL: calculateFuelCount -> [newRaw, newExtras] ', [newRaw, newExtras])

      chemicalsRaw = mergeOptions(chemicalsRaw, newRaw)
      chemicalsExtras = mergeOptions(chemicalsExtras, newExtras)
    }
  }
}

const calculateAmountOfOreForFuel = (input) => {
  const chemicalMap = generateChemicalMap(input)

  const costs = calculateFuelCount(chemicalMap, [[1, 'FUEL']])
  console.log('TCL: calculateAmountOfOreForFuel -> costs', costs)
}

const a = () => {
  console.log('a = ?')
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

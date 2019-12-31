const { getInputs } = require('../../utils/files')

const inputs = getInputs(14)

// 10 ORE => 10 A
// 7 A, 1 B => 1 C
const generateChemicalMap = (input) => {
  const split = input.split('\n').filter(r => r).map(r => r.trim().split(/=>/g))

  const map = split.reduce((acc, [recipe, output]) => {
    const [outputAmount, outputChemical] = output.trim().split(' ')

    const recipeSplit = recipe.split(',').map(r => {
      const [amount, chemical] = r.trim().split(' ')
      return [chemical, Number(amount)]
    })
    // console.log('TCL: recipeSplit', recipeSplit)

    acc[outputChemical] = {
      amount: Number(outputAmount),
      required: recipeSplit,
    }

    return acc
  }, {})

  return map
}

const getChemicalReplacements = (map, [chemical, count]) => {
  const raw = []
  const extras = []

  // console.log('TCL: getChemicalReplacements -> map[chemical]', map, chemical, map[chemical])
  const { amount, required } = map[chemical]

  while (count >= amount) {
    count -= amount

    raw.push(...required)
  }

  if (count !== 0) {
    extras.push([chemical, count])
  }

  return [raw, extras]
}

const calculateFuelCount = (map) => {
  const chemicalsRaw = [...map.FUEL.required]
  const chemicalsExtras = []

  while (true) {
    console.log('TCL: calculateFuelCount -> chemicalsRaw', chemicalsRaw)
    console.log('TCL: calculateFuelCount -> chemicalsExtras', chemicalsExtras)

    if (chemicalsRaw.length !== 0) {
      const first = chemicalsRaw.shift()
      // console.log('TCL: calculateFuelCount -> first', first)
      // console.log('TCL: calculateFuelCount -> chemicalsRaw', chemicalsRaw)

      const [newRaw, newExtras] = getChemicalReplacements(map, first)

      chemicalsRaw.push(...newRaw)
      chemicalsExtras.push(...newExtras)
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

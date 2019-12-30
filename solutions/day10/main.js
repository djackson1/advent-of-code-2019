const { getInputs } = require('../../utils/files')

const inputs = getInputs(10)

const getAllAsteroids = (rows) => {
  return rows.reduce((acc, r, rowId) => {
    r.trim().split('').forEach((d, colId) => {
      if (d === '#') {
        acc.push({ x: colId, y: rowId })
      }
    })
    return acc
  }, [])
}

const countMaxAsteroids = (rows) => {
  const asteroids = getAllAsteroids(rows)

  const map = asteroids.map(({ x, y }) => {
    const angleMap = asteroids.reduce((acc, { x: x2, y: y2 }) => {
      if (x !== x2 || y !== y2) {
        const angle = String((180 / Math.PI) * Math.atan2(y2 - y, x2 - x)).slice(0, 10)
        // console.log(`{${x},${y}} {${x2},${y2}} ${angle}`)
        acc[angle] = true
      }
      return acc
    }, {})

    return {
      x,
      y,
      count: Object.keys(angleMap).length,
    }
  })

  return Object.values(map).sort((a, b) => b.count - a.count)[0].count
}

const a = () => {
  console.log(`a = ${countMaxAsteroids(inputs)}`)
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
  countMaxAsteroids,
}

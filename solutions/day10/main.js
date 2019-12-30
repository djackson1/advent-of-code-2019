const { getInputs } = require('../../utils/files')
const { spliceTogetherArray } = require('../../utils/sets')

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

/**
 * Returns the angle between two points with UP being the most negative
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} x2
 * @param {Number} y2
 */
const getAngle = (x, y, x2, y2) => {
  const angle = Math.atan2(y2 - y, x2 - x)
  if (angle < (-1 * Math.PI / 2)) {
    return angle + Math.PI * 2
  }
  return angle
}

const getAngleMapOfAsteroid = ({ x, y }, asteroids) => {
  const angleMap = asteroids.reduce((acc, { x: x2, y: y2 }) => {
    if (x !== x2 || y !== y2) {
      const angle = getAngle(x, y, x2, y2)
      // console.log(`{${x},${y}} {${x2},${y2}} ${angle}`)

      const dx = x - x2
      const dy = y - y2
      const dist = dx * dx + dy + dy // no need for sqrt

      if (!acc[angle]) acc[angle] = []
      acc[angle].push({ x: x2, y: y2, dist })
    }
    return acc
  }, {})

  Object.keys(angleMap).forEach(angle => {
    angleMap[angle].sort((a, b) => a.dist - b.dist)
  })

  return angleMap
}

const getAngleMapOfAsteroids = asteroids => {
  const map = asteroids.map(({ x, y }) => {
    const angleMap = getAngleMapOfAsteroid({ x, y }, asteroids)

    return {
      x,
      y,
      angleMap,
      count: Object.keys(angleMap).length,
    }
  })

  return map
}

const countMaxAsteroids = (rows) => {
  const asteroids = getAllAsteroids(rows)

  const angleMap = getAngleMapOfAsteroids(asteroids)
  const [mostAsteroids] = Object.values(angleMap).sort((a, b) => b.count - a.count)

  return mostAsteroids.count
}

const getAsteroidVaporizeSequence = (rows, lazerPos) => {
  const asteroids = getAllAsteroids(rows)
  const angleMap = getAngleMapOfAsteroid(lazerPos, asteroids)

  const anglesInOrder = Object.entries(angleMap).sort((a, b) => a[0] - b[0])

  const sequence = spliceTogetherArray(anglesInOrder)

  return sequence
}

const a = () => {
  console.log(`a = ${countMaxAsteroids(inputs)}`)
}
const b = () => {
  // use part a an input
  const sequence = getAsteroidVaporizeSequence(inputs, { x: 14, y: 17 })

  console.log(`x: ${sequence[199].x}`)
  console.log(`y: ${sequence[199].y}`)

  console.log(`b = ${sequence[199].x * 100 + sequence[199].y}`)
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {
  countMaxAsteroids,
  getAllAsteroids,
  getAsteroidVaporizeSequence,
}

const { getInputs } = require('../../utils/files')

const inputs =  getInputs(6)

const getDistanceMap = orbits => {
  const distanceMap = {}

  // specifically use a for loop so we can alter the array length dynamically
  for(var i=0; i<orbits.length; i++) {
    const [baseObj, objInOrbit] = orbits[i]
    
    // assume "COM" is always the center/base obj
    if(baseObj === 'COM') {
      distanceMap[objInOrbit] = ['COM'];
    // if we have a distance map for the baseObj then just add 1
    } else if (distanceMap[baseObj]) {
      distanceMap[objInOrbit] = [ ...distanceMap[baseObj], baseObj]
    // wait until we have more data
    } else {
      orbits.push([baseObj, objInOrbit])
    }
  }

  return distanceMap
}

const countTotalOrbits = (orbitArr) => {
  const orbitsSplit = orbitArr.map(s => s.split(')'))

  const distanceMap = getDistanceMap(orbitsSplit)

  // sum all distances
  return Object.values(distanceMap).reduce((acc, d) => acc + d.length, 0)
}

const a = () => {
  console.log(`a = ${countTotalOrbits(inputs)}`)
}

const findDistanceToSanta = (distanceMap) => {
  // reverse the order to find the nearest from us (otherwise COM would be the first found)
  const you = distanceMap['YOU'].reverse()
  const san = distanceMap['SAN']

  // returns the nearest obj and the amount of jumps we need to take
  const nearestOrbit = you.reduce((nearest, obj, n) => {
    if(nearest) return nearest

    if(san.includes(obj)) {
      return [obj, n]
    }
  }, null)

  // find our nearest orbit and then the count to get to santa
  const distanceFromSan = san.slice(san.indexOf(nearestOrbit[0]) + 1).length

  return nearestOrbit[1] + distanceFromSan
}

const findTransferCount = (orbitArr) => {
  const orbitsSplit = orbitArr.map(s => s.split(')'))
  const distanceMap = getDistanceMap(orbitsSplit)

  return findDistanceToSanta(distanceMap)
}

const b = () => {
  console.log(`b = ${findTransferCount(inputs)}`)
}

var runningAsScript = !module.parent;
if(runningAsScript) {
  a();
  b();
}

module.exports = {
  countTotalOrbits,
  findTransferCount
}
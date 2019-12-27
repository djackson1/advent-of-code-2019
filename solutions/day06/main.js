const { getInputs } = require('../../utils/files')

const inputs =  getInputs(6)

const getDistanceMap = orbits => {
  const distanceMap = {
    'COM': []
  }

  // specifically use a for loop so we can alter the array length dynamically
  for(var i=0; i<orbits.length; i++) {
    const [baseObj, objInOrbit] = orbits[i]
    
    // add to the baseObj's distance map if it exists
    if (distanceMap[baseObj]) {
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

const distanceToCommonObj = (orbitArr, obj) => {
  return orbitArr.slice(0, orbitArr.indexOf(obj)).length
}

const findDistanceToSanta = (distanceMap) => {
  // reverse the order to find the nearest from us (otherwise COM would be the first found)
  const you = distanceMap['YOU'].reverse()
  const san = distanceMap['SAN'].reverse()

  // returns the nearest obj
  const nearestOrbit = you.reduce((nearest, obj) => {
    // if we've already found the nearest just exit
    if(nearest) return nearest

    // check if the next closest object is also has SAN in orbit
    if(san.includes(obj)) {
      return obj
    }
  }, null)

  // find the distance to common orbit for both YOU and SAN
  return distanceToCommonObj(you, nearestOrbit) + distanceToCommonObj(san, nearestOrbit)
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
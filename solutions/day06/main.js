const { getInputs } = require('../../utils/files')

const inputs =  getInputs(6)

const countTotalOrbits = (orbitArr) => {
  const orbitsSplit = orbitArr.map(s => s.split(')'))

  const distanceMap = {}

  // specifically use a for loop so we can alter the array length dynamically
  for(var i=0; i<orbitsSplit.length; i++) {
    const [baseObj, objInOrbit] = orbitsSplit[i]
    
    // assume "COM" is always the center/base obj
    if(baseObj === 'COM') {
      distanceMap[objInOrbit] = 1;
    // if we have a distance map for the baseObj then just add 1
    } else if (distanceMap[baseObj]) {
      distanceMap[objInOrbit] = distanceMap[baseObj] + 1
    // wait until we have more data
    } else {
      orbitsSplit.push([baseObj, objInOrbit])
    }
  }

  // sum all distances
  return Object.values(distanceMap).reduce((acc, d) => acc + d, 0)
}

const a = () => {
  console.log(`a = ${countTotalOrbits(inputs)}`)
}

const b = () => {
  console.log(`b = ?`)
}

var runningAsScript = !module.parent;
if(runningAsScript) {
  a();
  b();
}

module.exports = {
  countTotalOrbits
}
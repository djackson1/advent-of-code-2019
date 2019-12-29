const { getInputs } = require('../../utils/files')

const inputs =  getInputs(8)

const createLayerData = (imageData, width, height) => {
  const layerSize = width * height

  return imageData.split('').reduce((acc, data, index) => {
    const layer = Math.floor(index / layerSize)
    const layerRow = Math.floor((index % layerSize) / width)

    if(index % layerSize === 0) {
      acc.push([])
    }

    if(index % width === 0) {
      acc[layer][layerRow] = []
    }

    acc[layer][layerRow].push(Number(data))


    return acc
  }, [])
}

const a = () => {
  const solution = 0

  console.log(`a = ${solution}`)
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
  createLayerData
}

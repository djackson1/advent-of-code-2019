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
  const [w,h] = inputs[0].split(',').map(Number)
  const layers = createLayerData(inputs[1], w, h)

  const layerMetadata = layers.map(l => {
    const counts = l.reduce((acc, row) => {
      row.forEach(n => {
        if(!acc[n]) acc[n] = 0
        
        acc[n]++
      })

      return acc
    }, {})

    return {
      counts,
      layers: l
    }
  })
  // console.log("TCL: layerMetadata", layerMetadata)
  
  const sortedLayers = [...layerMetadata].sort((a, b) => a.counts[0] - b.counts[0])
  console.log("TCL: sortedLayers", sortedLayers)
  // console.log("TCL: a -> sortedLayers", sortedLayers.map(n => n.zeroCount))
  const { counts } = sortedLayers[0]

  console.log(`a = ${counts[1] * counts[2]}`)


  
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

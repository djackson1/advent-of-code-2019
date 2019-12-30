const { getInputs } = require('../../utils/files')

const inputs = getInputs(8)

const createLayerData = (imageData, width, height) => {
  const layerSize = width * height

  return imageData.split('').reduce((acc, data, index) => {
    const layer = Math.floor(index / layerSize)
    const layerRow = Math.floor((index % layerSize) / width)

    if (index % layerSize === 0) {
      acc.push([])
    }

    if (index % width === 0) {
      acc[layer][layerRow] = []
    }

    acc[layer][layerRow].push(Number(data))

    return acc
  }, [])
}

const createStackedLayers = (imageData, width, height) => {
  const layers = createLayerData(imageData, width, height)

  const base = layers.shift()
  layers.reduce((image, layer) => {
    layer.forEach((rowData, row) => {
      rowData.forEach((data, col) => {
        if (base[row][col] === 2) {
          base[row][col] = data
        }
      })
    })

    return image
  }, base)

  return base
}

const a = () => {
  const [w, h] = inputs[0].split(',').map(Number)
  const layers = createLayerData(inputs[1], w, h)

  const layerMetadata = layers.map(l => {
    const counts = l.reduce((acc, row) => {
      row.forEach(n => {
        if (!acc[n]) acc[n] = 0

        acc[n]++
      })

      return acc
    }, {})

    return {
      counts,
      layers: l,
    }
  })

  const sortedLayers = [...layerMetadata].sort((a, b) => a.counts[0] - b.counts[0])
  const [{ counts }] = sortedLayers

  console.log(`a = ${counts[1] * counts[2]}`)
}
const b = () => {
  const [w, h] = inputs[0].split(',').map(Number)
  const stackedLayers = createStackedLayers(inputs[1], w, h)

  console.log('b = ?')
  stackedLayers.forEach(r => {
    console.log(r.join(' ').replace(/0/g, '.').replace(/1/g, 'X'))
  })
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {
  createLayerData,
  createStackedLayers,
}

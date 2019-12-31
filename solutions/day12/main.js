const { getInputsRaw } = require('../../utils/files')

const input = getInputsRaw(12)

const calculateTotalEnergyAfterSteps = (instructions, steps) => {
  let moonData = instructions.split('\n').map(i => {
    const { 2: px, 6: py, 10: pz } = i.trim().split(/(,|=|>)/g).map(Number)

    return {
      px,
      py,
      pz,
      vx: 0,
      vy: 0,
      vz: 0,
    }
  })

  for (let i = 0; i < steps; i++) {
    const updatedVelocities = [...moonData].map(({ px, py, pz, vx, vy, vz }, idx) => {
      const newVelocities = moonData.reduce((acc, moon2, idx2) => {
        if (idx === idx2) return acc

        return {
          vx: acc.vx + (moon2.px < px ? -1 : (moon2.px > px ? 1 : 0)),
          vy: acc.vy + (moon2.py < py ? -1 : (moon2.py > py ? 1 : 0)),
          vz: acc.vz + (moon2.pz < pz ? -1 : (moon2.pz > pz ? 1 : 0)),
        }
      }, { vx, vy, vz })

      return {
        px,
        py,
        pz,
        ...newVelocities,
      }
    })

    moonData = updatedVelocities.map(({ px, py, pz, vx, vy, vz }) => {
      return {
        px: px + vx,
        py: py + vy,
        pz: pz + vz,
        vx,
        vy,
        vz,
      }
    })
  }

  return moonData.reduce((acc, { px, py, pz, vx, vy, vz }) => {
    const p = Math.abs(px) + Math.abs(py) + Math.abs(pz)
    const v = Math.abs(vx) + Math.abs(vy) + Math.abs(vz)

    return acc + p * v
  }, 0)
}

const findRepeatedStep = (moons) => {
  const originalMoons = JSON.stringify([...moons])

  const stepPositions = []

  for (let i = 0; ; i++) {
    moons = moons.map(([pos, vel], idx) => {
      const newVel = moons.reduce((acc, [pos2], idx2) => {
        if (idx === idx2) return acc

        if (pos2 < pos) return acc - 1
        if (pos2 > pos) return acc + 1
        return acc
      }, vel)
      const newPos = pos + newVel
      return [newPos, newVel]
    })

    if (JSON.stringify(moons) === originalMoons) {
      stepPositions.push(i)

      if (stepPositions.length === 2) {
        return stepPositions[1] - stepPositions[0]
      }
    }
  }
}

const findRepeatingStepCount = (inputs) => {
  const moonData = inputs.split('\n').map(i => {
    const { 2: x, 6: y, 10: z } = i.trim().split(/(,|=|>)/g).map(Number)

    return { x, y, z }
  })

  const xs = moonData.map(({ x }) => ([x, 0]))
  const ys = moonData.map(({ y }) => ([y, 0]))
  const zs = moonData.map(({ z }) => ([z, 0]))

  const xsRepeatedStep = findRepeatedStep(xs)
  const ysRepeatedStep = findRepeatedStep(ys)
  const zsRepeatedStep = findRepeatedStep(zs)

  console.log('TCL: findRepeatingStepCount -> xsRepeatedStep', xsRepeatedStep)
  console.log('TCL: findRepeatingStepCount -> ysRepeatedStep', ysRepeatedStep)
  console.log('TCL: findRepeatingStepCount -> zsRepeatedStep', zsRepeatedStep)
}

const a = () => {
  console.log(`a = ${calculateTotalEnergyAfterSteps(input, 1000)}`)
}
const b = () => {
  console.log(`b = ${findRepeatingStepCount(input)}`)
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {
  a,
  b,
  calculateTotalEnergyAfterSteps,
  findRepeatingStepCount,
}

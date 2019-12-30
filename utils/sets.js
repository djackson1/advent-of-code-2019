let permArr = []
let usedChars = []

function __permute (input) {
  var i, ch
  for (i = 0; i < input.length; i++) {
    [ch] = input.splice(i, 1)
    usedChars.push(ch)
    if (input.length === 0) {
      permArr.push(usedChars.slice())
    }
    __permute(input)
    input.splice(i, 0, ch)
    usedChars.pop()
  }
  return permArr
};

const permute = (input) => {
  permArr = []
  usedChars = []

  return __permute(input)
}

const spliceTogetherArray = arrays => {
  const arr2 = arrays.map(([_, arr]) => arr)

  const max = arr2.reduce((acc, n) => {
    if (n.length > acc) return n.length

    return acc
  }, 0)

  const sequences = []
  for (let i = 0; i < max; i++) {
    arr2.forEach(arr => {
      if (arr.length > 0) {
        sequences.push(arr.shift())
      }
    })
  }

  return sequences
}

module.exports = {
  permute,
  spliceTogetherArray,
}

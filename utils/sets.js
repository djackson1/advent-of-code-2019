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

  // find the max elements in the sub arrays as the maximum loops needed
  const max = arr2.reduce((acc, n) => {
    if (n.length > acc) return n.length

    return acc
  }, 0)

  const sequences = [...Array(max)].reduce((acc) => {
    arr2.forEach(arr => {
      // if there are elements in the sub array
      if (arr.length > 0) {
        // add and remove the first element
        acc.push(arr.shift())
      }
    })
    return acc
  }, [])

  return sequences
}

module.exports = {
  permute,
  spliceTogetherArray,
}

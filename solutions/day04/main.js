const { getInputs } = require('../../utils/files')

const inputs =  getInputs(4)[0]

const areTokensInOrder = tokens => tokens.reduce((inOrder, value, index, arr) => {
  return inOrder && (index !== arr.length - 1 ? value <= arr[index + 1] : true)
}, true)

const isValidPassword = password => {
  const tokens = String(password).split('').map(Number)

  let hasAdjacentDigits = false

  for(var i=0; i<tokens.length; i++) {
    const curToken = tokens[i]
    if(i !== tokens.length - 1) {
      const nextToken = tokens[i + 1]

      if(curToken === nextToken) {
        hasAdjacentDigits = true
      }
    }
  }

  return areTokensInOrder(tokens) && hasAdjacentDigits
}

const a = () => {
  const [min, max] = inputs.split('-').map(n => Number(n))

  let count = 0;
  for(var i=min; i<=max; i++){
    if(isValidPassword(i)) {
      count++
    }
  }

  console.log(`a = ${count}`)
}

const isValidPassword2 = password => {
  const tokens = String(password).split('').map(Number)

  let hasAdjacentDigits = false

  for(var i=0; i<tokens.length; i++) {
    const curToken = tokens[i]
    if(i !== tokens.length - 1) {
      const nextToken = tokens[i + 1]

      // check for adjacent
      if(curToken === nextToken) {
        const prevToken = i !== 0 ? tokens[i - 1] : null

        // we need to check forward and backwards
        if(prevToken !== curToken) {
          if(i !== tokens.length - 2) {
            const nextNextToken = tokens[i + 2]
            
            // see if the cycle continues after the matching digit
            if(curToken !== nextNextToken){
              hasAdjacentDigits = true
            }
          // the compared digit is the final and therefore adjacent is true
          } else {
            hasAdjacentDigits = true
          }
        }
      }
    }
  }

  return areTokensInOrder(tokens) && hasAdjacentDigits
}

const b = () => {
  const [min, max] = inputs.split('-').map(n => Number(n))

  let count = 0;
  for(var i=min; i<=max; i++){
    if(isValidPassword2(i)) {
      count++
    }
  }

  console.log(`b = ${count}`)
}

var runningAsScript = !module.parent;
if(runningAsScript) {
  a();
  b();
}

module.exports = {
  isValidPassword,
  isValidPassword2,
}
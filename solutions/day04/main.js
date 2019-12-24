const { getInputs } = require('../../utils/files')

const inputs =  getInputs(4)[0]

const isValidPassword = password => {
  const tokens = String(password).split('')

  let hasAdjacentDigits = false
  let isInDescendingOrder = true

  for(var i=0; i<tokens.length; i++) {
    const curToken = Number(tokens[i])
    if(i !== tokens.length - 1) {
      const nextToken = Number(tokens[i + 1])
      
      if(curToken > nextToken) {
        isInDescendingOrder = false
        break;
      }

      if(curToken === nextToken) {
        hasAdjacentDigits = true
      }
    }
  }

  return hasAdjacentDigits && isInDescendingOrder
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
a();

module.exports = {
  isValidPassword
}
let permArr = []
let usedChars = []

function __permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    __permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

const permute = (input) => {
  permArr = []
  usedChars = []

  return __permute(input)
}


module.exports = {
  permute
}
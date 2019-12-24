const { getInputs } = require('../../utils/files')

const runProgram = inputs => {
  let head = 0;
  let lastResult;

  while(true) {
    if(inputs[head] === 1) {
      // add
      const result = inputs[inputs[head + 1]] + inputs[inputs[head + 2]]
      inputs[head + 3] = result
      lastResult = result
    } else if (inputs[head] === 2) {
      const result = inputs[inputs[head + 1]] * inputs[inputs[head + 2]]
      inputs[head + 3] = result
      lastResult = result
      // multiply
    } else if (inputs[head] === 99) {
      // halt
      return lastResult;
    } else {
      // error
      console.log('ERROR')
    }

    head += 4;
  }
}

const a = () => {
  const inputs = getInputs(2)[0].split(',').map(n => Number(n))
  inputs[1] = 12;
  inputs[2] = 2;

  const solution = runProgram(inputs)

  console.log(`a = ${solution}`);
}

const b = () => {
  const inputs = getInputs(2)[0].split(',').map(n => Number(n))

  let i,j,solution,program;
  
  for(i=0; i<=99; i++){
    for(j=0; j<=99; j++){
      program = [...inputs]
      program[1] = i;
      program[2] = j
      solution = runProgram(program)

      if(solution === 19690720) break;
    }

    if(solution === 19690720) break;
  }

  console.log(`b = 100 * ${program[1]} + ${program[2]} = ${ 100 * program[1] + program[2]}`);
}

a();
b();
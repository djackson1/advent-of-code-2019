#!/bin/bash

# https://stackoverflow.com/a/24112741
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# https://unix.stackexchange.com/questions/232384/argument-string-to-integer-in-bash/232386
[[ $1 -lt 10 ]] && day="0$1" || day="$1"

folder_path=../solutions/day$day

mkdir -p $folder_path;
touch $folder_path/input.txt

touch $folder_path/main.js
echo -n > $folder_path/main.js
echo "const { getInputs } = require('../../utils/files')

const inputs = getInputs($1)

const a = () => {
  console.log('a = ?')
}
const b = () => {
  console.log('b = ?')
}

var runningAsScript = !module.parent
if (runningAsScript) {
  a()
  b()
}

module.exports = {}" >> $folder_path/main.js

touch $folder_path/main.spec.js
echo -n > $folder_path/main.spec.js
echo "const chai = require('chai')
const { expect } = chai

describe('day ${day}', () => {
  describe('part a examples', () => {
    // tests
  })

  describe('part b examples', () => {
    // tests
  })
})" >> $folder_path/main.spec.js

cd -

git checkout -b day/$day
//when numbers are pressed, string version of num gets added to stringnum array
//when non-num is pressed, turn num string into number, put number into final array
//put operation in final array
//when numbers are pressed, string version of num gets added to stringnum array
//repeat

//screen can display max 7 numbers including decimal

const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2
};

const buttons = {
  zero: document.getElementsByClassName('zero'),
  one: document.getElementsByClassName('one'),
  two: document.getElementsByClassName('two'),
  three: document.getElementsByClassName('three'),
  four: document.getElementsByClassName('four'),
  five: document.getElementsByClassName('five'),
  six: document.getElementsByClassName('six'),
  seven: document.getElementsByClassName('seven'),
  eight: document.getElementsByClassName('eight'),
  nine: document.getElementsByClassName('nine'),
  clear: document.getElementsByClassName('clear'),
  delete: document.getElementsByClassName('delete'),
  negative: document.getElementsByClassName('negative'),
  add: document.getElementsByClassName('add'),
  subtract: document.getElementsByClassName('subtract'),
  multiply: document.getElementsByClassName('multiply'),
  divide: document.getElementsByClassName('divide'),
  decimal: document.getElementsByClassName('decimal'),
  equals: document.getElementsByClassName('equals')
};

const numsAndOperations = [];
let temporaryNums = '';

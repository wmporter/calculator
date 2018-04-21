//when numbers are pressed, string version of num gets added to stringnum array
//when non-num is pressed, turn num string into number, put number into final array
//put operation in final array
//when numbers are pressed, string version of num gets added to stringnum array
//repeat

//screen can display max 7 numbers including decimal

function changeScreen() {
  console.log(Number(temporaryNums));
}

const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2
};

const numButtons = document.querySelectorAll('.number')
numButtons.forEach(function(currentBut) {
  currentBut.addEventListener('click', function() {
    let text = currentBut.textContent;
    if (temporaryNums.length < 7) {
      temporaryNums += text;
      changeScreen();
    }
  });
});

const otherButtons = {
  clear: document.getElementsByClassName('clear'),
  delete: document.getElementsByClassName('delete'),
  negative: document.getElementsByClassName('negative'),
  '+': document.getElementsByClassName('add'),
  '-': document.getElementsByClassName('subtract'),
  '*': document.getElementsByClassName('multiply'),
  '/': document.getElementsByClassName('divide'),
  '.': document.getElementsByClassName('decimal'),
  equals: document.getElementsByClassName('equals')
}

const screen = document.getElementsByClassName('screen');
const numsAndOperations = [];
let temporaryNums = '';

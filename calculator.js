//when numbers are pressed, string version of num gets added to stringnum array
//when non-num is pressed, turn num string into number, put number into final array
//put operation in final array
//when numbers are pressed, string version of num gets added to stringnum array
//repeat

//screen can display max 7 numbers including decimal

function changeScreen(specialInstruction) {
  if (specialInstruction === 'clear') {
    screen.textContent = 0;
  } else if (specialInstruction !== 'none') {
    screen.textContent = specialInstruction;
  } else {
    screen.textContent = temporaryNums;
  }
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
      changeScreen('none');
    }
  });
});

const clear = document.getElementById('clear');
clear.addEventListener('click', function() {
  temporaryNums = '';
  changeScreen('clear');
  numsAndOperations = [];
});

const deleteKey = document.getElementById('delete');
deleteKey.addEventListener('click', function() {
  if (temporaryNums.length === 1) {
    temporaryNums = '';
    changeScreen('clear');
  } else if (temporaryNums.length > 1) {
    temporaryNums = temporaryNums.slice(0, temporaryNums.length - 1);
    changeScreen('none');
  }
});

const negative = document.getElementById('negative');
negative.addEventListener('click', function() {
  if (temporaryNums.length === 0) {
    return;
  } else if (temporaryNums[0] !== '-') {
    temporaryNums = '-' + temporaryNums;
    changeScreen('none')
  } else {
    temporaryNums = temporaryNums.slice(1);
    changeScreen('none');
  }
});

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(function(currentBut) {
  currentBut.addEventListener('click', function() {
    numsAndOperations.push(Number(temporaryNums));
    let text = currentBut.textContent;
    numsAndOperations.push(text);
    temporaryNums = '';
    changeScreen(text);
  });
});

  // equals: document.getElementsByClassName('equals')

const screen = document.getElementById('screentext');
let numsAndOperations = [];
let temporaryNums = '';

let numsAndOperations = [];
let temporaryNums = '';

const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: function(num1, num2) {
    if (num2 === 0) {
      screen.textContent = 'Nah, yo!';
      numsAndOperations = [];
      temporaryNums = '';
    } else {
      return num1 / num2;
    }
  }
};

const screen = document.getElementById('screentext');

document.querySelectorAll('.number').forEach(function(button) {
  button.addEventListener('click', function() {
    pressNumber(this.textContent);
  });
});
document.querySelectorAll('.operation').forEach(function(button) {
  button.addEventListener('click', function() {
    pressOperation(this.textContent);
  });
});
document.getElementById('negative').addEventListener('click', pressNegative);
document.getElementById('clear').addEventListener('click', pressClear);
document.getElementById('delete').addEventListener('click', pressDelete);
document.getElementById('decimal').addEventListener('click', pressDecimal);
document.getElementById('eqbutton').addEventListener('click', pressEquals);

document.addEventListener('keydown', function(event) {
  let keyName = event.key;
  event.preventDefault();
  console.log('key name is', keyName, 'event.key is', event.key);
  if (keyName.match(/^[0-9]$/)) {
    pressNumber(keyName);
  } else if (keyName === 'Enter' || keyName === '=') {
      pressEquals();
  } else if (keyName === '+' || keyName === '-') {
      pressOperation(keyName)
  } else if (keyName === '*') {
      pressOperation('x');
  } else if (keyName === '/') {
      pressOperation('÷');
  } else if (keyName === 'Clear') {
      pressClear();
  } else if (keyName === 'Backspace' || keyName === 'Delete') {
      pressDelete();
  } else if (keyName === '.') {
      pressDecimal();
  }
});


function changeScreen(specialInstruction = 'none') {
  if (specialInstruction === 'clear') {
    screen.textContent = 0;
  } else if (specialInstruction === 'answer') {
    let numText = String(numsAndOperations);
    if (numText.length <= 8) {
      screen.textContent = numsAndOperations;
    } else {
      if (numText.indexOf('.') !== -1 &&
          numText.indexOf('.') < 6) {
        if (numText.slice(2, 8) === '000000') {
          screen.textContent = 0;
        } else {
          let fixedAmount = 6;
          fixedAmount -= (numText.indexOf('.') - 1);
          screen.textContent = Number(numText).toFixed(fixedAmount);
        }
      } else {
        let ones = numText.slice(0,1);
        let decimals = numText.slice(1,4);
        let extra = numText.length - 1;
        let scientificNotation = ones + '.' + decimals + 'e' + extra;
        screen.textContent = scientificNotation;
      }
    }
  } else if (specialInstruction !== 'none') {
    screen.textContent = specialInstruction;
  } else {
    screen.textContent = temporaryNums;
  }
}

function pressNumber(number) {
  if (temporaryNums.length < 8) {
      temporaryNums += number;
      changeScreen();
  }
}

function pressOperation(op) {
  numsAndOperations.push(Number(temporaryNums));
  numsAndOperations.push(op);
  temporaryNums = '';
  changeScreen(op);
}

function pressNegative() {
  if (temporaryNums.length > 0) {
    if (temporaryNums[0] !== '-') {
      temporaryNums = '-' + temporaryNums;
    } else {
      temporaryNums = temporaryNums.slice(1);
    }
    changeScreen();
  }
}

function pressClear() {
  temporaryNums = '';
  changeScreen('clear');
  numsAndOperations = [];
}

function pressDelete() {
  if (temporaryNums.length === 1) {
    temporaryNums = '';
    changeScreen('clear');
  } else if (temporaryNums.length > 1) {
    temporaryNums = temporaryNums.slice(0, temporaryNums.length - 1);
    changeScreen();
  }
}

function pressDecimal() {
  if (temporaryNums.length === 0) {
    temporaryNums += '0.';
    changeScreen();
  } else {
    temporaryNums += '.';
    changeScreen();
  }
}

function pressEquals() {
  numsAndOperations.push(Number(temporaryNums));
  if (numsAndOperations.length === 0) {
    return;
  } else {
    while (numsAndOperations.length > 1) {
      safeToAddSub = (numsAndOperations.indexOf('x') < 0 && numsAndOperations.indexOf('÷') < 0);
      for (let i = 1; i < numsAndOperations.length; i += 2) {
        let operator = numsAndOperations[i];
        if ((operator === '+' || operator === '-') && !safeToAddSub) continue;
        let num1 = numsAndOperations[i - 1];
        let num2 = numsAndOperations[i + 1];
        if (operator === 'x') {
          oper = operations.multiply;
        } else if (operator === '÷') {
          oper = operations.divide;
        } else if (operator === '+') {
          oper = operations.add;
        } else if (operator === '-') {
          oper = operations.subtract;
        }
        numsAndOperations[i - 1] = oper(num1, num2);
        numsAndOperations.splice(i, 2);
        i -= 2;
      }
    }
    if (screen.textContent !== 'Nah, yo!') {
      changeScreen('answer');
      temporaryNums = '';
      numsAndOperations = [];
    }
  }
}






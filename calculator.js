var numsAndOperations = [];
var temporaryNums = '';
var add = (num1, num2) => num1 + num2;
var sub = (num1, num2) => num1 - num2;
var mul = (num1, num2) => num1 * num2;
var div = (num1, num2) => num1 / num2; 
const operations = {
    '+': add,
    '-': sub,
    'x': mul,
    '*': mul,
    '/': div,
    '÷': div
};


// Turn off default behavior (click) when enter/spacebar is pressed while button has focus
// For some reason, enter is on keydown while spacebar is on keyup
document.querySelectorAll('.calculator button').forEach(function(button) {
    button.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    button.addEventListener('keyup', function(event) {
        if (event.key === ' ' || event.key === 'Spacebar') {
            event.preventDefault();
        }
    });
})

// Add all handlers for numbers, operations, and other buttons
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

// Add key handlers to the whole app
document.addEventListener('keydown', function(event) {
    let keyName = event.key;
    if (keyName.match(/^[0-9]$/)) {
        pressNumber(keyName);
    } 
    else if (keyName.match(/^[-+*/]$/)) {
        pressOperation(keyName);
    }
    else if (keyName === 'Enter' || keyName === '=') {
        pressEquals();
    } 
    else if (keyName === 'Clear' || keyName === 'c' || keyName === 'C' || keyName == 'Escape') {
        pressClear();
    } 
    else if (keyName === 'Backspace' || keyName === 'Delete') {
        pressDelete();
    } 
    else if (keyName === '.') {
        pressDecimal();
    }
});

// Update the display value when needed
function changeScreen(specialInstruction = 'none') {
    //console.trace();
    var screen = document.getElementById('screentext');
    screen.textContent = specialInstruction;
    console.log(screen.textContent, numsAndOperations);
}

// Event handler functions
function pressNumber(number) {
    if (temporaryNums.length < 8) {
        temporaryNums += number;
        changeScreen(temporaryNums);
    }
}

function pressOperation(op) {
    numsAndOperations.push(Number(temporaryNums));
    numsAndOperations.push(operations[op]);
    temporaryNums = '';
    changeScreen(op);
}

function pressNegative() {
    if (temporaryNums.length > 0) {
        temporaryNums = String(-1 * Number(temporaryNums));
        changeScreen(temporaryNums);
    }
}

function pressClear() {
    temporaryNums = '';
    numsAndOperations = [];
    changeScreen('0');
}

function pressDelete() {
    if (temporaryNums.length === 1) {
        temporaryNums = '';
    } 
    else if (temporaryNums.length > 1) {
        temporaryNums = temporaryNums.slice(0, temporaryNums.length - 1);
    }
    changeScreen(temporaryNums);
}

function pressDecimal() {
    if (temporaryNums.indexOf('.') >= 0) return;
    if (temporaryNums.length === 0) {
        temporaryNums += '0.';
    } 
    else {
        temporaryNums += '.';
    }
    changeScreen(temporaryNums);
}

function pressEquals() {
    numsAndOperations.push(Number(temporaryNums));
    if (numsAndOperations.length > 0) {
        while (numsAndOperations.length > 1) {
            let safeToAddSub = (numsAndOperations.indexOf(mul) < 0 && numsAndOperations.indexOf(div) < 0);
            for (let i = 1; i < numsAndOperations.length; i += 2) {
                let operator = numsAndOperations[i];
                if ((operator === add || operator === sub) && !safeToAddSub) continue;
                let num1 = numsAndOperations[i - 1];
                let num2 = numsAndOperations[i + 1];
                if (operator === div && num2 === 0) {
                    changeScreen('DivByZero');
                    return;
                }
                numsAndOperations[i - 1] = operator(num1, num2);
                numsAndOperations.splice(i, 2);
                i -= 2;
            }
        }
        var result = numsAndOperations[0];
        if (String(result).length <= 8) {
            changeScreen(String(result));
        } 
        else {
            changeScreen(result.toExponential(3));
        }
        temporaryNums = '';
        numsAndOperations = [];
    }
}


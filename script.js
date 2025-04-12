let result = 0;
let current = '0';
let expression = '';
let prevType = null;
let prevOp = null;
let isEquals = false;
let prevNumber = null;

const displayResult = document.querySelector('.result');
const displayExpression = document.querySelector('.expression');

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click',buttonType))

function buttonType(btn) {
    const selection = btn.target;
    const buttonType = btn.target.classList.value;

    switch (buttonType) {
        case 'number':
            handleNumber(selection.textContent);
            break;
        case 'operator':
            handleOperator(selection) 
            break;
        case 'special':
            handleSpecial(selection.id)
            break;
        case 'equals':
            handleEquals();
            break;
    }
}

function handleNumber(num) {
    switch (prevType) {
        case null:
            current = num;
            break;
        case 'number':
            current += num;
            break;
        case 'operator':
            current = num;
            break;
    }

    prevType = 'number';
    handleDisplay();
}

function handleOperator(op) {
    switch (prevType) {
        case 'operator':
        case 'equals':
            expression = '';
            break;
        default:

        // If the most recent operator pressed was equals, then we do NOT want to perform the operation again.
        // Otherwise 2x2=[4]+2= will yield 2x2=[4]+[8]2= [10], performing the multiplication a second time, as that is still prevOp.

        // If we have not just pressed equals, then we check if an operator has already been pressed. If so, we calculate it once a new operator is pressed,
        //     as that indicates we are no longer pressing numbers.

        if (prevOp) {
            performOperation();
        } else {
            result = current;
        }
    }
    prevType = 'operator';
    expression += current + op.textContent;
    prevOp = op;
    current = result;
    handleDisplay();
}

function performOperation(num = current) {
    switch (prevOp.id) {
        case 'plus':
            add(result,num);
            break;
        case 'minus':
            subtract(result,num);
            break;
        case 'divide':
            divide(result,num);
            break;
        case 'multiply':
            multiply(result,num);
            break;
    }
}

function handleEquals() {
    if (prevType === 'number') {
        prevNumber = current;
        console.log("test",prevNumber)
    }
    expression = result + prevOp.textContent + prevNumber + "=";
    if (prevOp) {
        performOperation(prevNumber);
    }
    current = result;
    handleDisplay();

    prevType = 'equals';
}

function handleSpecial(sign) {
    switch (sign) {
        case 'clear':
            reset();
            break;
        case 'backspace':
            current = current.substring(0,current.length-1)
            break;
        case 'plusminus':
            current = (+current) * -1;
            break;
        case 'percent':
            current = parseFloat(+current/100);
            break;
        case 'decimal':
            if (!current.includes('.')) { 
                current += '.';
            }
            break;
    }

    handleDisplay();
}

function reset() {
    result = 0;
    expression = '';
    prevType = null;
    prevOp = null;
    current = '0';
    isEquals = false;
}

function handleDisplay() {
    if (current.toString().length > 9) {
        current = current.toExponential();
        const notation = current.toString().split('e')
        console.log(5 - notation[1].substring(1).length)
        const notationSize = 6 - notation[1].substring(1).length;
        current = notation[0].slice(0,notationSize) + 'e' + notation[1]
    }

    displayExpression.textContent = expression;
    displayResult.textContent = current;
}

function add(num1, num2) {
    result = +num1 + +num2;
}

function subtract(num1, num2) {
    result = num1 - num2;
}

function divide(num1, num2) {
    result = num1 / num2;
}

function multiply(num1, num2) {
    result = num1 * num2;
}
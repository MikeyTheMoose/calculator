let result = 0;
let current = '0';
let expression = '';
let prevType = null;
let prevOp = null;
let operation = null;
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
    }
}

function handleNumber(num) {
    switch (prevType) {
        case null:
            prevType = 'number';
            current = num;
            break;
        case 'number':
            current += num;
            break;
        case 'operator':
            prevType = 'operator';
    }

    
    displayResult.textContent = current;
    //handleExpression(num);
    expression += num;

}

function handleOperator(op) {

    // Once a second operator is entered, perform the first operator.
    // Ex: 75 x 10 x -> perform the multiplication, set 'result' equal to value.
    if (prevOp) {
        switch (prevOp) {
            case 'plus':
                add(result,current);
                break;
            case 'minus':
                subtract(result,current);
                break;
            case 'divide':
                divide(result,current);
                break;
            case 'multiply':
                multiply(result,current);
                break;
        }
        
    }

    if (prevOp != 'equals') {
        prevOp = op.id;
        handleExpression(op.textContent);
    }
}

function handleSpecial(sign) {
    console.log('special')
}

function handleExpression(content) {
    expression += content;
    displayExpression.textContent = expression;
    current = ' ';
}

function add(num1, num2) {
    result = num1 + num2;
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
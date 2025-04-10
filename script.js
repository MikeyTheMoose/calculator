let result = '0';
let expression = "0";
let prevType = null;
let operation = null;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

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
        // handleOperator(selection.id);
            break;
        case 'special':
            handleSpecial(selection.id)
            break;
    }
    // result = selection;
    // expression += selection + " ";
    // const displayResult = document.querySelector('.result');
    // const displayExpression = document.querySelector('.expression');
    // displayResult.textContent = result;
    // displayExpression.textContent = expression;
}

function handleNumber(num) {
    switch (prevType) {
        case null:
            prevType = 'number';
            result = num;
            expression = num;
            break;
        case 'number':
            result += num;
            break;
        case 'operator':
            prevType = 'operator';
    }

    const displayResult = document.querySelector('.result');
    displayResult.textContent = result;

}

function handleOperator(op) {
    prevType = 'operator';
    operation = op.id;

    if (op.id === 'equals') {
        
        if (prevType === 'number') {
            handleExpression(op.textContent)
        }
    }
}

function handleSpecial(sign) {
    console.log('special')
}

function handleExpression(content) {
    expression += content;
}
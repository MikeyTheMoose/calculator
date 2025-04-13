let result = 0;
let current = '0';
let expression = '';
let prevType = null;
let prevOp = null;
let isEquals = false;
let prevNumber = null;
let error = false;

const displayResult = document.querySelector('.result');
const displayExpression = document.querySelector('.expression');

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click',buttonType))

// ISSUE: Pressing Enter or = results in an issue if used after clearing. This issue does not appear when 'clicking' the equals button.
// It seems to run handleEquals() twice for some reason.
document.addEventListener("keydown", (event) => {
    const numbersArray = "0123456789";
    if (numbersArray.includes(event.key)) {
        handleNumber(event.key);
    }
    switch (event.key) {
        case '*':
            handleOperator({id:'multiply',textContent:'×'});
            break;
        case '/':
            handleOperator({id:'divide',textContent:'÷'});
            break;
        case '+':
            handleOperator({id:'plus',textContent:'+'});
            break;
        case '-':
            handleOperator({id:'minus',textContent:'-'});
            break;
        case 'Enter':
        case '=':
            handleEquals();
            break;
        case '%':
            handleSpecial('percent');
            break;
        case '.':
            handleSpecial('decimal');
            break;
        case 'Backspace':
            handleSpecial('backspace');
            break;
        case '.':
            handleSpecial('decimal');
            break;
        case '%':
            handleSpecial('percent');
            break;
        case 'Escape':
            handleSpecial('clear');
            break;
    }
})


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

    // After clicking a button, unfocus it. Otherwise pressing the Enter key will perform the equals operation
    //   and then perform the button click action.
    document.activeElement.blur();
}

function handleNumber(num) {
    switch (prevType) {
        case null:
        case 'operator':
            current = num;
            break;
        case 'number':
        case 'decimal':
            current += num;
            break;
        case 'equals':
            reset();
            current = num;
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
    expression += round(current) + op.textContent;
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
    } else if (prevType === 'operator') {return;}
    if (prevOp) {
        expression = round(result) + prevOp.textContent + prevNumber + "=";
        performOperation(prevNumber);

        // Print equation history to console.
        console.log(expression + result);
    } else {result = current}

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
            try { current = current.substring(0,current.length-1)}
            catch (error) {console.warn("You cannot backspace on the result.")}
            break;
        case 'plusminus':
            current = (+current) * -1;
            break;
        case 'percent':
            current = parseFloat(+current/100);
            break;
        case 'decimal':
            if (!current.toString().includes('.')) { 
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
    error = false;
    prevNumber = null;
}

function handleDisplay() {
    if (error) {
        current = result;
    }
    else {
        handleDecimal();
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
    if (num2 == 0) {
        error = true;
        result = "Creating Blackhole"
    } else 
    {result = num1/num2}
}

function multiply(num1, num2) {
    result = num1 * num2;
}

function round(num) {
    return Math.round(num * 10000) / 10000;
}

function handleDecimal() {
    if (current.toString().length > 9) {
        if (+current > 0.0001) {
            current = round(+current)
        } else {
            current = current.toExponential();
            const notation = current.toString().split('e')
            const notationSize = 6 - notation[1].substring(1).length;
            current = notation[0].slice(0,notationSize) + 'e' + notation[1]
        }
    }
}
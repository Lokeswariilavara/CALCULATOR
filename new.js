const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');

let currentInput = '';
let previousInput = '';
let operator = '';

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        // Handle digit or decimal point
        if (!isNaN(value) || value === '.') {
            currentInput += value;
            display.value = currentInput;
        }

        // Handle operator button
        else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (previousInput === '') {
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            } else {
                calculate();
                operator = value;
                previousInput = display.value;
                currentInput = '';
            }
        }
    });
});

// Function to handle "=" button to calculate the result
equalButton.addEventListener('click', () => {
    if (previousInput !== '' && currentInput !== '') {
        calculate();
        operator = '';
        currentInput = '';
        previousInput = '';
    }
});

// Function to calculate the result based on the operator
function calculate() {
    let result;

    switch (operator) {
        case '+':
            result = parseFloat(previousInput) + parseFloat(currentInput);
            break;
        case '-':
            result = parseFloat(previousInput) - parseFloat(currentInput);
            break;
        case '*':
            result = parseFloat(previousInput) * parseFloat(currentInput);
            break;
        case '/':
            result = parseFloat(previousInput) / parseFloat(currentInput);
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = '';
}

// Function to handle "C" button (clear)
clearButton.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
});
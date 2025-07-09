
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const resultDisplay = document.getElementById('result');
const clearButton = document.getElementById('clear');
const operatorButtons = document.querySelectorAll('.operator-btn');

// Function to display messages 
function showMessage(message, type = 'error') {
    resultDisplay.textContent = message;
    resultDisplay.className = `text-4xl font-extrabold break-words ${type === 'error' ? 'text-red-400' : 'text-blue-200'}`;
}

// Add event listeners to operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);

        // Input validation
        if (isNaN(num1) || isNaN(num2)) {
            showMessage('Please enter valid numbers.');
            return;
        }

        let result;
        const operation = button.id; // Get the ID of the clicked button

        try {
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        throw new Error('Cannot divide by zero!');
                    }
                    result = num1 / num2;
                    break;
                case 'power':
                    result = Math.pow(num1, num2);
                    break;
                case 'modulus':
                    if (num2 === 0) {
                        throw new Error('Cannot perform modulus with zero!');
                    }
                    result = num1 % num2;
                    break;
                default:
                    showMessage('Invalid operation.');
                    return;
            }
            // Display the result
            showMessage(result, 'success');
        } catch (error) {
            showMessage(error.message);
        }
    });
});

// Add event listener for the clear button
clearButton.addEventListener('click', () => {
    num1Input.value = '';
    num2Input.value = '';
    resultDisplay.textContent = '';
    resultDisplay.className = 'text-4xl font-extrabold text-blue-200 break-words'; // Reset class
});

// Add fade-in class to the container on load
document.addEventListener('DOMContentLoaded', () => {
    const calculatorContainer = document.getElementById('calculator-container');
    calculatorContainer.classList.add('fade-in-animation');

    // Number button logic
    const numButtons = document.querySelectorAll('.num-btn');
    let lastFocusedInput = num1Input;

    num1Input.addEventListener('focus', () => lastFocusedInput = num1Input);
    num2Input.addEventListener('focus', () => lastFocusedInput = num2Input);

    numButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.textContent.trim();
            // If zero button, handle grid span
            if (btn.classList.contains('zero-btn')) {
                // Only one zero button, value is '0'
            }
            // If neither input is focused, default to num1
            if (document.activeElement !== num1Input && document.activeElement !== num2Input) {
                lastFocusedInput = num1Input;
            }
            // Append number to the input's value
            lastFocusedInput.value = (lastFocusedInput.value || '') + value;
            lastFocusedInput.focus();
        });
    });
}); 
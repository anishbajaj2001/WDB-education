function inputDigit(d) {
    const {display, first, second, isWaiting} = calculator;
    if (!isWaiting) {
        calculator.first = first === null ? d : first + d;
    } else {
        calculator.second = second === null ? d : second + d;
    }
    calculator.display = display === '0' ? d : display + d;
}

function inputOperator(operator) {
    const {first, second} = calculator;
    if (first === null) {
        return;
    }
    if (first != null && second != null) {
        calculator.first = calculate();
        calculator.second = null;
    } else {
        calculator.display = "0";
    }
    calculator.isWaiting = true;
    calculator.op = operator;
}

function calculate() {
    const {first, second, op} = calculator;
    let firstNum = parseInt(first);
    let secondNum = parseInt(second);
    let result = 0;
    switch(op) {
        case "+":
            result = firstNum + secondNum;
            break;
        case "-":
            result = firstNum - secondNum;
            break;
        case "*":
            result = firstNum * secondNum;
            break;
        case "/":
            result = firstNum / secondNum;
            break;
    }
    calculator.display = result.toString();
    return result;
}

function clear() {
    calculator.display = "0";
    calculator.first = null;
    calculator.second = null;
    calculator.op = null;
    isWaiting = false;
}

function deleteText() {
    const {isWaiting, display, first, second} = calculator;
    if (!isWaiting && first == display) {
        calculator.first = first.substring(0, first.length - 1);
        calculator.display = calculator.first;
    } else if (second == display) {
        calculator.second = second.substring(0, second.length - 1);
        calculator.display = second.first;
    }
}

const calculator = {
    display: '0',
    first: null,
    second: null,
    op: null,
    isWaiting: false,
}

const keys = document.querySelector('.calc-rows');

keys.addEventListener("click", event => {
    const {target} = event;
    let input = target.innerHTML;

    switch (input) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
        inputOperator(input);
        break;
    case "clear":
        clear();
        break;
    case "←":
        deleteText();
        break;
    default:
        inputDigit(input);
    }
    const display = document.querySelector('.result-screen');
    display.innerHTML = calculator.display;
});
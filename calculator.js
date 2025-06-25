function add(addend1, addend2)
{
    return addend1 + addend2
}

function subtract(minuend, subtrahend)
{
    return minuend - subtrahend
}

function multiply(multiplicand, multiplier)
{
    return multiplicand * multiplier
}

function divide(dividend, divisor)
{
    if (divisor === 0)
    {
        alert("Cannot divide by zero");
        return dividend;
    }
    return dividend / divisor
}

function operate(firstOperand, secondOperand, operator)
{
    switch (operator)
    {
        case ADDITION_SYMBOL: return add(firstOperand, secondOperand);
        case SUBTRACTION_SYMBOL: return subtract(firstOperand, secondOperand);
        case MULTIPLICATION_SYMBOL: return multiply(firstOperand, secondOperand);
        case DIVISION_SYMBOL: return divide(firstOperand, secondOperand);
    }
}

const ADDITION_SYMBOL = "+"
const SUBTRACTION_SYMBOL = "-"
const MULTIPLICATION_SYMBOL = "x"
const DIVISION_SYMBOL = "%"

function setupNumberPadButtons()
{
    document.querySelectorAll(".button-row > .button.number").forEach(button =>{
        button.addEventListener("click", (event) => {
            if (lastClickWasOperator)
            {
                setDisplayText("")
            }
            var numberValue = button.textContent
            appendValueToDisplay(numberValue)
            if (inputNumber == null)
            {
                inputNumber = Number(numberValue)
            }
            else 
            {
                inputNumber = Number(String(inputNumber + numberValue))
            }
            lastClickWasOperator = false
        })
    })
}

function appendValueToDisplay(numberValue)
{
    displayText = displayText + numberValue;
    updateDisplay();
}

function updateDisplay()
{
    document.querySelector(".calculator > .display").textContent = displayText;
}

function setDisplayText(text)
{
    displayText = text;
    updateDisplay();
}

var displayText = ""
var inputNumber = null

var lastClickWasOperator = false

var result = null
var operator = null

const DECIMAL_PLACES_TO_DISPLAY = 7

function setupOperationPadButtons()
{
    setupOperatorButtons()
    setupCalculatorActionButtons()
}

function setupOperatorButtons()
{
    document.querySelectorAll(".operation-pad > .button.operator")
        .forEach((operatorButton) => {
            operatorButton.addEventListener("click", (event) => {
                if (result == null)
                {
                    result = inputNumber
                    inputNumber = null
                    operator = operatorButton.id
                    lastClickWasOperator = true
                }
                else if (lastClickWasOperator)
                {
                    operator = operatorButton.id
                }
                else // !lastClickWasOperator && result != null
                {
                    result = operate(
                        result,
                        inputNumber,
                        mapOperationToSymbol(operator)
                    );
                    var displayResult = result % 1 != 0 ? result.toFixed(DECIMAL_PLACES_TO_DISPLAY) : result
                    setDisplayText(displayResult);

                    inputNumber = null;
                    
                    // setting the operator for the next operation
                    operator = operatorButton.id;

                    lastClickWasOperator = true;
                }
            });
        });
}

function mapOperationToSymbol(operation)
{
    switch (operation)
    {
        case "addition":
            return ADDITION_SYMBOL;
            break;
        case "subtraction":
            return SUBTRACTION_SYMBOL;
            break;
        case "multiplication":
            return MULTIPLICATION_SYMBOL;
            break;
        case "division":
            return DIVISION_SYMBOL;
            break;
    }
}

function setupCalculatorActionButtons() {
    document.querySelectorAll(".operation-pad > .button.calculator-action")
        .forEach((actionButton) => {
            switch(actionButton.id)
            {
                case "clear":
                    actionButton.addEventListener("click", (event) => {
                        setDisplayText("");
                        inputNumber = null;
                        result = null;
                        operator = null;
                        lastClickWasOperator = false;
                    });
                    break;
                case "equals":
                    actionButton.addEventListener("click", (event) => {
                        if (result != null 
                            && operator != null 
                            && inputNumber != null)
                        {
                            result = operate(
                                result,
                                inputNumber,
                                mapOperationToSymbol(operator)
                            );
                            var displayResult = result % 1 != 0 ? result.toFixed(DECIMAL_PLACES_TO_DISPLAY) : result
                            setDisplayText(displayResult);
                            
                            inputNumber = null;

                            operator = null;
                            lastClickWasOperator = true;
                        }
                    });
                    break;
            }
        });
}

setupNumberPadButtons()
setupOperationPadButtons()

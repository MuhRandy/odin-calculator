const numberButtonPanel = document.querySelector(".number");
const operatorButtonPanel = document.querySelector(".operator");
const screenPanel = document.querySelector(".screen-panel");
const operator = ["+", "-", "*", "/", "=", "del", "c"];

clearInput();

generateNumberButtons();

generateOperatorButtons();

function generateOperatorButtons() {
  operator.forEach((i) => {
    const button = document.createElement("button");
    button.textContent = i;
    switch (i) {
      case "+":
        button.addEventListener("click", () => {
          inputOperator("+");
        });
        break;
      case "-":
        button.addEventListener("click", () => {
          inputOperator("-");
        });
        break;
      case "*":
        button.addEventListener("click", () => {
          inputOperator("*");
        });
        break;
      case "/":
        button.addEventListener("click", () => {
          inputOperator("/");
        });
        break;
      case "=":
        button.addEventListener("click", getResult);
        break;
      case "del":
        button.addEventListener("click", deleteLastInput);
        break;
      case "c":
        button.addEventListener("click", clearInput);
        break;

      default:
        break;
    }

    operatorButtonPanel.appendChild(button);
  });
}

function generateNumberButtons() {
  for (let i = 0; i < 10; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      inputNumber(i);
    });

    numberButtonPanel.appendChild(button);
  }
}

function clearInput() {
  screenPanel.value = 0;
}

function getResult() {
  if (operator.includes(screenPanel.value.at(-1))) return;

  const input = screenPanel.value;
  const number = input.split(/[*+/-]/).map((i) => +i);
  const operatorInput = input.split("").filter((i) => operator.includes(i));
  const operators = ["+", "-", "/", "*"];

  while (operatorInput.length > 0) {
    const lastOperators = operators.pop();
    let operatorIndex = operatorInput.findIndex((i) => i === lastOperators);

    while (operatorIndex !== -1) {
      const currentOperator = operatorInput.splice(operatorIndex, 1)[0];
      const nums = number.splice(operatorIndex, 2);
      const result = operate(...nums, currentOperator);

      number.splice(operatorIndex, 0, result);

      operatorIndex = operatorInput.findIndex((i) => i === lastOperators);
    }
  }

  screenPanel.value = number[0];
}

function deleteLastInput() {
  const content = [...screenPanel.value];
  content.splice(-1, 1);

  screenPanel.value = content.join("");
}

function inputOperator(operatorStr) {
  const lastInput = screenPanel.value[screenPanel.value.length - 1];

  if (
    operator.includes(lastInput) ||
    (+screenPanel.value[0] === 0 && operatorStr === "-")
  )
    deleteLastInput();
  screenPanel.value += operatorStr;
}

function inputNumber(num) {
  if (+screenPanel.value === 0 && screenPanel.value.length === 1)
    deleteLastInput();

  if (
    screenPanel.value.at(-1) == 0 &&
    operator.includes(screenPanel.value.at(-2))
  )
    deleteLastInput();

  screenPanel.value += num;
}

function add(numA, numB) {
  return numA + numB;
}

function substract(numA, numB) {
  return numA - numB;
}

function multiply(numA, numB) {
  return numA * numB;
}

function divide(numA, numB) {
  return numA / numB;
}

function operate(numA, numB, operator) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(numA, numB);
      break;
    case "-":
      result = substract(numA, numB);
      break;
    case "*":
      result = multiply(numA, numB);
      break;
    case "/":
      result = divide(numA, numB);
      break;

    default:
      break;
  }

  return result;
}

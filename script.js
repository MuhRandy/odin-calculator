const numberButtonPanel = document.querySelector(".number");
const operatorButtonPanel = document.querySelector(".operator");
const screenPanel = document.querySelector(".screen-panel");

for (let i = 0; i < 10; i++) {
  const button = document.createElement("button");
  button.textContent = i;
  button.addEventListener("click", () => {
    screenPanel.textContent += i;
  });

  numberButtonPanel.appendChild(button);
}

const operator = ["+", "-", "*", "/", "=", "del"];

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
      button.id = "result";
      break;
    case "del":
      button.addEventListener("click", deleteLastInput);
      break;

    default:
      break;
  }

  operatorButtonPanel.appendChild(button);
});

function deleteLastInput() {
  const content = [...screenPanel.textContent];
  content.splice(-1, 1);

  screenPanel.textContent = content.join("");
}

function inputOperator(operatorStr) {
  const lastInput = screenPanel.textContent[screenPanel.textContent.length - 1];

  if (operator.includes(lastInput)) deleteLastInput();
  screenPanel.textContent += operatorStr;
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
  switch (operator) {
    case "+":
      add(numA, numB);
      break;
    case "-":
      substract(numA, numB);
      break;
    case "*":
      multiply(numA, numB);
      break;
    case "/":
      divide(numA, numB);
      break;

    default:
      break;
  }
}

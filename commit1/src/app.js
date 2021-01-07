const numberOneInput = document.getElementById("numberOne");
const numberTwoInput = document.getElementById("numberTwo");
const addValuesButton = document.getElementById("addValues");
const resultDiv = document.getElementById("result");
const errorBox = document.getElementById("error");

// Rest Parameter creates an Array
const parseInputs = (...input) => input.map(str => parseInt(str));

// every() tested each item with the callback if all pass returns true

// isNaN() checks if the value NaN is. Alternatively Number.isNaN(). You can not proof NaN with the equality operator (== ===) NaN === NaN returns false.
const inputsAreValid = (...input) => input.every(num => typeof num === "number" && !isNaN(num));

const handleAdditionError = (inputs, numbers) => {
  const fullMessage = inputs.reduce((message, str, index) => {
    if (inputsAreValid(numbers[index])) {
      return message + "";
    } else {
      return message + `${str} is not a number. `;
    }
  }, "Please enter two valid numbers! ");

  errorBox.classList.remove("invisible");
  errorBox.innerText = fullMessage;
};

const hideErrors = () => {
  errorBox.classList.add("invisible");
};

hideErrors();
addValuesButton.addEventListener("click", () => {
  hideErrors();
  console.log(numberOneInput.value);
  const inputs = [numberOneInput.value, numberTwoInput.value];
  const parsedInputs = parseInputs(...inputs);
  if (inputsAreValid(...parsedInputs)) {
    const [numA, numB] = parsedInputs;
    resultDiv.innerText = numA + numB + "";
  } else {
    resultDiv.innerText = "";
    handleAdditionError(inputs, parseInputs);
  }
})

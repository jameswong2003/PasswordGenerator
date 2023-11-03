import { generatePassword, shuffleString, savePassword, updateDisplay } from "./functions.js";

// Event listener to generate new password
const passwordForm = document.getElementById("passwordForm");
let generatedPassword = "";

// Display the password List
updateDisplay();

passwordForm.addEventListener("submit", e => {
    e.preventDefault();

    let passwordLength = document.getElementById("passwordLength").value;
    let numOfNums = document.getElementById("numOfNums").value;
    let numSpecialChar = document.getElementById("numSpecialChar").value;
    let needLowerCase = document.getElementById("needLowerCase").checked;
    let needUpperCase = document.getElementById("needUpperCase").checked;

    const generatedChars = generatePassword(passwordLength, numOfNums, numSpecialChar, needLowerCase, needUpperCase);
    generatedPassword = shuffleString(generatedChars);

    document.getElementById("generatedPassword").innerHTML = generatedPassword;
})

document.getElementById("savePassword").addEventListener("click", function() {
    savePassword();
})

import { generatePassword, shuffleString, savePassword } from "./functions.js";

// Event listener to generate new password
const passwordForm = document.getElementById("passwordForm");
let generatedPassword = "";

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

document.addEventListener("DOMContentLoaded", function () {
    var saveButton = document.getElementById("savePassword");
    saveButton.addEventListener("click", savePassword);
})
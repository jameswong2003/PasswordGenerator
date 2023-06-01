const MIN_LENGTH = 5;
const MAX_LENGTH = 20;

// Event listener to generate new password
const passwordForm = document.getElementById("passwordForm");
passwordForm.addEventListener("submit", e => {
    e.preventDefault();

    let passwordLength = document.getElementById("passwordLength").value;
    let numOfNums = document.getElementById("numOfNums").value;
    let numSpecialChar = document.getElementById("numSpecialChar").value;
    let needLowerCase = document.getElementById("needLowerCase").checked;
    let needUpperCase = document.getElementById("needUpperCase").checked;

    const generatedChars = generatePassword(passwordLength, numOfNums, numSpecialChar, needLowerCase, needUpperCase);
    const generatedPassword = shuffleString(generatedChars);

    document.getElementById("generatedPassword").innerHTML = generatedPassword;
    savePassword(generatedPassword);
})

// Automatically import passwords from saved console
const savedPasswords = chrome.storage.local.get(["passwords"]).then((results) => {
    const savedPasswordDiv = document.querySelector(".savedPasswords");

    if (results.passwords && Array.isArray(results.passwords)) {
        for (var i = 0; i < results.passwords.length; i++) {
            const passwordItem = document.createElement("div");
            passwordItem.textContent = results.passwords[i];
            savedPasswordDiv.appendChild(passwordItem);
        }
    }
})

function generatePassword(passwordLength, numOfNums, numSpecialChar, needLowerCase, needUpperCase) {
    let generatedPassword = "";

    if (passwordLength < MIN_LENGTH || passwordLength > MAX_LENGTH || numOfNums > passwordLength || numSpecialChar > passwordLength) {
        alert("Invalid Inputs");
        return;
    } else { 
        //valid password proceed to generating it
        for (var i = 0; i < passwordLength; i++) {
            var charToAdd = "";
            if (numOfNums > 0) {
                charToAdd = generateNum();
                numOfNums -= 1;
            } else if (numSpecialChar > 0) {
                charToAdd = generateSpecialChar();
                numSpecialChar -= 1;
            } else {
                charToAdd = generateLetter();
                if (needLowerCase) {
                    charToAdd = charToAdd.toLowerCase();
                    needLowerCase = !needLowerCase;
                } else if (needUpperCase) {
                    charToAdd = charToAdd.toUpperCase();
                    needUpperCase = !needUpperCase;
                } else {
                    // random between lower and uppercase
                    if (Math.random() > 0.5) {
                        charToAdd = charToAdd.toLowerCase();
                    } else {
                        charToAdd = charToAdd.toUpperCase();
                    }
                }
            }

            generatedPassword += charToAdd;
        }
    }

    return generatedPassword;
}

/**
 * Generates random int from 0-9
 * @returns Random int from 0-9
 */
function generateNum() {
    return Math.floor(Math.random() * 10);
}

/**
 * Generates random special char
 * @returns Random char from specialChars
 */
function generateSpecialChar() {
    const specialChars = "`~!@#$%^&*()_-+={}[],./<>?"; // add more special characters later
    const index = Math.floor(Math.random() * specialChars.length);

    return specialChars[index];
}

/**
 * Generate random letter from the alphabet
 * @returns Random letter from alphabet
 */
function generateLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const index = Math.floor(Math.random() * alphabet.length);

    return alphabet[index];
}

/**
 * Shuffles the string randomly
 * @param {*} s 
 * @returns 
 */
function shuffleString(s) {
    var str = s.split("");
    var len = s.length;

    for (var i = len - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (len + 1));
        var tmp = s[i];
        str[i] = str[j]
        str[j] = tmp;
    }

    return str.join("");
}

function savePassword(password) {
    chrome.storage.local.get(["passwords"], function(results) {
        var passwords = results.passwords || []; // Retrive existing passwords or initialize a new array

        passwords.push(password);

        chrome.storage.local.set({passwords: passwords}, function() {
            console.log("Passwored saved to local storage");
        })
    })
}
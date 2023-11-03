const MIN_LENGTH = 5;
const MAX_LENGTH = 20;


/**
 * Generates a string of randomized characters for passwords
 * @param {*} passwordLength 
 * @param {*} numOfNums 
 * @param {*} numSpecialChar 
 * @param {*} needLowerCase 
 * @param {*} needUpperCase 
 * @returns 
 */
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

/**
 * Saves passwords to chrome local storage
 */
function savePassword() {
    const newPassword = document.getElementById("generatedPassword").innerHTML;

    chrome.storage.local.get(["passwords"], function (results) {
        var existingPasswords = results.passwords || []; // Retrieve existing passwords or initialize a new array
        existingPasswords.push(newPassword);
        chrome.storage.local.set({ passwords: existingPasswords }, function () {
            console.log("Updated passwords", existingPasswords);
        });

        updateDisplay();
    });
}


/**
 * Updates the password display
 */
function updateDisplay() {
    const savedPasswordContainer = document.getElementById("savedPasswords");

    // Clear the saved passwords
    savedPasswordContainer.innerHTML = "";

    // Retrieve the passwords from chrome.storage.local using a callback
    chrome.storage.local.get(["passwords"], function (results) {
        const passwords = results.passwords || [];

        // Loop through the passwords and add them to the display
        for (let i = 0; i < passwords.length; i++) {
            const password = passwords[i];
            const passwordElement = document.createElement("p");
            passwordElement.textContent = password;
            savedPasswordContainer.appendChild(passwordElement);
        }
    });
}



/**
 * Clears the database
 */
function clear_database() {
    chrome.storage.local.clear();
}


export {generatePassword, shuffleString, savePassword, updateDisplay, clear_database}

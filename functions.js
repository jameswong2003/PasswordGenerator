const MIN_LENGTH = 5;
const MAX_LENGTH = 20;
// checking


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

    if (passwordLength < MIN_LENGTH || passwordLength > MAX_LENGTH || (numOfNums + numSpecialChar) > passwordLength) {
        alert("Invalid Inputs");
        console.log(passwordLength, numOfNums, numSpecialChar);
        return;
    } else { 
        //valid password proceed to generating it
        for (var i = 0; i < passwordLength; i++) {
            var charToAdd = "";
            // Add numbers first
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

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        chrome.storage.local.get(["passwords"], function (results) {
            let existingPasswords = results.passwords || []; // Retrieve existing passwords or initialize a new array
            existingPasswords.push([url, newPassword]);

            chrome.storage.local.set({ passwords: existingPasswords }, function () {
                console.log("Updated passwords", existingPasswords);
            });
    
            updateDisplay();
        });
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
            const url = passwords[i][0];
            const password = passwords[i][1];

            const row = savedPasswordContainer.insertRow(-1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.innerHTML = url;
            cell2.innerHTML = password;


            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() {
                deleteRow(url, row);
            };

            cell3.appendChild(deleteButton)
        }
    });
}

function deleteRow(url, row) {
    chrome.storage.local.get(["passwords"], function (results) {
      const passwords = results.passwords || [];
  
      // Find the index of the password to delete
      const indexToDelete = passwords.findIndex((entry) => entry[0] === url);
  
      if (indexToDelete !== -1) {
        passwords.splice(indexToDelete, 1);
  
        // Save the updated passwords back to chrome.storage.local
        chrome.storage.local.set({ passwords: passwords }, function () {
          // Remove the row from the table
          row.remove();
        });
      }
    });
  }

export {generatePassword, shuffleString, savePassword, updateDisplay}

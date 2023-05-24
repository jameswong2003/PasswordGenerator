const MIN_LENGTH = 5;
const MAX_LENGTH = 20;

function generatePassword() {
    let passwordLength = 5;
    let numOfNums = 1;
    let numSpecialChar = 1;
    let needLowerCase = true;
    let needUpperCase = true;

    let generatedPassword = "";
    if (passwordLength < MIN_LENGTH || passwordLength > MAX_LENGTH) {
        alert("Password Length is invalid");
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

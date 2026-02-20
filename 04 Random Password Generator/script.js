const passwordBox = document.getElementById("password");
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const number = "0123456789"
const symbol = "!@#$%^&*"
const allChar = upperCase + lowerCase + number + symbol

function createPass(){
    let password = ""
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while (length > password.length){
        password += allChar[Math.floor(Math.random() * allChar.length)];
        passwordBox.value = password
    }
}


function copyPass(){
    // passwordBox.Select();
    // document.execCommand("copy");

    navigator.clipboard.writeText(passwordBox.value)
        .then(() => {
            alert("Password copied!");
        })
        .catch(() => {
            alert("Failed to copy");
        });
}



// const hi = password

// console.log(hi)


// getElementByClass("btn").




// Getting elements from index.html //

const formArea = document.getElementById('form');
const successArea = document.getElementById('success');
const errorArea = document.getElementById('error');

const cvcNumber = document.getElementById('credit-card-cvs-number');
const cardNumber = document.getElementById('credit-card-number');
const cardName = document.getElementById('credit-card-name');
const cardExpire = document.getElementById('credit-card-expire');

const inputName = document.getElementById('name');
const inputNumber = document.getElementById('number');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year')
const inputCVC = document.getElementById('cvc');

const outputError = document.getElementById('feedback');
const outputAdvice = document.getElementById('advice');

const buttonConfirm = document.getElementById('confirm');
const buttonContinue = document.getElementById('continue');
const buttonClose = document.getElementById('close');

// Defining some regex for plausibilisation //
let regexSpecChar= /[\!\"\§\$\%\&\/\(\)\=\?\<\>\+\*\[\]\,\@]/;
let regexNum = /[0-9]/ 
let regexLetters = /[a-zA-Z]/;

// Function calls //
buttonConfirm.onclick = inputCheck;
buttonClose.onclick = returnToForm;
buttonContinue.onclick = returnToEmptyForm;


// Function definition //

function inputCheck() {

    let nameCheckResult = nameCheck(inputName.value);
    if (nameCheckResult) {
        outputError.innerHTML = "your Name";
        outputAdvice.innerHTML = nameCheckResult;
        errorArea.style.display = 'block';
        return;
    }

    let numberCheckResult = numberCheck(inputNumber.value)
    if (numberCheckResult) {
        outputError.innerHTML = "your card number"
        outputAdvice.innerHTML = numberCheckResult;
        errorArea.style.display = 'block';
        return;
    }

    let dateCheckResult = dateCheck(inputMonth.value, inputYear.value)
    if (dateCheckResult) {
        outputError.innerHTML = "the expire date"
        outputAdvice.innerHTML = dateCheckResult;
        errorArea.style.display = 'block';
        return;
    }

    let cvcCheckResult = cvcCheck(inputCVC.value)
    if (cvcCheckResult) {
        outputError.innerHTML = "the CVC"
        outputAdvice.innerHTML = cvcCheckResult;
        errorArea.style.display = 'block';
        return;
    }

    printToCard()
    formArea.style.display = 'none';
    successArea.style.display = 'block';
}
 
function numberCheck(code) {

    if (code.length === 0) {
        return 'Please enter your complete card number.'
    }
    
    if (regexSpecChar.test(code) || regexLetters.test(code)) { 
        return 'Onyl numbers allowed. Please remove all special characters and letters.'
    }
    
    if (!luhneCheck(code)) {
        return 'The number is implausbible. Please check your number and try again.'
    }
    return false;
}

function luhneCheck(code) {

    code.split(' ').join('') // entfernt alle Leerzeichen;
    if (Number.isNaN(code)) return '';
    let len = code.length;
    let parity = len % 2; // parity = 0 --> even; parity = 1 --> uneven
    let sum = 0;
    for (let i = len-1; i >= 0; i--)
	{
        let d = parseInt(code.charAt(i));
        if (i % 2 == parity) { d *= 2 }
        if (d > 9) { d -= 9 }
        sum += d;
    }
    return sum % 10 === 0 ? true : false;
}

function nameCheck(name) {
    console.log(name)
    if (regexSpecChar.test(name) || regexNum.test(name)) {
        return 'Onyl letters allowed. Please remove all special characters and numbers.'
    }

    let space = name.indexOf(' ')
    if (space <= 2 && name.length <= 4) {
        return 'Please enter complete name as listed on the card.'
    }
    return false;

}

function dateCheck(month, year) {

    if (month.length != 2  || 
        year.length  != 2  || 
        regexLetters.test(month) ||
        regexSpecChar.test(month) ||
        regexLetters.test(year) ||
        regexSpecChar.test(year) ) {
        return 'Please enter the expire date in the appropriate format.';
    }

    if (parseInt(month) < 1 || parseInt(month) > 12) {
        return 'Month musst be a number between 1 and 12.'
    }

    if (parseInt(year) < 22) {
        return 'Your card has expired.'
    }
    return false;


}

function cvcCheck(str) {
    if (str.length != 3) {
        return 'Please enter your complete CVC. It musst be three digits.'
    }
    return false
}

function returnToForm() {
    console.log('returnToForm is invoked')
    errorArea.style.display = 'none';
    successArea.style.display = 'none';
    formArea.style.display = 'block';
}

function returnToEmptyForm() {
    inputName.value = '';
    inputNumber.value = '';
    inputMonth.value = '';
    inputYear.value = '';
    inputCVC.value = '';
    returnToForm();
}

function printToCard() {
    cardName.innerHTML = inputName.value;
    cardExpire.innerHTML = inputMonth.value + "/" + inputYear.value;
    cardNumber.innerHTML = inputNumber.value;
    cvcNumber.innerHTML = inputCVC.value;
}


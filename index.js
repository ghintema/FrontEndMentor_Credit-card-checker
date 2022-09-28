// Getting elements from index.html //

const formArea = document.getElementById('form');
const successArea = document.getElementById('success');
const errorArea = document.getElementById('error');

const cvsNumber = document.getElementById('credit-card-cvs-number');
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

let everythingOk = true;



function inputCheck() {

    nameCheck(inputName.value);
    luhneCheck(inputNumber.value);
    monthCheck(inputMonth.value);
    yearCheck(inputYear.value);
    cvcCheck(inputCVC.value);
 



    if (everythingOk) {
        formArea.style.display = 'none';
        successArea.style.display = 'block';
    }
}



function luhneCheck(code) {

    code.split(' ').join('') // entfernt alle Leerzeichen;
    if (Number.isNaN(code)) return '';
    let len = code.length;
    let parity = len % 2;
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
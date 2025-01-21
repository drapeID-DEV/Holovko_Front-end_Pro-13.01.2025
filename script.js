let username = prompt("Enter your name: ");
if (username == '') {
    alert("Name can't be empty, reload the page, please.");
}
else {
    alert("Hello, " + username + "! How are you?");
}

///////////
alert("Math operations script");

let num1 = +prompt("Please input the 1-st number: ");

let num2 = +prompt("Please input the 2-nd number: ");

alert("Addition result: " + (num1 + num2));
alert("Subtraction result: " + (num1 - num2));
alert("Multiplication result: " + (num1 * num2));
alert("Division result: " + (num1 / num2));

///////////
alert("Numbers comparison");

let num12 = +prompt("Please input the 1-st number: ");

let num22 = +prompt("Please input the 2-nd number: ");

if (num12 == num22) alert(true);
else alert(false);

///////////
alert("Arithmetic mean");

let num13 = +prompt("Please input the 1-st number: ");

let num23 = +prompt("Please input the 2-nd number: ");

let num33 = +prompt("Please input the 3-d number: ");

alert("Arithmetic mean of 3 numbers you have entered is: " + ((num13 + num23 + num33) / 3));

///////////
alert("5-digits output");

let number = +prompt("Input 5-digits number:");
let digits = "";

while (number > 0) {
    let digit = number % 10;
    alert(digit)
    digits = digit + " " + digits;
    alert(digits)
    number = (number - digit) / 10;
}

alert(digits.trim());
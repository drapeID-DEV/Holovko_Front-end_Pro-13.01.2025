alert("Numbers comparison");

let num1 = +prompt("Please input the 1-st number: ");

let num2 = +prompt("Please input the 2-nd number: ");

if (num1 > num2){
    alert("First number is greater than the second")
}
else{
    alert("Second number is greater than the first")
}

///////////

alert("Distance comparison");

let distance1 = +prompt("Please input the distance in km: ");

let distance2 = +prompt("Please input the distance in ft: ");

if (distance1 * 1000 > distance2 * 0.305){
    alert("Distance in ft is less than distance in km")
}
else{
    alert("Distance in km is less than distance in ft")
}

///////////

alert("Divisor");

let a = +prompt("Please input the 1-st number: ");

let b = +prompt("Please input the 2-nd number: ");

if (a % b == 0){
    alert("Number b is divisor for number a")
}
else{
    alert("Number b is not divisor for number a")
}

if (b % a == 0){
    alert("Number a is divisor for number b")
}
else{
    alert("Number a is not divisor for number b")
}

///////////

alert("The last digit")

let num = +prompt("Please input the number: ");
let digit = num % 10;

alert("The last digit: " + digit);

if (digit % 2 == 0){
    alert("The last digit is even");
}
else{
    alert("The last digit is odd");
}

///////////

alert("Digit comparison")

let num3 = prompt("Please input the 2-digit number: ");
if (num3[0] > num3[1]) {
    alert("The first digit is greater than second");
}
else {
    alert("The second digit is greater than first");
}

///////////

alert("3-digit number")

let num4 = prompt("Please input the 3-digit number: ");
let digitSum = +num4[0] + +num4[1] + +num4[2];

if (digitSum % 2 == 0) {
    alert("The sum of digits is even");
}
else{
    alert("The sum of digits is odd");
}

if (digitSum % 5 == 0) {
    alert("The sum of digits is a multiple of 5");
}
else{
    alert("The sum of digits is not a multiple of 5");
}

if (num4[0] * num4[1] * num4[2] > 100) {
    alert("The product of digits is greater than 100")
}
else {
    alert("The product of digits is less than 100")
}

///////////

alert("3-digit number")

let num5 = prompt("Please input the 3-digit number: ");

if (num5[0] == num5[1] && num5[2] == num5[0]) {
    alert("All digits are equal")
}
else {
    alert("Digits are not equal")
}

if (num5[0] == num5[1] || num5[2] == num5[0] || num5[2] == num5[1]) {
    alert("The number has equal digits")
}
else {
    alert("The number doesn't have equal digits")
}
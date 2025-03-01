
// function sumPrev() {
//   let result = 0;
//   return function (num) {
//     result += num;
//     return result;
//   };
// }

// let add = sumPrev();

// console.log(add(2));
// console.log(add(3));

//////

let testArr = ["123", 24, "name", 12, 0, 2, "qwerty", NaN, Infinity]

function arithmeticMean(arr) {
  let sum = 0;
  let counter = 0;

  for(let i = 0; i < arr.length; i++) {
    if(typeof arr[i] === 'number' && isFinite(arr[i])) {
      sum += arr[i]
      counter++;
    }
  }

  return sum / counter;
}

console.log(arithmeticMean(testArr));

////////////

// function doMath(x, znak, y) {
//   switch(znak){
//     case '+':
//       return x + y;
//     case '-':
//       return x - y;
//     case '*':
//       return x * y;
//     case '/':
//       return x / y;
//     case '%':
//       return x % y;
//     default:
//       console.log("Invalid data");
//       return false;
//   }
// }

// console.log(doMath(4, "*", 5));

// /////////

// function setArray() {
//   let arr = [];

//   let exLength;
//   do {
//     exLength = prompt("Please input the length of external array:: ");
//   } while (exLength === null || exLength.trim() === "" || isNaN(exLength))

//   let inLength;
//   do {
//     inLength = prompt("Please input the length of internal array: ");
//   } while (inLength === null || inLength.trim() === "" || isNaN(inLength))

//   for(let i = 0; i < +exLength; i++) {
//     arr[i] = [];
//     for(let j = 0; j < +inLength; j++) {
//       arr[i][j] = prompt(`Please input [${i}][${j}] element of array: `)
//     }
//   }

//   return arr;
// }

// let array = setArray();

// console.log(array);

// /////////////

// function removeSymbols(str, symb) {
//   let result = "";
//   for (let i = 0; i < str.length; i++) {
//     if (!symb.includes(str[i])) {
//       result += str[i];
//     }
//   }
//   return result;
// }

// console.log(removeSymbols("hello world", ['l', 'd']))
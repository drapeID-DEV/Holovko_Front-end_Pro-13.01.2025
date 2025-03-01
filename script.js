// let result = 0;

// function sumPrev(num) {
//   result += num;
//   return result;
// }

// console.log(result)
// console.log(sumPrev(2))
// console.log(sumPrev(3))

// ////////

// let testArr = ["123", 24, "name", 12, 0, 2, "qwerty"]

// function arithmeticMean(arr) {
//   let sum = 0;

//   for(let i = 0; i < arr.length; i++) {
//     if(typeof arr[i] === 'number') {
//       sum += arr[i]
//     }
//   }

//   return sum / arr.length;
// }

// console.log(arithmeticMean(testArr));

// ////////////

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

///////////

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

/////////////

function removeSymbols(str, symb) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (symb.indexOf(str[i]) === -1) {
      result += str[i];
    }
  }
  return result;
}

console.log(removeSymbols("hello world", ['l', 'd']))
let arrLength;
let arr = [];

do {
    arrLength = prompt("Please input the array length: ")
} while (arrLength.trim() === "" || isNaN(arrLength))

for (let i = 0; i < arrLength; i++) {
    let element;

    do {
        element = prompt(`Please input ${i + 1} element: `);
    } while (element.trim() === "" || isNaN(element))

    arr.push(element);
}

alert(`The array we get: ${arr}`);

alert(`Sorted array: ${arr.sort((a, b) => a - b)}`)

arr.splice(1, 4);
alert(`Array after deleting items 2-4: ${arr}`);

//////////

let arr1 = [16,-37,54,-4,72,-56,47,4,-16,25,-37,46,4,-51,27,-63,4,-54,76,-4,12,-35,4,47];

let positiveArr = arr1.filter(num => num > 0);
let sum = positiveArr.reduce((accumulator, num) => accumulator + num);

alert(`Sum of positive elements: ${sum} \nAmount of positive elements: ${positiveArr.length}`)

///////////////

let minElement = arr1[0];
let indexOfElem = 0;

for (let i = 0; i < arr1.length - 1; i++) {
    if (arr1[i] < minElement) {
        minElement = arr1[i];
        indexOfElem = i;
    }
}

alert(`Min element: ${minElement} \nIndex of this element: ${indexOfElem}`)

/////////////

let maxElement = arr1[0];
indexOfElem = 0;

for (let i = 0; i < arr1.length - 1; i++) {
    if (arr1[i] > maxElement) {
        maxElement = arr1[i];
        indexOfElem = i;
    }
}

alert(`Max element: ${maxElement} \nIndex of this element: ${indexOfElem}`)

/////////////

let negativeArr = arr1.filter((num) => num > 0);
alert(`Amount of negative elements: ${negativeArr.length}`);

/////////////

let oddArr = arr1.filter((num) => num > 0 && num % 2 != 0);
alert(`Amount of positive odd elements: ${oddArr.length}`);

/////////////

let evenArr = arr1.filter((num) => num > 0 && num % 2 == 0);
alert(`Amount of positive even elements: ${evenArr.length}`);

/////////////

alert(`Sum of positive even elements: ${evenArr.reduce((accumulator, num) => accumulator + num)}`);

/////////////

alert(`Sum of positive odd elements: ${oddArr.reduce((accumulator, num) => accumulator + num)}`);

/////////////

alert(`Multyplication of positive elements: ${positiveArr.reduce((accumulator, num) => accumulator * num)}`);

////////////

alert(arr1.map(num => (num != maxElement ? 0 : num)));
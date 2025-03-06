const fruits = ["kiwi", "apple", "kiwi", "orange", "kiwi", "apple"];

function fruitAmount(fruitName) {
    return fruits.filter(fruit => fruit === fruitName).length;
}

console.log(fruitAmount("kiwi"));

/////////////

function uniqueFruits(arr) {
    const newArray = [];
    for(const item of arr) {
        if(!uniqueFruits[item]) {
            uniqueFruits[item] = item;
            newArray.push(item);
        }
    }
    return newArray;
}

console.log(uniqueFruits(fruits))

//////////

function removeFruit(fruitName) {
    return fruits.filter(fruit => fruit !== fruitName);
}

console.log(removeFruit("apple"));

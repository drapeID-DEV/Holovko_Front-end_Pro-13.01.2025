function removeElement(array, item) {
    const index = array.indexOf(item);
    if (index != -1) {  //checks if the element exists in array
        array.splice(index, 1);
    }
}

const array = [1, 2, 3, 4, 5, 6, 7];
removeElement(array, 5);
console.log(array);
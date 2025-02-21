function getRandomChar(str) {
    let randomChar = str[Math.floor(Math.random() * str.length)]
    return randomChar;
}

function generateKey(length, characters) {
    let result = '';
    for(let i = 0; i < length; i++) {
        result += getRandomChar(characters);
    }
    return result;
}

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
const key = generateKey(16, characters);
console.log(key);
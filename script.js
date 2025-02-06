let result = "";

for (let i = 20; i <= 30; i += 0.5) {
    if (i < 30) {
        result += i + `, `;
    } else {
        result += i;
    }
}

alert(result)

/////////////

let rate = 40;

for (let i = 10; i <= 100; i += 10) {
    alert(`${i} * 40 = ${i * rate}`);
}

//////////////

let num;

result = "";

while (num === "" || isNaN(num) || num == undefined) {
    num = prompt("Please input the number: ")
}

for (let i = 1; i <= 100; i++) {
    if (i ** 2 < num) {
        result += i + `,`
    }
}

alert(result)

///////////////

for (let i = 2; i <= num - 1; i++) {
    if (num % i == 0) {
        alert("This is prime number");
        break;
    }
}

//////////////

for (let i = 0; i < num; i++) {
    if (num == 3 ** i) {
        alert("We can get a number this way")
        break;
    } else if (3 ** i > num) {
        alert("We can't get this number")
        break;
    }
}
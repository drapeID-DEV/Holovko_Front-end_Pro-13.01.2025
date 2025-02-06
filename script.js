let result = "";

for (let i = 10; i <= 20; i++) {
    if (i < 20) {
        result += i + `, `;
    } else {
        result += i;
    }
}

alert(result)

/////////////

result = "";

for (let i = 10; i <= 20; i++) {
    result += i * i + ","
}

alert(result)

/////////////

for (let i = 1; i <= 10; i++) {
    alert(`7 * ${i} = ${i * 7}`);
}

/////////////

result = 0;

for (let i = 1; i <= 15; i++) {
    result += i;
}

alert(result);

/////////////

result = 0;

for (let i = 15; i <= 35; i++) {
    result *= i;
}

alert(result);

////////////

result = 0;

for (let i = 1; i <= 500; i++) {
    result += i;
}

alert(result);

/////////////

result = 0;

for (let i = 30; i <= 80; i++) {
    if (i % 2 == 0) {
        result += i;
    }
}

alert(result);

/////////////

result = "";

for (let i = 100; i <= 200; i++) {
    if (i % 3 == 0) {
        result += i + `,`;
    }
}

alert(result);

//////////////

result = "";

let num;

while (isNaN(num) || num === "" || num == undefined) {
    num = prompt("Please input the number: ");
}

for (let i = 0; i <= num; i++) {
    if (num % i == 0) {
        result += i + `,`;
    }
}

alert(result);

////////////////

let counter = 0;

for (let i = 0; i <= num; i++) {
    if (num % i == 0 && i % 2 == 0) {
        counter++;
    }
}

alert(counter);

//////////////

result = 0;

for (let i = 0; i <= num; i++) {
    if (num % i == 0 && i % 2 == 0) {
        result += i;
    }
}

alert(result);

//////////////

for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        alert(`${i} * ${j} = ${i * j}`);
    }
}
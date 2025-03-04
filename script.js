function pow(num, degree) {
    if(degree == 2) {
        return num * num;
    }
    else {
        return num * pow(num, degree - 1);
    }
}

console.log(pow(5, 3));

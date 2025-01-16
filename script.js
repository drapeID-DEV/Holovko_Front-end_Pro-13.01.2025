let hoursAmount = +prompt("Enter the amount of hours: ");
if (hoursAmount == "" || hoursAmount === null || isNaN(hoursAmount)) {
    alert("Invalid data. Please reload the page.");
}
else {
    let secondsAmount = hoursAmount * 3600;
    alert("The amount of seconds is: " + secondsAmount);
}
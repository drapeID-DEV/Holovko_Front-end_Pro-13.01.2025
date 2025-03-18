const arr = [1, 4, [2, 6], 2];

function generateList(inputArr) {
  let result = "<ul>";

  inputArr.forEach((element) => {
    if (Array.isArray(element)) {
      result += `<li>${generateList(element)}</li>`;
    } else {
      result += `<li>${element}</li>`;
    }
  });

  result += "</ul>";
  return result;
}

document.body.innerHTML += generateList(arr);

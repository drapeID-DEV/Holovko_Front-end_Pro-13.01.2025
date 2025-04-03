const personForm = document.querySelector(`.person-form`);
const carForm = document.querySelector(`.car-form`);

const personBtn = document.querySelector(`.create-person`);
personBtn.addEventListener(`click`, createPerson);

const carBtn = document.querySelector(`.create-car`);
carBtn.addEventListener(`click`, createCar);

const ownerSelect = document.querySelector(`#owner`);

let personList = [];
let carList = [];

function Person(name, age) {
  this.name = name;
  this.age = age;

  Object.defineProperty(this, `personData`, {
    get() {
      return `Fullname: ${this.name}, age: ${this.age}`;
    },
  });
}

function Car(model, color) {
  this.model = model;
  this.color = color;
  this.ownerName;
  this.ownerAge;

  Object.defineProperty(this, `ownerData`, {
    get() {
      return `Car: ${this.color} ${this.model}, owner: ${this.ownerName}`;
    },
    set(owner) {
      this.ownerName = owner.name;
      this.ownerAge = owner.age;
    },
  });
}

function createNewOwnerOption(owner, ownerID) {
  const newOption = document.createElement(`option`);
  newOption.setAttribute(`value`, ownerID);
  newOption.textContent = owner.name;

  ownerSelect.appendChild(newOption);
}

function createPerson(event) {
  event.preventDefault();
  const formData = new FormData(personForm);
  let formIsValid = true;

  const personName = formData.get(`fullname`);
  const personAge = formData.get(`age`);

  if (!personName || !personAge || !isFinite(personAge)) formIsValid = false;

  if (formIsValid) {
    const newPerson = new Person(personName, personAge);
    personList.push(newPerson);

    const newOwnerId = personList.length - 1;
    createNewOwnerOption(newPerson, newOwnerId);
    carBtn.disabled = false;
    personForm.reset();
  } else {
    alert(`Invalid data!`);
  }
}

function createCar(event) {
  event.preventDefault();
  const formData = new FormData(carForm);
  let formIsValid = true;

  const carModel = formData.get(`model`);
  const carColor = formData.get(`color`);
  const carOwnerId = formData.get(`owner`);

  if (!carModel || !carColor) formIsValid = false;

  if (formIsValid) {
    const newCar = new Car(carModel, carColor);
    newCar.ownerData = personList[carOwnerId];
    carList.push(newCar);
    carForm.reset();
    alert(newCar.ownerData);
  } else {
    alert(`Invalid data!`);
  }
}

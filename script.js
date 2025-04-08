const houseForm = document.querySelector(`.house-form`);
const apartmentForm = document.querySelector(`.apartment-form`);
const residentForm = document.querySelector(`.resident-form`);

const apartmentTitle = document.querySelector(`.apartment-number`);
const residentTitle = document.querySelector(`.resident-number`);

const createHouseBtn = document.querySelector(`#house-btn`);
createHouseBtn.addEventListener(`click`, createHouseHandler);

const createApartmentBtn = document.querySelector(`#apartment-btn`);
createApartmentBtn.addEventListener(`click`, createApartmentHandler);

const createResidentBtn = document.querySelector(`#residents-btn`);
createResidentBtn.addEventListener(`click`, createResidentsHandler);

const showInfoBtn = document.querySelector(`.show-info`);
showInfoBtn.addEventListener(`click`, showInfoMessage);

const infoContainer = document.querySelector(`.info-container`);
const infoMessage = document.querySelector(`.info-text`);
const infoBtn = document.querySelector(`.info-btn`);
infoBtn.addEventListener(`click`, hideInfoMessage);

const residentInputTemplate = document.querySelector(`.resident-input`)

class House {
  constructor() {
    this.apartments = [];
  }

  addApartment(apartment) {
    this.apartments.push(apartment);
  }

  getInfo() {
    const list = document.createElement('ul');
  
    this.apartments.forEach((apartment, i) => {
      const aptItem = document.createElement('li');
      aptItem.textContent = `Квартира ${i + 1}:`;
  
      const residentList = document.createElement('ul');
      apartment.residents.forEach((resident, j) => {
        const residentItem = document.createElement('li');
        residentItem.textContent = `Мешканець ${j + 1}: ${resident.name}`;
        residentList.appendChild(residentItem);
      });
  
      aptItem.appendChild(residentList);
      list.appendChild(aptItem);
    });
  
    return list;
  }
}

class Apartment {
  constructor() {
    this.residents = [];
  }

  addResident(resident) {
    this.residents.push(resident);
  }
}

class Resident {
  constructor(name) {
    this.name = name;
  }
}

let house = new House();
let totalApartments = 0;
let currentApartment = 0;
let residentAmount = 0;

function showElement(element) {
  element.classList.remove(`hidden`);
}

function hideElement(element) {
  element.classList.add(`hidden`);
}

function removeErrorMessage() {
  const prevErrorMessage = document.querySelector(
    `#${this.id} + .error-message`
  );
  if (prevErrorMessage) {
    prevErrorMessage.remove();
  }
}

function throwErrorMessage(key, currentInputField) {
  const errorMessage = document.createElement(`p`);
  errorMessage.className = `error-message`;
  errorMessage.textContent = `Please input ${key}*`;
  currentInputField.insertAdjacentElement("afterend", errorMessage);
  currentInputField.addEventListener(`focus`, removeErrorMessage);
}

function validateForm(formData) {
  let formState = true;

  for (let key of formData.keys()) {
    const currentInputField = document.querySelector(`#${key}`);
    const prevErrorMessage = document.querySelector(`#${key} + .error-message`);

    if (!currentInputField.value.trim()) {
      if (!prevErrorMessage) {
        throwErrorMessage(key, currentInputField);
        formState = false;
        continue;
      } else {
        formState = false;
        continue;
      }
    }
  }
  return formState;
}

function createHouseHandler(event) {
  event.preventDefault();

  const formData = new FormData(houseForm);
  let formIsValid = validateForm(formData);

  if (formIsValid) {
    totalApartments = formData.get(`apartment-amount`);
    apartmentTitle.textContent = `Apartment ${currentApartment + 1}`;
    showElement(apartmentForm);
    hideElement(houseForm);
  }
}

function createApartmentHandler(event) {
  event.preventDefault();

  const formData = new FormData(apartmentForm);
  let formIsValid = validateForm(formData);

  if (formIsValid) {
    residentAmount = formData.get(`resident-amount`);
    apartmentForm.reset();
    hideElement(apartmentForm);
    renderResidentInputs(residentAmount);
    showElement(residentForm);
  }
}

function createResidentsHandler(event) {
  event.preventDefault();

  const apartment = new Apartment();

  const formData = new FormData(residentForm);
  let formIsValid = validateForm(formData);

  if (formIsValid) {
    for (let key of formData.keys()) {
      apartment.addResident(new Resident(formData.get(key)));
    }

    house.addApartment(apartment);
    currentApartment++;

    if (currentApartment < totalApartments) {
      residentForm.reset();
      apartmentTitle.textContent = `Apartment ${currentApartment + 1}`;
      const residentInputs = document.querySelectorAll(`.input-resident-block`);
      residentInputs.forEach(element => element.remove());
      hideElement(residentForm);
      showElement(apartmentForm);
    } else {
      hideElement(residentForm);
      showElement(showInfoBtn);
    }
  }
}

function renderResidentInputs(amount) {
  for(let i = 1; i <= amount; i++) {
    const residentInputClone = residentInputTemplate.content.cloneNode(true);

    const residentBlock = residentInputClone.querySelector(`div`);
    residentBlock.className = `input-resident-block`;

    const label = residentInputClone.querySelector(`label`);
    label.setAttribute(`for`, `resident-${i}`);
    label.textContent = `Resident ${i}`
  
    const input = residentInputClone.querySelector(`input`);
    input.setAttribute(`id`, `resident-${i}`);
    input.setAttribute(`name`, `resident-${i}`);

    residentForm.insertBefore(residentInputClone, createResidentBtn);
  }
}

function hideInfoMessage() {
  hideElement(infoContainer);
}

function showInfoMessage() {
  const houseInfo = house.getInfo();
  infoMessage.appendChild(houseInfo);
  showElement(infoContainer);
}
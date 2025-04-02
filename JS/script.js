const testUsers = [
  {
    id: 1,
    username: "Andrew",
    password: "qwerty123",
  },
  {
    id: 2,
    username: "Max",
    password: "zxcqwe",
  },
];

localStorage.setItem("users", JSON.stringify(testUsers));

const usersList = document.querySelector(`.users-list`);
const rowTemplate = document.querySelector(`.user-row-template`);

const passInput = document.querySelector(`#password`);
const hidePassword = document.querySelector(`.hide-password`);

const addUserBtn = document.querySelector(`.add-user-btn`);
addUserBtn.addEventListener(`click`, addUserClick);

const modifyingForm = document.querySelector(`.modify-user-form`);
const confirmButton = document.querySelector(`.confirm-modifying-btn`);
confirmButton.addEventListener(`click`, submitForm);

const deleteMessage = document.querySelector(`.deleting-message`);
const declineBtn = document.querySelector(`.decline-delete`);
declineBtn.addEventListener(`click`, () => {
  deleteMessage.style.display = `none`;
});

function renderUsersList(userToRender) {
  let usersData;

  if (userToRender) {
    usersData = [userToRender];
  } else {
    usersData = JSON.parse(localStorage.getItem(`users`));
  }

  usersData.forEach((user) => {
    const userRowClone = rowTemplate.content.cloneNode(true);
    const currentRow = userRowClone.querySelector(`tr`);
    currentRow.setAttribute(`data-uuid`, user.id);

    const idField = userRowClone.querySelector(`.user-id`);
    idField.textContent = user.id;

    const usernameField = userRowClone.querySelector(`.username`);
    usernameField.textContent = user.username;

    const viewBtn = userRowClone.querySelector(`.view-btn`);
    viewBtn.addEventListener(`click`, viewUser);

    const editBtn = userRowClone.querySelector(`.edit-btn`);
    editBtn.addEventListener(`click`, editUserClick);

    const deleteBtn = userRowClone.querySelector(`.delete-btn`);
    deleteBtn.addEventListener(`click`, deleteBtnClick);

    usersList.appendChild(userRowClone);
  });
}

function updateExistingUser(editedUser) {
  const existingUsers = document.querySelectorAll(`.users-list tr`);
  existingUsers.forEach((user) => {
    if (user.getAttribute(`data-uuid`) == editedUser.id) {
      const username = user.querySelector(`.username`);
      username.textContent = editedUser.username;
      return;
    }
  });
}

function deleteBtnClick(event) {
  const target = event.target;
  const currentRow = target.closest(`tr`);
  const rowUserId = currentRow.getAttribute(`data-uuid`);

  deleteMessage.style.display = `flex`;
  deleteMessage.setAttribute(`data-deleteid`, rowUserId);
}

const acceptBtn = document.querySelector(`.accept-delete`);
acceptBtn.addEventListener(`click`, confirmRemoving);

function confirmRemoving() {
  const idToDelete = deleteMessage.getAttribute(`data-deleteid`);

  const localStorageUsers = JSON.parse(localStorage.getItem("users"));
  const localStorageUsersWithoutDeleted = localStorageUsers.filter(
    (element) => element.id !== +idToDelete
  );
  localStorage.setItem(
    "users",
    JSON.stringify(localStorageUsersWithoutDeleted)
  );
  const existingUsers = document.querySelectorAll(`.users-list tr`);
  existingUsers.forEach((user) => {
    if (user.getAttribute(`data-uuid`) == idToDelete) {
      user.remove();
      return;
    }
  });
  deleteMessage.style.display = `none`;
}

function viewUser(event) {
  const target = event.target;
  const currentRow = target.closest(`tr`);
  const rowUserId = currentRow.getAttribute(`data-uuid`);

  const existingUsersData = JSON.parse(localStorage.getItem(`users`));
  existingUsersData.forEach((user) => {
    if (user.id == rowUserId) {
      alert(JSON.stringify(user));
    }
  });
}

renderUsersList();

function hideModifyingForm() {
  modifyingForm.style.display = `none`;
}

function addUserClick() {
  modifyingForm.reset();

  modifyingForm.removeAttribute(`data-editid`);
  modifyingForm.style.display = `flex`;
}

function editUserClick(event) {
  modifyingForm.reset();

  const target = event.target;
  const currentUser = target.closest(`tr`).getAttribute("data-uuid");

  modifyingForm.setAttribute(`data-editid`, currentUser);
  modifyingForm.style.display = `flex`;
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

hidePassword.addEventListener(`click`, (event) => {
  event.preventDefault();
  const eyeLine = document.querySelector(`.eye-line`);
  eyeLine.style.stroke =
    eyeLine.style.stroke === `transparent` ? "currentColor" : "transparent";
  passInput.type = passInput.type === "password" ? "text" : "password";
});

function submitForm(event) {
  event.preventDefault();
  let inputData = {};
  let formIsValid = true;
  const formData = new FormData(modifyingForm);

  for (let key of formData.keys()) {
    const currentInputField = document.querySelector(`#${key}`);
    const prevErrorMessage = document.querySelector(`#${key} + .error-message`);

    if (!currentInputField.value.trim()) {
      if (!prevErrorMessage) {
        throwErrorMessage(key, currentInputField);
        formIsValid = false;
        continue;
      } else {
        formIsValid = false;
        continue;
      }
    } else if (formData.get(key)) {
      inputData[key] = formData.get(key);
    }
  }

  if (formIsValid) {
    if (modifyingForm.hasAttribute(`data-editid`)) {
      const uuid = modifyingForm.getAttribute(`data-editid`);
      inputData.id = uuid;

      const localStorageUsers = JSON.parse(localStorage.getItem("users"));
      const localStorageUsersWithEdited = localStorageUsers.map((element) => {
        if (element.id === +uuid) {
          return {
            id: uuid,
            name: inputData.username,
            password: inputData.password,
          };
        }

        return element;
      });
      localStorage.setItem(
        "users",
        JSON.stringify(localStorageUsersWithEdited)
      );

      updateExistingUser(inputData);
    } else {
      const uuid = +new Date();
      inputData.id = uuid;
      const usersFromLocalStorage = localStorage.getItem("users");
      localStorage.setItem(
        "users",
        usersFromLocalStorage
          ? JSON.stringify([
              ...JSON.parse(usersFromLocalStorage),
              {
                id: uuid,
                name: inputData.username,
                password: inputData.password,
              },
            ])
          : JSON.stringify([
              {
                id: uuid,
                name: inputData.username,
                password: inputData.password,
              },
            ])
      );
      renderUsersList(inputData);
    }
    hideModifyingForm();
  }
}

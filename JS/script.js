let catalog = {
  Home: [
    {
      name: "Soap",
      cost: 100,
      imageSource: `./images/soap.png`,
    },
  ],
  Food: [
    {
      name: "Bread",
      cost: 20,
      imageSource: `./images/bread.png`,
    },
    {
      name: "Banana",
      cost: 15,
      imageSource: `./images/banana.png`,
    },
  ],
  Phones: [
    {
      name: "iPhone",
      cost: 10000,
      imageSource: `./images/iphone.png`,
    },
    {
      name: "Samsung",
      cost: 8000,
      imageSource: `./images/samsung.png`,
    },
  ],
};

const categoriesContainer = document.querySelector(`.categories`);
const categoriesList = document.querySelector(`.categories-list`);
const categories = Object.keys(catalog);
const categoriesTab = document.querySelector(`.show-categories`);
categoriesTab.addEventListener(`click`, showCategories);

const historyContainer = document.querySelector(`.history-container`);
const historyList = document.querySelector(`.history-list`);
const historyTab = document.querySelector(`.show-history`);
historyTab.addEventListener(`click`, showHistory);

const productsContainer = document.querySelector(`.products-container`);
const productTemplate = document.querySelector(`#product-template`);

const buyForm = document.querySelector(`.buy-form`);
const submitBtn = document.querySelector(`.submit-button`);

const aboutProduct = document.querySelector(".about-product");

const modalContainer = document.querySelector(`.modal-container`);
const modalMessage = document.querySelector(`.modal-message`);

let selectedProductName;
let selectedProductPrice;

function renderCategoryButtons() {
  for (const key in categories) {
    const newLi = document.createElement("li");
    categoriesList.appendChild(newLi);

    const newCategoryBtn = document.createElement("button");
    newCategoryBtn.classList.add(`category-btn`);
    newCategoryBtn.textContent = categories[key];
    newCategoryBtn.addEventListener(`click`, updateCategoryProducts);
    newLi.appendChild(newCategoryBtn);
  }
}

function renderPreviousOrders(orderKey = null) {
  const keys = orderKey ? [orderKey] : Object.keys(localStorage);

  for (const key of keys) {
    const prevOrder = JSON.parse(localStorage.getItem(key));

    const newLi = document.createElement("li");
    historyList.appendChild(newLi);

    const newOrderBtn = document.createElement("button");
    newOrderBtn.classList.add("prev-order-btn");
    newOrderBtn.setAttribute("data-orderID", key);

    const orderTime = document.createElement("div");
    orderTime.classList.add("prev-order-time");
    orderTime.textContent = prevOrder.time;

    const orderPrice = document.createElement("div");
    orderPrice.classList.add("prev-order-price");
    orderPrice.textContent = prevOrder.price;

    newOrderBtn.appendChild(orderTime);
    newOrderBtn.appendChild(orderPrice);
    newOrderBtn.addEventListener("click", showHistoryOrderDetails);
    newLi.appendChild(newOrderBtn);
  }
}

function renderAllProducts() {
  for (const category in catalog) {
    catalog[category].forEach((product) => {
      const productClone = productTemplate.content.cloneNode(true);
      const productCard = productClone.querySelector(".product");

      const productImage = productClone.querySelector(".product-image");
      const productName = productClone.querySelector(".product-name");
      const productCost = productClone.querySelector(".price");

      productImage.src = product.imageSource;
      productName.textContent = product.name;
      productCost.textContent = `$${product.cost}`;

      productCard.addEventListener(`click`, updateProductInfo);
      productsContainer.appendChild(productClone);
    });
  }
}

function resetProducts() {
  const products = document.querySelectorAll(`.product`);
  products.forEach((product) => (product.style.display = `none`));
}

function showCategories() {
  historyContainer.style.display = `none`;
  categoriesContainer.style.display = `block`;
}

function showHistory() {
  categoriesContainer.style.display = `none`;
  historyContainer.style.display = `block`;
}

renderCategoryButtons();
renderPreviousOrders();
renderAllProducts();
resetProducts();

function hideProductAbout() {
  aboutProduct.style.visibility = "hidden";
}

function hideBuyForm() {
  buyForm.style.visibility = "hidden";
}

function updateCategoryProducts(event) {
  const target = event.target;
  const products = document.querySelectorAll(`.product`);
  hideProductAbout();
  hideBuyForm();
  resetProducts();

  catalog[target.textContent].forEach((categoryProduct) => {
    products.forEach((product) => {
      const productName = product.querySelector(`.product-name`).textContent;
      if (categoryProduct.name == productName) product.style.display = `block`;
    });
  });
}

function updateProductInfo(event) {
  hideBuyForm();
  aboutProduct.style.visibility = "visible";
  const target = event.target.closest(".product");

  const productName = document.querySelector(`.about-product-name`);
  productName.textContent = target.querySelector(".product-name").textContent;
  selectedProductName = productName.textContent;

  const productPrice = document.querySelector(`.about-product-price`);
  productPrice.textContent = target.querySelector(".price").textContent;
  selectedProductPrice = productPrice.textContent;
}

function confirmBuying() {
  hideProductAbout();
  buyForm.style.visibility = "visible";
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function closeModal() {
  modalContainer.style.display = `none`;
  hideBuyForm();
  showCategories();
  resetProducts();
}

function showHistoryOrderDetails(event) {
  const target = event.target.closest(`.prev-order-btn`);
  const key = target.getAttribute("data-orderid");
  const selectedOrder = JSON.parse(localStorage.getItem(key));
  renderOrderDetails(selectedOrder);
}

function renderOrderDetails(info) {
  modalContainer.style.display = `block`;

  if ("product" in info) {
    selectedProductName = info.product;
    selectedProductPrice = info.price;
  }

  const modalProduct = modalMessage.querySelector(`.modal-product-value`);
  modalProduct.textContent = selectedProductName;

  for (let key in info) {
    if (key == "time") continue;
    const currentModalField = modalMessage.querySelector(`.modal-${key}-value`);
    currentModalField.textContent = capitalizeFirstLetter(info[key]);
  }

  const commentBlock = modalMessage.querySelector(`.comment-block`);

  if (!("comment" in info)) {
    commentBlock.style.display = `none`;
  } else {
    commentBlock.style.display = `block`;
  }

  const modalPrice = modalMessage.querySelector(`.modal-price-value`);
  modalPrice.textContent = `$${
    parseFloat(selectedProductPrice.replace(/[^0-9.]/g, "")) * +info.amount
  }`;

  const modalBtn = document.querySelector(`.modal-button`);
  modalBtn.addEventListener(`click`, closeModal);
}

function removeErrorMessage(event) {
  const target = event.target;
  if (target.type == "radio") {
    if (document.querySelector(`.payment-container + .error-message`)) {
      document.querySelector(`.payment-container + .error-message`).remove();
    }
  } else {
    const prevErrorMessage = document.querySelector(
      `#${this.id} + .error-message`
    );
    if (prevErrorMessage) {
      prevErrorMessage.remove();
    }
  }
}

function submitForm(event) {
  event.preventDefault();
  let orderData = {};
  let formIsValid = true;
  const formData = new FormData(buyForm);

  if (!formData.has("payment")) {
    formData.append("payment", "");
  }
  for (let key of formData.keys()) {
    const currentInputField = document.querySelector(`#${key}`);
    const prevErrorMessage = document.querySelector(`#${key} + .error-message`);
    if (key === "payment") {
      if (!formData.get(key)) {
        if (!document.querySelector(`.payment-container + .error-message`)) {
          console.log(formData.get(key));
          const errorMessage = document.createElement(`p`);
          errorMessage.className = `error-message`;
          errorMessage.textContent = `Please input ${key}*`;
          document
            .querySelector(`.payment-container`)
            .insertAdjacentElement("afterend", errorMessage);
          const paymentButtons = document.querySelectorAll(
            `.payment-container input`
          );
          paymentButtons.forEach((element) =>
            element.addEventListener(`click`, removeErrorMessage)
          );
          formIsValid = false;
          continue;
        } else {
          formIsValid = false;
          continue;
        }
      } else {
        orderData[key] = formData.get(key);
      }
    } else {
      if (!currentInputField.value.trim() && key !== "comment") {
        if (!prevErrorMessage) {
          const errorMessage = document.createElement(`p`);
          errorMessage.className = `error-message`;
          errorMessage.textContent = `Please input ${key}*`;
          currentInputField.insertAdjacentElement("afterend", errorMessage);
          currentInputField.addEventListener(`focus`, removeErrorMessage);
          formIsValid = false;
          continue;
        } else {
          formIsValid = false;
          continue;
        }
      } else if (formData.get(key)) {
        orderData[key] = formData.get(key);
      }
    }
  }
  if (!formIsValid) {
    alert("Complete the form!");
  } else {
    renderOrderDetails(orderData);

    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleDateString("ru");
    const formattedTime = currentTime.toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const orderTime = `${formattedDate} ${formattedTime}`;

    const key = +new Date();
    orderData.product = selectedProductName;
    orderData.price = selectedProductPrice;
    orderData.time = orderTime;
    localStorage.setItem(key, JSON.stringify(orderData));
    renderPreviousOrders(localStorage.key(localStorage.length - 1));
  }
}

submitBtn.addEventListener(`click`, submitForm);

const buyButton = document.querySelector(`.buy-product`);
buyButton.addEventListener(`click`, confirmBuying);

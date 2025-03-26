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

const categoriesList = document.querySelector(`.categories-list`);
const categories = Object.keys(catalog);

const productsContainer = document.querySelector(`.products-container`);

const buyForm = document.querySelector(`.buy-form`);
const submitBtn = document.querySelector(`.submit-button`);

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

function renderAllProducts() {
  for (const category in catalog) {
    catalog[category].forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add(`product`);

      const imgContainer = document.createElement("div");
      imgContainer.classList.add(`image-container`);

      const productImage = document.createElement("img");
      productImage.classList.add(`product-image`);
      productImage.src = product.imageSource;

      const productInfo = document.createElement("div");
      productInfo.classList.add(`product-info`);

      const productName = document.createElement("h3");
      productName.classList.add(`product-name`);
      productName.textContent = product.name;

      const productCost = document.createElement("p");
      productCost.classList.add(`price`);
      productCost.textContent = `$${product.cost}`;

      imgContainer.appendChild(productImage);
      productInfo.appendChild(productName);
      productInfo.appendChild(productCost);

      productCard.appendChild(imgContainer);
      productCard.appendChild(productInfo);

      productCard.addEventListener(`click`, updateProductInfo);

      productsContainer.appendChild(productCard);
    });
  }
}

function resetProducts() {
  const products = document.querySelectorAll(`.product`);
  products.forEach((product) => (product.style.display = `none`));
}

renderCategoryButtons();
renderAllProducts();
resetProducts();

const aboutProduct = document.querySelector(".about-product");

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

  const productPrice = document.querySelector(`.about-product-price`);
  productPrice.textContent = target.querySelector(".price").textContent;
}

function confirmBuying() {
  hideProductAbout();
  buyForm.style.visibility = "visible";
}

const deliveryContainer = document.querySelector(`.delivery-container`);

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function submitDelivery() {
  deliveryContainer.style.display = `none`;
  hideBuyForm();
  resetProducts();
}

function renderDelivery(info) {
  if (document.querySelector(`.delivery-message`)) {
    document.querySelector(`.delivery-message`).remove();
  }
  deliveryContainer.style.display = `block`;
  const deliveryMessage = document.createElement(`div`);
  deliveryMessage.className = `delivery-message`;
  deliveryContainer.appendChild(deliveryMessage);

  deliveryContainer.style.display = `block`;
  const productName = document.querySelector(`.about-product-name`).textContent;
  const productPrice =
    document.querySelector(`.about-product-price`).textContent;

  const productField = document.createElement(`p`);
  productField.className = `delivery-field`;
  productField.textContent = `Product:`;
  deliveryMessage.appendChild(productField);

  const productValue = document.createElement(`p`);
  productValue.className = `delivery-value`;
  productValue.textContent = productName;
  deliveryMessage.appendChild(productValue);

  for (let key in info) {
    const fieldName = document.createElement(`p`);
    fieldName.className = `delivery-field`;
    fieldName.textContent = `${capitalizeFirstLetter(key)}:`;

    const fieldValue = document.createElement(`p`);
    fieldValue.className = `delivery-value`;
    fieldValue.textContent = capitalizeFirstLetter(info[key]);

    deliveryMessage.appendChild(fieldName);
    deliveryMessage.appendChild(fieldValue);
  }

  const priceField = document.createElement(`p`);
  priceField.className = `delivery-field`;
  priceField.textContent = `Total price:`;
  deliveryMessage.appendChild(priceField);

  const priceValue = document.createElement(`p`);
  priceValue.className = `delivery-value`;
  priceValue.textContent = `$${
    parseFloat(productPrice.replace(/[^0-9.]/g, "")) * +info.amount
  }`;
  deliveryMessage.appendChild(priceValue);

  const deliveryBtn = document.createElement(`button`);
  deliveryBtn.className = `delivery-button`;
  deliveryBtn.textContent = `OK`;
  deliveryBtn.addEventListener(`click`, submitDelivery);
  deliveryMessage.appendChild(deliveryBtn);
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
  let userData = {};
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
        userData[key] = formData.get(key);
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
        userData[key] = formData.get(key);
      }
    }
  }
  if (!formIsValid) {
    alert("Complete the form!");
  } else {
    renderDelivery(userData);
  }
}

submitBtn.addEventListener(`click`, submitForm);

const buyButton = document.querySelector(`.buy-product`);
buyButton.addEventListener(`click`, confirmBuying);

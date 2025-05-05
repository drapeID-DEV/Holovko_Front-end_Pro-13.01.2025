import "./style.scss";
import { hideElement, showElement, updateOrderPrice } from "./utils";
import Product from "./productClass";

async function getCatalog() {
  try {
    const response = await fetch("http://localhost:3000/catalog");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

const catalog = await getCatalog();

const categoryContainer = document.querySelector(`#category-btns-container`);
const categoryBtnTemplate = document.querySelector(`.category-btn-template`);
const categories = Object.keys(catalog);

function renderCategoryButtons() {
  for (const key in categories) {
    const btnClone = categoryBtnTemplate.content.cloneNode(true);
    const categoryBtn = btnClone.querySelector(`#category-btn`);

    categoryBtn.textContent = categories[key];
    categoryBtn.addEventListener(`click`, showCategoryProducts);
    categoryContainer.appendChild(categoryBtn);
  }
}

renderCategoryButtons();

const productsContainer = document.querySelector(`#product-cards-container`);
const productTemplate = document.querySelector(`.product-card-template`);

function renderAllProducts() {
  for (const category in catalog) {
    catalog[category].forEach((product) => {
      const productClone = productTemplate.content.cloneNode(true);
      const productCard = productClone.querySelector("#product-card");
      productCard.setAttribute(`data-Id`, product.id);

      const productImage = productCard.querySelector("#product-image");
      const productName = productCard.querySelector("#product-name");
      const productPrice = productCard.querySelector("#product-price");

      productImage.src = product.imageSource;
      productName.textContent = product.name;
      productPrice.textContent = `${product.price}UAH`;

      productCard.addEventListener(`click`, openConstructor);
      productsContainer.appendChild(productCard);
    });
  }
}

renderAllProducts();

const products = document.querySelectorAll(`#product-card`);

function resetProducts() {
  products.forEach((product) => hideElement(product));
}

function showCategoryProducts(event) {
  const target = event.target;
  const category = target.textContent;
  resetProducts();

  catalog[category].forEach((categoryProduct) => {
    products.forEach((product) => {
      const productId = +product.getAttribute(`data-id`);
      if (categoryProduct.id == productId) showElement(product);
    });
  });
}

const mainContent = document.querySelector(`#main-content`);

const constructorContainer = document.querySelector(`#constructor-container`);
const toppingsContainer = document.querySelector(`#toppings-container`);

let currentItem;
let order = {
  total: 0,
};

function getProductData(idToFind) {
  for (const [categoryName, products] of Object.entries(catalog)) {
    for (const product of products) {
      if (product.id === idToFind) {
        return { ...product, category: categoryName };
      }
    }
  }
}

function openConstructor(event) {
  const target = event.target;
  const productId = +target.closest(`#product-card`).getAttribute(`data-id`);
  currentItem = getProductData(productId);

  const constructName = constructorContainer.querySelector(`#constructor-name`);
  constructName.textContent = currentItem.name;

  const constructImage =
    constructorContainer.querySelector(`#constructor-image`);
  constructImage.src = currentItem.imageSource;
  if (currentItem.category == `Drinks`) {
    hideElement(toppingsContainer);
  } else {
    showElement(toppingsContainer);
  }

  hideElement(mainContent);
  showElement(constructorContainer);
}

const cancelBtn = document.querySelector(`#cancel-btn`);
cancelBtn.addEventListener(`click`, () => {
  hideElement(constructorContainer);
  showElement(mainContent);
});

const addBtn = document.querySelector(`#add-btn`);
addBtn.addEventListener(`click`, addToOrder);

const cartItemTemplate = document.querySelector(`.cart-item-template`);
const orderContainer = document.querySelector(`#order-container`);
const openOrderBtn = document.querySelector(`#open-order-btn`);
const closeOrderBtn = document.querySelector(`#close-order-btn`);
const proceedOrder = document.querySelector(`#proceed-order-btn`);

proceedOrder.addEventListener(`click`, sendOrder);
proceedOrder.addEventListener(`click`, resetApp);

openOrderBtn.addEventListener(`click`, () => {
  if (Object.keys(order).length == 1) {
    return;
  }
  hideElement(mainContent);
  showElement(orderContainer);
});

closeOrderBtn.addEventListener(`click`, () => {
  showElement(mainContent);
  hideElement(orderContainer);
});

function renderInCart(item) {
  const cartItemClone = cartItemTemplate.content.cloneNode(true);
  const cartItem = cartItemClone.querySelector(`#cart-item`);
  cartItem.setAttribute(`data-Id`, item.id);

  const itemImage = cartItem.querySelector("#cart-item-image");
  const itemSize = cartItem.querySelector("#cart-item-size");
  const itemPrice = cartItem.querySelector("#cart-item-price");
  const toppingsContainer = cartItem.querySelector(
    `#cart-item-toppings-container`
  );
  const itemTops = cartItem.querySelector("#cart-item-toppings");

  itemImage.src = item.imageSource;
  itemSize.textContent = item.size;
  itemPrice.textContent = `${item.price}UAH`;
  if (item.toppings && item.toppings.length != 0) {
    showElement(toppingsContainer);
    item.toppings.forEach((top) => {
      itemTops.innerHTML += `${top.name}<br>`;
    });
  } else {
    hideElement(toppingsContainer);
  }
  updateOrderPrice(order.total);

  const removeBtn = cartItem.querySelector(`#remove-btn`);
  removeBtn.addEventListener(`click`, removeFromOrder);

  const orderControls = document.querySelector(`#order-controls`);
  orderContainer.insertBefore(cartItem, orderControls);
}

function addToOrder() {
  const size = document.querySelector(`input[name="size-radio"]:checked`).value;
  const toppingsList = document.querySelectorAll(
    `input[name="topping-switch"]:checked`
  );

  const product = new Product(
    currentItem.name,
    currentItem.price,
    Product[size],
    currentItem.category
  );
  if (currentItem.category != `Drinks`) {
    toppingsList.forEach((top) => product.addTopping(Product[top.value]));
  }
  currentItem.price = product.calculatePrice();
  currentItem.toppings = product.getToppings();
  currentItem.size = product.getSize();

  hideElement(constructorContainer);
  showElement(mainContent);
  order[currentItem.id] = currentItem;
  console.log(order);
  order.total += currentItem.price;

  renderInCart(currentItem);
}

function removeFromOrder(event) {
  const target = event.target;
  const product = target.closest(`#cart-item`);
  const removeId = +product.getAttribute(`data-id`);

  order.total -= order[removeId].price;
  delete order[removeId];
  updateOrderPrice(order.total);
  product.remove();
}

function resetApp() {
  order = { total: 0 };
  hideElement(orderContainer);
  showElement(mainContent);
  Array.from(orderContainer.querySelectorAll(`#cart-item`)).forEach((item) =>
    item.remove()
  );
}

async function sendOrder() {
  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

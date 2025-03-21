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

for (const key in categories) {
  const newLi = document.createElement("li");
  categoriesList.appendChild(newLi);

  const newCategoryBtn = document.createElement("button");
  newCategoryBtn.classList.add(`category-btn`);
  newCategoryBtn.textContent = categories[key];
  newCategoryBtn.addEventListener(`click`, updateCategoryProducts);
  newLi.appendChild(newCategoryBtn);
}

const productsContainer = document.querySelector(`.products-container`);

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

renderAllProducts();

function resetProducts() {
  const products = document.querySelectorAll(`.product`);
  products.forEach((product) => (product.style.display = `none`));
}

resetProducts();

function updateCategoryProducts(event) {
  const target = event.target;
  const products = document.querySelectorAll(`.product`);
  hideProductAbout();
  resetProducts();

  catalog[target.textContent].forEach((categoryProduct) => {
    console.log(categoryProduct);
    products.forEach((product) => {
      const productName = product.querySelector(`.product-name`).textContent;
      if (categoryProduct.name == productName) product.style.display = `block`;
    });
  });
}

function confirmBuying() {
  hideProductAbout();
  resetProducts();
  alert("You have bought a product.");
}

const buyButton = document.querySelector(`.buy-product`);
buyButton.addEventListener(`click`, confirmBuying);

const aboutProduct = document.querySelector(".about-product");

function hideProductAbout() {
  aboutProduct.style.visibility = "hidden";
}

function updateProductInfo(event) {
  aboutProduct.style.visibility = "visible";
  const target = event.target.closest(".product");

  const productName = document.querySelector(`.about-product-name`);
  productName.textContent = target.querySelector(".product-name").textContent;

  const productPrice = document.querySelector(`.about-product-price`);
  productPrice.textContent = target.querySelector(".price").textContent;
}

export function hideElement(element) {
  element.classList.add("d-none");
}

export function showElement(element) {
  element.classList.remove("d-none");
}

const totalOrderPrice = document.querySelector(`#order-price`);

export function updateOrderPrice(newPrice) {
  totalOrderPrice.textContent = `Your order total is: ${newPrice}UAH`;
}

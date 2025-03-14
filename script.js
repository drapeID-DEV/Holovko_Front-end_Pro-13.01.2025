function getCartInfo(userCart) {
    let result = "";
    for(let i = 0; i < userCart.length; i++) {
        result += `${i + 1}. Product: ${userCart[i].name}, amount: ${userCart[i].amount}, price: ${userCart[i].price}UAH\n`;
    }
    return result;
}

function getCatalogInfo(productsData) {
    let result = "";
    for(let i = 0; i < productsData.length; i++) {
        result += `${i}. Product: ${productsData[i].name}, cost for unit: ${productsData[i].cost}UAH\n`;
    }
    return result;
}

let cart = [];

let catalog = [
    {
        name: "Soap",
        cost: 100
    },
    {
        name: "Bread",
        cost: 20
    },
    {
        name: "iPhone",
        cost: 10000
    },
    {
        name: "Banana",
        cost: 15
    }
];

console.log(getCatalogInfo(catalog));
alert(`Catalog:\n${getCatalogInfo(catalog)}`);

do{
    let productId;
    do{
        productId = prompt(`Please input the number of product(0-${catalog.length - 1}): `);
    } while(!productId || !isFinite(+productId) || +productId < 0 || +productId > catalog.length - 1);

    let productAmount;
    do{
        productAmount = +prompt("Please input the amount of product you want: ");
    } while(!productAmount || productAmount < 0 || !isFinite(productAmount));

    let selectedProduct = catalog[+productId];

    let isInCart = false;
    for(let i = 0; i < cart.length; i++) {
        if(cart[i].name == selectedProduct.name) {
            isInCart = true;
            cart[i].amount += productAmount;
            cart[i].price = selectedProduct.cost * cart[i].amount;
            break;
        }
    }

    if(!isInCart) {
        cart.push({name: selectedProduct.name,
            amount: productAmount,
            price: selectedProduct.cost * productAmount});
    }

    continueShop = confirm(`Your cart:\n${getCartInfo(cart)}\nDo you want to add something else?`);
} while(continueShop);

function getTotal(userCart) {
    let totalPrice = userCart.reduce((acc, item) => acc + item.price, 0);
    if(totalPrice > 10000) {
        alert(`Your total price is ${totalPrice}, so you get a 20% discount!\nTotal price with discount: ${totalPrice * 0.8}`);
        return totalPrice * 0.8;
    }
    else {
        alert(`Your total price: ${totalPrice}`);
        return totalPrice;
    }
}

getTotal(cart);

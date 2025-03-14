function getCartInfo(userCart) {
    let result = "";
    for(let i = 0; i < userCart.length; i++) {
        result += `${i + 1}. Product: ${userCart[i].name}, amount: ${userCart[i].amount}, price: ${userCart[i].price}UAH\n`;
    }
    return result;
}

function getCatalogInfo(productsData) {
    let result = "";
    for(let category in productsData) {
        result += `${category}:\n`
        productsData[category].forEach((product, index) => {result += `\t${index}. Product: ${product.name}, cost for unit: ${product.cost}UAH\n`;})
    }
    return result;
}

function getCategoryInfo(userCategory) {
    let result = "";
    catalog[userCategory].forEach((product, index) => {result += `\t${index}. Product: ${product.name}, cost for unit: ${product.cost}UAH\n`;})
    return result;
}

let cart = [];

let catalog = {
    Home: [
        {
            name: "Soap",
            cost: 100
        }
    ],
    Food: [
        {
            name: "Bread",
            cost: 20
        },
        {
            name: "Banana",
            cost: 15
        }
    ],
    Phones: [
        {
            name: "iPhone",
            cost: 10000
        },
        {
            name: "Samsung",
            cost: 8000
        }
    ]
}

console.log(getCatalogInfo(catalog));
alert(`Catalog:\n${getCatalogInfo(catalog)}`);

do{
    let categories = Object.keys(catalog)

    let categoryID;
    do{
        categoryID = prompt(`Please input the category(0-${categories.length - 1}): `);
    } while(!categoryID || !isFinite(+categoryID) || +categoryID < 0 || +categoryID > categories.length - 1);

    let selectedCategory = categories[categoryID];
    let productList = catalog[selectedCategory];

    let productId;
    do{
        productId = prompt(`Please input the number of product(0-${productList.length - 1}):\n${getCategoryInfo(selectedCategory)}`);
    } while(!productId || !isFinite(+productId) || +productId < 0 || +productId > productList.length - 1);

    let productAmount;
    do{
        productAmount = +prompt("Please input the amount of product you want: ");
    } while(!productAmount || productAmount < 0 || !isFinite(productAmount));

    let selectedProduct = productList[+productId];

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

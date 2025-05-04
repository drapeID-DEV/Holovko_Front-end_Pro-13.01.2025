export default class Product {
    static SIZE_SMALL = { name: 'Small', price: 0 };
    static SIZE_MEDIUM = { name: 'Medium', price: 15 };
    static SIZE_LARGE = { name: 'Large', price: 30 };
  
    static TOPPING_MAYO = { name: 'Mayo', price: 20 };
    static TOPPING_SAUCE = { name: 'Sauce', price: 15 };
  
    constructor(name, price, size, category) {
      this.name = name;
      this.size = size;
      if(category != `Drinks`) {
        this.toppings = [];
      }
      this.price = price;
    }
  
    getSize() {
      return this.size.name;
    }
  
    addTopping(topping) {
      this.toppings.push(topping);
    }
  
    getToppings() {
      return this.toppings;
    }
  
    calculatePrice() {
      this.price += this.size.price;
      if(this.toppings) this.toppings.forEach(top => this.price += top.price);
      return this.price;
    }
  }
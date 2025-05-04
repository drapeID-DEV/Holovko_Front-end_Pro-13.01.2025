const express = require('express');
const cors = require(`cors`);

const app = express();
app.use(cors());
app.use(express.json());

const catalog = {
  Burgers: [
    {
      id: 1,
      name: "BigBoss",
      price: 120,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/McD_Big-Mac:nutrition-calculator-tile`,
    },
    {
      id: 2,
      name: "Humburger",
      price: 80,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile`,
    },
    {
      id: 3,
      name: "Cheesburger",
      price: 100,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/McD_Cheeseburger:nutrition-calculator-tile`,
    },
    {
      id: 4,
      name: "BigTasty",
      price: 100,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/McD_Big-Tasty:nutrition-calculator-tile`,
    },
  ],
  Breakfast: [
    {
      id: 5,
      name: "BaconButty",
      price: 50,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/BKFT_Toast_Bacon_v2:nutrition-calculator-tile`,
    },
    {
      id: 6,
      name: "EggMuff",
      price: 60,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/BKFT_McMuffin_Egg_Cheese_v2:nutrition-calculator-tile`,
    },
  ],
  Drinks: [
    {
      id: 7,
      name: "Cola",
      price: 20,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/McD_CocaCola_500ml_v2:nutrition-calculator-tile`,
    },
    {
      id: 8,
      name: "Latte",
      price: 40,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/Latte_Ginger_v3:nutrition-calculator-tile`,
    },
    {
      id: 9,
      name: "Americano",
      price: 40,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/McD_Americano_230ml_v2:nutrition-calculator-tile`,
    },
    {
      id: 10,
      name: "Mocco",
      price: 45,
      imageSource: `https://s7d1.scene7.com/is/image/mcdonalds/McD_MOKKO_295ml_v2:nutrition-calculator-tile`,
    },
  ],
};

const port = 3000;

let orders = [];

app.get('/catalog', (req, res) => {
  res.send(catalog)
})

app.post("/orders", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  orders.push(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
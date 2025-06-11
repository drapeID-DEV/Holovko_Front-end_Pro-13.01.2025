const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
  },
];

let products = [
  {
    id: 0,
    category: "Smartphone",
    name: "iPhone 14 Pro",
    quantity: 5,
    price: 29999,
  },
  {
    id: 1,
    category: "Laptop",
    name: "Lenovo ThinkPad X1",
    quantity: 3,
    price: 48999,
  },
  {
    id: 2,
    category: "Smartphone",
    name: "Samsung",
    quantity: 8,
    price: 25999,
  },
  {
    id: 3,
    category: "Tablet",
    name: "iPad Air",
    quantity: 6,
    price: 22999,
  },
  {
    id: 4,
    category: "Laptop",
    name: "MacBook Pro 16",
    quantity: 2,
    price: 71999,
  }
]

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.json(user);
  } else {
    res.json(undefined);
  }
});

app.post("/add", (req, res) => {
  const newProdact = req.body;
  products.push(newProdact);

  res.json(products);
});

app.post("/update", (req, res) => {
  const updatedProduct = req.body;
  products = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
  res.json(products);
});

app.post("/remove", (req, res) => {
  const { id } = req.body;
  products = products.filter((product) => product.id !== id);
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

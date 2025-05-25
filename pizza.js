const pizzas = [
  {
    name: "Margherita",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
    price: 8
  },
  {
    name: "Pepperoni",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    price: 10
  },
  {
    name: "Veggie Delight",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    price: 9
  }
];

let cart = [];

function addToCart(index) {
  cart.push(pizzas[index]);
  renderCart();
}

function renderPizzas() {
  const list = document.getElementById('pizza-list');
  if (!list) return;
  list.innerHTML = '';
  pizzas.forEach((pizza, i) => {
    const card = document.createElement('div');
    card.className = 'pizza-card';
    card.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}">
      <h3>${pizza.name}</h3>
      <p>$${pizza.price}</p>
      <button onclick="addToCart(${i})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

function renderCart() {
  const items = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if (!items || !total) return;
  items.innerHTML = '';
  let sum = 0;
  cart.forEach((pizza, i) => {
    const li = document.createElement('li');
    li.innerText = `${pizza.name} - $${pizza.price}`;
    items.appendChild(li);
    sum += pizza.price;
  });
  total.innerText = `Total: $${sum}`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order! (Demo only)");
  cart = [];
  renderCart();
}

window.onload = function() {
  renderPizzas();
  renderCart();
  // Theme restore
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
}

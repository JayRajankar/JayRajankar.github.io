const pizzas = [
  {
    name: "Margherita",
    image: "pizza2.avif",
    price: 8,
    description: "Classic tomato, mozzarella, and basil."
  },
  {
    name: "Pepperoni",
    image: "pizza3.webp",
    price: 10,
    description: "Spicy pepperoni with rich tomato sauce."
  },
  {
    name: "Veggie Delight",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    price: 9,
    description: "Fresh vegetables with a creamy cheese blend."
  }
];

let cart = [];

function addToCart(index) {
  cart.push(pizzas[index]);
  renderCart();
  showNotification(`${pizzas[index].name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
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
      <img src="${pizza.image}" alt="${pizza.name}" loading="lazy">
      <h3>${pizza.name}</h3>
      <p>${pizza.description}</p>
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
    li.innerHTML = `
      ${pizza.name} - $${pizza.price}
      <button onclick="removeFromCart(${i})" class="remove-btn">Remove</button>
    `;
    items.appendChild(li);
    sum += pizza.price;
  });
  total.innerText = `Total: $${sum.toFixed(2)}`;
}

function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", true);
    return;
  }
  showNotification("Thank you for your order!");
  cart = [];
  renderCart();
}

function showNotification(message, isError = false) {
  const notification = document.createElement('div');
  notification.className = `notification ${isError ? 'error' : ''}`;
  notification.innerText = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

window.onload = function() {
  renderPizzas();
  renderCart();
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
};

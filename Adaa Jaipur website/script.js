let cart = [];
let totalPrice = 0;
let discount = 0;
let orderNumber = null;


// Function to add item to cart
function addToCart(productName, price) {
  cart.push({ productName, price });
  totalPrice += price;
  displayCart();
}


// Function to remove item from cart
function removeFromCart(index) {
  const removedItem = cart.splice(index, 1)[0];
  totalPrice -= removedItem.price;
  displayCart();
}


// Function to display cart and total price
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const discountElement = document.getElementById("discount-price");
  const finalPriceElement = document.getElementById("final-price");
  const checkoutButton = document.getElementById("checkout");


  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${item.productName} - ₹${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });


  totalPriceElement.innerText = totalPrice;


  // Calculate discount (10% if total > ₹3000)
  if (totalPrice > 3000) {
    discount = totalPrice * 0.1;
  } else {
    discount = 0;
  }


  discountElement.innerText = discount;
  const finalPrice = totalPrice - discount;
  finalPriceElement.innerText = finalPrice;


  // Enable checkout button if there are items in the cart
  checkoutButton.disabled = cart.length === 0;
}


// Function to handle checkout click
function checkout() {
  const checkoutSection = document.getElementById("checkout-section");
  const cartSection = document.getElementById("cart");
  const orderConfirmationSection = document.getElementById("order-confirmation");


  // Hide cart and show checkout section
  cartSection.style.display = "none";
  checkoutSection.style.display = "block";
  orderConfirmationSection.style.display = "none";
}


// Function to handle order form submission
function submitOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;


  if (!name || !address || !phone || !email) {
    alert("Please fill out all fields.");
    return;
  }


  // Generate order number (just a random string for this example)
  orderNumber = "ORD" + Math.floor(Math.random() * 10000);
 
  // Hide checkout form and show order confirmation
  const checkoutSection = document.getElementById("checkout-section");
  const orderConfirmationSection = document.getElementById("order-confirmation");


  checkoutSection.style.display = "none";
  orderConfirmationSection.style.display = "block";


  // Display order details
  document.getElementById("order-number").innerText = orderNumber;
  document.getElementById("order-summary").innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Total Price:</strong> ₹${document.getElementById("final-price").innerText}</p>
  `;
  document.getElementById("tracking-link").innerText = "Track your order here!";
  document.getElementById("tracking-link").href = `https://www.example.com/track/${orderNumber}`;
}


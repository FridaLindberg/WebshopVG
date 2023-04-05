fillCart();
document.getElementById("checkout-btn").addEventListener("click", openOrderPage);
document.getElementById("cart-btn").addEventListener("click", openCart);
document.getElementById("shop-btn").addEventListener("click", closeCart);
document.getElementById("clear-btn").addEventListener("click", clearCart);

function openOrderPage() {
  setTimeout(() => {
    window.location.href = "order.html";
  }, 500);
}

var cartOpened = false;

function openCart() {
  if(!cartOpened){
    document.getElementById("cart").style.display = "block";
    cartOpened = true;
  }
  else {
    closeCart();
    cartOpened=false;
  }
  
}

function closeCart() {
  document.getElementById("cart").style.display = "none";
}

function clearCart() {
  document.getElementById("cart-table").innerHTML = `Your cart is empty`;
  document.getElementById("checkout-btn").style.display = "none";
  document.getElementById("clear-btn").style.display = "none";
  document.getElementById("price-box").style.display = "none";
  let cart = new Map(JSON.parse(localStorage.getItem("cart")));
  cart.forEach((amount, id) => {
    resetButtons(id);

  }); 
  localStorage.removeItem("cart");
  localStorage.removeItem("total price");
  localStorage.setItem("cart-count", 0);
  document.getElementById("cart-count").textContent = localStorage.getItem("cart-count");
}

function resetButtons(id) {
  document.getElementById("add-btn"+id).textContent = "Add to cart";
  document.getElementById("add-btn" + id).style.pointerEvents = "auto";
  document.getElementById("add-btn" + id).style.backgroundColor = "";
}


function fillCart() {
  let cart = new Map(JSON.parse(localStorage.getItem("cart")));
  var totalPrice = 0;

  if(cart.size<= 0) {
    clearCart();
  }

  else {
    document.getElementById("checkout-btn").style.display = "inline-block";
    document.getElementById("clear-btn").style.display = "inline-block";
    document.getElementById("price-box").style.display = "block";
    cart.forEach((amount, id) => {
      document.getElementById("cart-table").innerHTML = ``;
      const xhr = new XMLHttpRequest();
  
      xhr.open("GET", "https://fakestoreapi.com/products/" + id);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          //console.log(xhr.response); // OBS! En sträng
  
          const json = JSON.parse(xhr.response);
          console.log(json); // JSON-objekt
  
          let price = (json.price*amount).toFixed(2);
  
          document.getElementById("cart-table").innerHTML += `<tr id="cart-product${id}">
                      <td>
                        <img
                          id="product-img"
                          src="${json.image}"
                          alt="Product Image"
                          class="full-width"
                        />
                      </td>
                      <td>
                        <br />
                        <span id="product-name" class="thin">${json.title}</span>
                        <br />
                        <div class="flex-container">
                          <button class="flex-child amount-btn" onclick="changeAmount(${id}, -1)">-</button>
                          <div id="amount${id}" class="flex-child">${amount}</div>
                          <button class="flex-child amount-btn" onclick="changeAmount(${id}, 1)">+</button>
                        </div>
  
                      </td>
                      <td>
                        <br />
                        <div id="product-price${id}" class="price">$${price}</div>
                        <br />
                      </td>                   
                    </tr>
                    `;
          totalPrice += price;
          localStorage.setItem("total price", totalPrice);
          document.getElementById("total-price").textContent =
            "$" + (totalPrice + 4.95);
        }
      };
    });

  }
}

function addToCart(id) {
  let cart = new Map(JSON.parse(localStorage.getItem("cart")));
  cart.set(id, 1);
  localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  localStorage.setItem("cart-count", parseFloat(localStorage.getItem("cart-count"))+1);
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = localStorage.getItem("cart-count");
  document.getElementById("add-btn"+id).textContent = "Added";
  document.getElementById("add-btn" + id).style.pointerEvents = "none";
  document.getElementById("add-btn" + id).style.backgroundColor = "darkgreen";
  fillCart();
}

function changeAmount(id, operation) {
  let cart = new Map(JSON.parse(localStorage.getItem("cart")));
  cart.set(id, cart.get(id) + operation);
  if(cart.get(id)<=0){
    cart.delete(id);
    resetButtons(id);
    document.getElementById("cart-product"+id).style.display = "none";
      
  }
  document.getElementById("amount" + id).textContent = cart.get(id);
  localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  localStorage.setItem("cart-count",parseFloat(localStorage.getItem("cart-count")) + operation);
  document.getElementById("cart-count").textContent = localStorage.getItem("cart-count");
  changePrice(id, operation);
}

function changePrice(id, operation) {
  let cart = new Map(JSON.parse(localStorage.getItem("cart")));

  let amount = cart.get(id);

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://fakestoreapi.com/products/" + id);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //console.log(xhr.response); // OBS! En sträng

      const json = JSON.parse(xhr.response);
      console.log(json); // JSON-objekt

      let newPrice = json.price*amount;

      document.getElementById("product-price" + id).textContent =
        "$" + newPrice;

        let totalPrice = parseFloat(localStorage.getItem("total price"));

        totalPrice += json.price*operation;
        localStorage.setItem("total price", totalPrice);
        document.getElementById("total-price").textContent =
          "$" + (totalPrice + 4.95).toFixed(2);

          if(cart.size<= 0) {
            clearCart();
          }
    }
  };

  
}



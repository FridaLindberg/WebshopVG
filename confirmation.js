document.getElementById("shop-again").addEventListener("click", startOver);

function startOver() {
    localStorage.clear();
    setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
}

const images = document.getElementById("confirmation-images");
const products = document.getElementById("products-confirmation");

const shippingCost = 4.95;
const totalPrice = document.getElementById("total-price");

const name = document.getElementById("name");
const email = document.getElementById("e-mail");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const zipCode = document.getElementById("zip-code");
const city = document.getElementById("city");

totalPrice.textContent =
  "$" +
  (parseFloat(localStorage.getItem("total price")) + shippingCost).toFixed(2);

let cart = new Map(JSON.parse(localStorage.getItem("cart")));

cart.forEach((amount, id) => {
  
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://fakestoreapi.com/products/" + id);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //console.log(xhr.response); // OBS! En sträng

      const json = JSON.parse(xhr.response);
      console.log(json); // JSON-objekt
      let price = json.price*amount;
      products.innerHTML += `<div id="product-name" class="col-9">${json.title}</div>
            <div id="price" class="col-3">$${price}</div>`;
      images.innerHTML += `<img id="image" class="p-3 w-50 mx-auto" alt="Product" src="${json.image}" />`;
    }
  };
});

address.textContent = localStorage.getItem("address");
zipCode.textContent = localStorage.getItem("zip-code");
city.textContent = localStorage.getItem("city");

name.textContent = localStorage.getItem("name");
email.textContent = localStorage.getItem("e-mail");
phone.textContent = localStorage.getItem("phone");

localStorage.clear();


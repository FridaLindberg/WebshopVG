loadJSON();

if(localStorage.getItem("cart-count")==null){
    localStorage.setItem("cart-count", 0);
}
document.getElementById("cart-count").textContent = localStorage.getItem("cart-count");

function loadJSON() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.response);

      json.forEach((element) => {
        buildProduktCard(element);
      });
      showAddedProduct();
    }
  };
}

function buildProduktCard(json) {
  let price = json.price.toFixed(2);
  document.getElementById("output").innerHTML += `
    <div class="col-md-3 mb-5">
    <div class="card h-100">

        <!-- Product image-->
        <a target="_blank" href="${json.image}">
        <img class="our-images card-img-top" src=${json.image} alt="..." />
        </a>

        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${json.title}</h5>

            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">

        <!--Product Info-->
        <div class="overflow"> ${json.description}</div>
            
             <br>
             <!-- Product price-->
             <div class="text-center">$${price}</div> 
             
            <div class="text-center"><a id="add-btn${json.id}"class="btn btn-outline-dark mt-auto btn-homepage" onclick="addToCart(${json.id})">Add to cart</a></div>
        </div>
    </div>
</div>
`;

}

function showAddedProduct() {
  let cart = new Map(JSON.parse(localStorage.getItem("cart")));

  cart.forEach((amount, id) => {
    document.getElementById("add-btn"+id).textContent = "Added";
    document.getElementById("add-btn" + id).style.pointerEvents = "none";
    document.getElementById("add-btn" + id).style.backgroundColor = "darkgreen"; 
  });
}

// Jump to order page
function orderPage(id) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //console.log(xhr.response); // OBS! En sträng

      const json = JSON.parse(xhr.response);
      console.log(json); // JSON-objekt

      json.forEach((element) => {
        if (element.id == id) {
          localStorage.clear();

          console.log(element);

          localStorage.setItem("imgData", element.image);
          localStorage.setItem("nameData", element.title);
          localStorage.setItem("priceData", element.price);
          localStorage.setItem("descriptionData", element.description);
        }
      });
    }
  };

  setTimeout(() => {
    window.location.href = "order.html";
  }, 500);
}




if(localStorage.getItem("cart")==null){
  var cartContent = new Map();  
}
else {
  cartContent = new Map(JSON.parse(localStorage.getItem("cart")));
}













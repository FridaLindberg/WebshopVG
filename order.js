document.getElementById("submit").addEventListener("click", save);

document.getElementById("order-css").addEventListener("input", validate);

function validate() {
  if (
    document.getElementById("name").value.length < 2 ||
    document.getElementById("name").value.length > 50
  ) {
    document.getElementById("error-name").style.display = "block";
    return false;
  } else {
    document.getElementById("error-name").style.display = "none";
  }

  const mailPattern = /@/;

  if (
    !mailPattern.test(document.getElementById("e-mail").value) ||
    document.getElementById("e-mail").value.length > 50
  ) {
    document.getElementById("error-e-mail").style.display = "block";
    return false;
  } else {
    document.getElementById("error-e-mail").style.display = "none";
  }

  const pattern = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;

  if (!pattern.test(document.getElementById("phone").value)) {
    document.getElementById("error-phone").style.display = "block";
    return false;
  } else {
    document.getElementById("error-phone").style.display = "none";
  }

  if (document.getElementById("address").value.length > 50) {
    document.getElementById("error-address").style.display = "block";
    return false;
  } else {
    document.getElementById("error-address").style.display = "none";
  }

  const zipPattern = /^\d{3}\s\d{2}$/;

  if (!zipPattern.test(document.getElementById("zip-code").value)) {
    document.getElementById("error-zip-code").style.display = "block";
    return false;
  } else {
    document.getElementById("error-zip-code").style.display = "none";
  }

  if (document.getElementById("city").value.length > 50) {
    document.getElementById("error-city").style.display = "block";
    return false;
  } else {
    document.getElementById("error-city").style.display = "none";
  }

  console.log("rätt");

  return true;
}

function save() {
  if (validate()) {
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("e-mail", document.getElementById("e-mail").value);
    localStorage.setItem("phone", document.getElementById("phone").value);
    localStorage.setItem("address", document.getElementById("address").value);
    localStorage.setItem("zip-code", document.getElementById("zip-code").value);
    localStorage.setItem("city", document.getElementById("city").value);
    console.log("here");
    setTimeout(() => {
      window.location.href = "confirmation-page.html";
    }, 500);
  }
}

function fillOrderPage() {
    let cart = new Map(JSON.parse(localStorage.getItem("cart")));
    var totalPrice = 0;

    cart.forEach((amount, id) => {

      

        const xhr = new XMLHttpRequest();
  
        xhr.open("GET", "https://fakestoreapi.com/products/"+id);
        xhr.send();
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.response); // OBS! En sträng
  
            const json = JSON.parse(xhr.response);
            console.log(json); // JSON-objekt

            let price = json.price*amount;
  
                    document.getElementById("order-table").innerHTML += `<tr>
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
                        
                        <div id="amount${id}" class="flex-child">Amount: ${amount}</div>
                      </div>

                    </td>
                    <td>
                      <br />
                      <div id="product-price" class="price">$${price}</div>
                      <br />
                    </td>                   
                  </tr>
                  ` 
                  let totalPrice = parseFloat(localStorage.getItem("total price"));
                  document.getElementById("total-price").textContent = "$" + (totalPrice + 4.95).toFixed(2);
        }
        };
        
    });
    console.log(totalPrice);
    changePrice()
    
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
      }
    };
  
    
  }
  fillOrderPage();

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
    }
  };
}
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function buildProduktCard(json) {
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
             <div class="text-center">$${json.price}</div> 
             
            <div class="text-center"><a class="btn btn-outline-dark mt-auto btn-homepage" onclick="orderPage(${json.id})">Buy Product</a></div>
        </div>
    </div>
</div>
`;
}

// Jump to confirmation page
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

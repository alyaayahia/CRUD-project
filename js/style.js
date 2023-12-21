var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDesc = document.getElementById("productDesc");
var productCat = document.getElementById("productCat");
var btn = document.getElementById("btn");
var tableRow = document.getElementById("tableRow");
var productList = [];
if (localStorage.getItem("storageProduct")) {
  productList = JSON.parse(localStorage.getItem("storageProduct"));
  display(productList);
}
btn.onclick = function () {
  if (btn.innerHTML == "add Product") {
    addProduct();
  } else if (btn.innerHTML == "Update") {
    upDateProducts();
  }
  display(productList);
  clear();
};
function addProduct() {
  var product = {
    productName: productName.value,
    productPrice: productPrice.value,
    productDesc: productDesc.value,
    productCat: productCat.value,
  };
  productList.push(product);
  localStorage.setItem("storageProduct", JSON.stringify(productList));
  /*  console.log("hi"); */
}
function display(arr) {
  var box = "";

  for (var i = 0; i < arr.length; i++) {
    box += `
      
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].productName}</td>
        <td>${arr[i].productPrice}</td>
        <td>${arr[i].productDesc}</td>
        <td>${arr[i].productCat}</td>
        <td>
          <button class="btn btn-danger text-white" id="Delete" type="button" onclick="Delete(${i})">
            Delete
          </button>
        </td>
        <td>
          <button class="btn btn-warning text-white" id="updata" type="button" onclick="upData(${i})">
            Update
          </button>
        </td>
      </tr>
      `;
  }
  tableRow.innerHTML = box;
}
function clear() {
  productName.value = "";
  productPrice.value = "";
  productDesc.value = "";
  productCat.value = "";
}
function Delete(index) {
  productList.splice(index, 1);
  localStorage.setItem("storageProduct", JSON.stringify(productList));
  display(productList);
}
function searchProducts(term) {
  var matchProduct = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].productName.toLowerCase().includes(term.toLowerCase())) {
      matchProduct.push(productList[i]);
    }
  }
  display(matchProduct);
}
var currentIndex;
function upData(index) {
  /* currentIndex = index; */
  productName.value = productList[index].productName;
  productPrice.value = productList[index].productPrice;
  productDesc.value = productList[index].productDesc;
  productCat.value = productList[index].productCat;
  btn.innerHTML = "Update";
  currentIndex = index;
}

function upDateProducts() {
  productList[currentIndex].productName = productName.value;
  productList[currentIndex].productPrice = productPrice.value;
  productList[currentIndex].productDesc = productDesc.value;
  productList[currentIndex].productCat = productCat.value;
  btn.innerHTML = " add Product";
  localStorage.setItem("storageProduct", JSON.stringify(productList));
  display(productList);
}

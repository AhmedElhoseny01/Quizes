var proContainer = [];
var updateIndex = -1; 

if (JSON.parse(localStorage.getItem("Products")) != null) {
  proContainer = JSON.parse(localStorage.getItem("Products"));
  disPro();
}

var proName = document.getElementById("proName");
var proPrice = document.getElementById("proPrice");
var proCategory = document.getElementById("proCategory");
var proDesc = document.getElementById("proDesc");
var proSearch = document.getElementById("proSearch");
var btn = document.getElementById("btn");

btn.onclick = function () {
  var pro = {
    name: proName.value,
    price: proPrice.value,
    category: proCategory.value,
    desc: proDesc.value,
  };

  if (updateIndex === -1) {

    proContainer.push(pro);
  } else {
    proContainer[updateIndex] = pro;
    updateIndex = -1;
    btn.innerHTML = "Add Product"; 
  }

  localStorage.setItem("Products", JSON.stringify(proContainer));
  disPro();
  clearInputs();
};

function disPro() {
  var AllPro = ``;
  for (let i = 0; i < proContainer.length; i++) {
    AllPro += `
            <tr>
                <td>${i + 1}</td>
                <td>${proContainer[i].name}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].category}</td>
                <td>${proContainer[i].desc}</td>
                <td>
                  <button onclick="delPro(${i})" class="btn delete">Delete</button>
                  <button onclick="setUpdate(${i})" class="btn update">Update</button>
                </td>
              </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = AllPro;
}

function delPro(index) {
  proContainer.splice(index, 1);
  localStorage.setItem("Products", JSON.stringify(proContainer));
  disPro();
}

function setUpdate(index) {
  proName.value = proContainer[index].name;
  proPrice.value = proContainer[index].price;
  proCategory.value = proContainer[index].category;
  proDesc.value = proContainer[index].desc;

  btn.innerHTML = "Update Product";
  updateIndex = index;
}

function clearInputs() {
  proName.value = "";
  proPrice.value = "";
  proCategory.value = "";
  proDesc.value = "";
}

proSearch.onkeyup = function () {
  searchPro(proSearch.value);
};

function searchPro(proNam) {
  var AllPro = ``;
  for (let i = 0; i < proContainer.length; i++) {
    if (proContainer[i].name.toLowerCase().includes(proNam.toLowerCase())) {
      AllPro += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${proContainer[i].name}</td>
                    <td>${proContainer[i].price}</td>
                    <td>${proContainer[i].category}</td>
                    <td>${proContainer[i].desc}</td>
                    <td>
                      <button onclick="delPro(${i})" class="btn delete">Delete</button>
                      <button onclick="setUpdate(${i})" class="btn update">Update</button>
                    </td>
                  </tr>
            `;
    }
  }
  document.getElementById("tbody").innerHTML = AllPro;
}
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/blocks/formular-comanda/api.js ***!
  \********************************************/
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://lasercut.internetguru.io/api/v2/analyze?id=mos";
  const orderForm = document.getElementById("mos-order-form");
  const formGroup = document.querySelector(".order-form-group");
  const totalPriceElm = document.getElementById("order-form-total-price");
  const data = [];
  const loader = "...";
  let totalPrice = null;

  // Init data
  const initData = (id, group) => {
    data[id] = {
      group: group,
      status: null,
      price: null,
      lastMod: null,
      material: null,
      quantity: null,
      file: null,
      fileHash: null,
      fileURL: null,
      fileWidth: null,
      fileHeight: null,
      productPrice: null,
      addedGroup: false,
      valid: false
    };
  };

  // Listen for form group change
  const formGroupListener = (group, id) => {
    group.addEventListener("change", () => {
      getResult(id);
    });
  };
  const updateGroup = id => {
    totalPrice = 0;
    data.forEach(group => {
      if (group === null || group.prices === null) {
        return;
      }
      if (id && id === group.group.getAttribute("data-id")) {
        group.status.innerHTML = loader;
      }
      const materialSelect = group.group.querySelector(".order-form-material");
      if (materialSelect.children.length == 1) {
        materialSelect.innerHTML = "";
        group.prices.forEach(priceData => {
          const option = document.createElement("option");
          option.value = priceData.material_id;
          option.innerHTML = `${priceData.material_name}`;
          option.setAttribute("data-name", priceData.material_name);
          materialSelect.appendChild(option);
        });
      }
      const quantity = group.group.querySelector(".order-form-quantity").value;
      const price = group.prices[materialSelect.selectedIndex].unit_price * quantity + group.prices[materialSelect.selectedIndex].fix_price;
      setTimeout(() => {
        group.status.innerHTML = `${Math.round(price)} RON`;
      }, 300);
      let width = Math.round(group.fileWidth);
      let height = Math.round(group.fileHeight);
      group.group.querySelector(".order-form-dimensions").innerHTML = `${width} x ${height} mm`;
      group.group.productPrice = price;
      totalPrice += price;
      group.material = materialSelect[materialSelect.selectedIndex].getAttribute("data-name");
    });
    totalPriceElm.innerHTML = `${Math.round(totalPrice)} RON`;
  };

  // Update form group
  const getResult = id => {
    const group = data[id].group;
    const groupFile = group.querySelector(".order-form-file");
    const groupMaterial = group.querySelector(".order-form-material");
    const groupQuantity = group.querySelector(".order-form-quantity");
    const formStatus = group.querySelector(".order-form-status");

    // Get material & quantity values
    const groupMaterialValue = groupMaterial.value;
    const groupQuantityValue = groupQuantity.value;

    // Get material name
    const groupMaterialName = groupMaterial.options[groupMaterial.selectedIndex].text;

    // Get file
    let file = null;
    if (data[id].file == null) {
      if (!groupFile.value) {
        formStatus.innerHTML = "No file selected.";
        return;
      }
      file = groupFile.files[0];
    } else {
      file = data[id].file;
    }

    // Check if quantity is valid
    if (groupQuantityValue < 1 || groupQuantityValue > 100) {
      formStatus.innerHTML = "Quantity must be between 1 and 100.";
      return;
    }
    const fileName = file.name;
    const lastMod = file.lastModified + fileName;

    // Set quantity
    data[id].quantity = groupQuantityValue;
    if (data[id].lastMod !== lastMod) {
      data[id].status = formStatus;
      data[id].material = groupMaterialValue;
      data[id].lastMod = lastMod;
      const form = new FormData();
      form.append("material", groupMaterialValue);
      form.append("amount", groupQuantityValue);
      if (data[id].valid && data[id].fileHash !== null) {
        form.append("hash", data[id].fileHash);
      } else {
        form.append("dxf_file", file, fileName);
      }
      formStatus.innerHTML = loader;
      fetch(apiUrl, {
        method: "POST",
        body: form
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(text => {
          throw new Error(text.message);
        });
      }).then(result => {
        data[id].prices = result.prices;
        data[id].materialPrices = result.prices;
        data[id].fileHash = result.file_hash;
        data[id].fileURL = result.file_path;
        data[id].fileWidth = result.model_width;
        data[id].fileHeight = result.model_height;
        data[id].file = file;
        data[id].valid = true;
        if (!data[id].group) {
          // add new group
          data[id].addedGroup = true;
        }
        updateGroup(id);
      }).catch(error => {
        console.log(error);
        formStatus.innerHTML = error;
        data[id].lastMod = null;
        data[id].valid = false;
      });
      return;
    }
    data[id].material = groupMaterialValue;
    updateGroup(id);
    data[id].valid = true;
  };
  const init = () => {
    initData(0, formGroup);
    formGroupListener(formGroup, 0);
  };
  init();

  // submit form
  orderForm.addEventListener("submit", event => {
    const formData = new FormData(orderForm);
    const request = new XMLHttpRequest();
    request.open("POST", mos_auth_rest.order, true);
    request.onload = () => {
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);
        console.log(response);
      } else {
        console.log("error");
      }
    };
    request.send(formData);
    event.preventDefault();
  });
  orderForm.reset();
});
/******/ })()
;
//# sourceMappingURL=api.js.map
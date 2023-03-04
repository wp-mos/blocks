/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/blocks/formular-comanda/api.js ***!
  \********************************************/
document.addEventListener("DOMContentLoaded", () => {
  let totalPrice = null;
  let filesData = [];
  let lastWrapperId = 0;
  let totalPriceElm = null;
  const orderForm = document.getElementById("mos-order-form");
  function addFileWrapperListener(fileWrapper, wrapId) {
    fileWrapper.addEventListener("change", event => {
      calculatePrice(wrapId);
    });
    fileWrapper.querySelector(".form-quantity").addEventListener("keydown", event => {
      if (event.key === "Enter") {
        calculatePrice(wrapId);
        event.preventDefault();
      }
      if (event.keyCode == 9) {
        calculatePrice(wrapId);
      }
    });
  }
  function addFileWrapper(fileWrapper, wrapId) {
    let newWrapper = fileWrapper.cloneNode(true);
    lastWrapperId++;
    initFilesData(lastWrapperId, newWrapper);
    newWrapper.setAttribute("data-filenum", lastWrapperId);
    newWrapper.querySelector(".form-file-status").innerHTML = "-";
    newWrapper.querySelector(".form-file").value = "";
    newWrapper.querySelector(".form-quantity").value = 1;
    newWrapper.querySelector(".form-size").innerHTML = "-";
    fileWrapper.querySelector(".col").insertAdjacentHTML("beforeend", `<a class="form-del btn btn-outline-dark border-0 w-auto mt-0 position-absolute top-0 end-0" data-id="${wrapId}" href="Javascript:void(0);"><span class="bi-x-lg"></span></a>`);
    fileWrapper.querySelector(".form-file-status").insertAdjacentHTML("afterend", `<div><div></div><a class="form-calc btn btn-primary btn-sm" title="Recalculate" href="Javascript:void(0);"><span class="bi-arrow-clockwise fs-5"></span></a></div>`);
    let fileInput = fileWrapper.querySelector(".form-file");
    let fileName = document.createElement("p");
    fileName.className = "mt-2 mb-0";
    fileName.innerHTML = fileInput.files[0].name;
    fileInput.parentNode.replaceChild(fileName, fileInput);
    fileWrapper.querySelector(".form-del").addEventListener("click", event => {
      filesData[event.currentTarget.getAttribute("data-id")] = null;
      fileWrapper.parentNode.removeChild(fileWrapper);
      updateForm();
    });
    fileWrapper.querySelector(".form-calc").addEventListener("click", event => {
      calculatePrice(wrapId);
    });
    addFileWrapperListener(newWrapper, lastWrapperId);
    fileWrapper.parentNode.insertBefore(newWrapper, fileWrapper.nextElementSibling);
  }
  function initFilesData(wrapperId, wrapperElm) {
    filesData[wrapperId] = {
      fileWrapper: wrapperElm,
      status: null,
      lastMod: null,
      material: null,
      quantity: null,
      file: null,
      fileHash: null,
      fileURL: null,
      fileWidth: null,
      fileHeight: null,
      productPrice: null,
      addedWrapper: false,
      valid: false
    };
  }
  function formatPrice(num) {
    return num.toLocaleString();
  }
  function formatSize(num) {
    return Math.round(num);
  }
  function updateForm(wrapId) {
    totalPrice = 0;
    filesData.forEach(file => {
      if (file == null || file.prices == null) {
        return;
      }
      if (wrapId !== undefined && wrapId == file.fileWrapper.getAttribute("data-filenum")) {
        file.status.innerHTML = loader;
      }
      const materialSelect = file.fileWrapper.querySelector(".form-material");
      if (materialSelect.children.length == 1) {
        materialSelect.innerHTML = "";
        file.prices.forEach(priceData => {
          var option = document.createElement("option");
          option.value = priceData.material_id;
          option.innerHTML = `${priceData.material_name}`;
          option.setAttribute("data-name", priceData.material_name);
          materialSelect.appendChild(option);
        });
      }
      const quantity = file.fileWrapper.querySelector(".form-quantity").value;
      const price = file.prices[materialSelect.selectedIndex].unit_price * quantity + file.prices[materialSelect.selectedIndex].fix_price;
      setTimeout(() => {
        file.status.innerHTML = `${formatPrice(price)} RON`;
      }, 400);
      let width = formatSize(file.fileWidth);
      let height = formatSize(file.fileHeight);
      file.fileWrapper.querySelector(".form-size").innerHTML = `${width} x ${height}`;
      file.productPrice = price;
      totalPrice += price;
      file.material = materialSelect[materialSelect.selectedIndex].getAttribute("data-name");
    });
    totalPriceElm.innerHTML = `${formatPrice(totalPrice)} RON`;
  }
  function getValidFilesCnt() {
    let cnt = 0;
    filesData.forEach(file => {
      if (file == null) {
        return;
      }
      if (!file.valid) {
        return;
      }
      cnt++;
    });
    return cnt;
  }
  function calculatePrice(wrapId) {
    const fileWrapper = filesData[wrapId].fileWrapper;
    const fileInputElement = fileWrapper.querySelector(".form-file");
    const material = fileWrapper.querySelector(".form-material").value;
    const materialName = fileWrapper.querySelector(".form-material").selectedOptions[0].text;
    const quantity = fileWrapper.querySelector(".form-quantity").value;
    const status = fileWrapper.querySelector(".form-file-status");
    let file = null;
    if (filesData[wrapId].file == null) {
      if (!fileInputElement.value) {
        status.innerHTML = "Choose file";
        return false;
      }
      file = fileInputElement.files[0];
    } else {
      file = filesData[wrapId].file;
    }
    if (quantity < 1 || quantity > 100) {
      status.innerHTML = "Quantity must be between 1 and 100";
      return false;
    }
    const fileName = file.name;
    const lastMod = file.lastModified + fileName;
    filesData[wrapId].quantity = quantity;
    if (filesData[wrapId].lastMod !== lastMod) {
      filesData[wrapId].status = status;
      filesData[wrapId].material = materialName;
      filesData[wrapId].lastMod = lastMod;
      const form = new FormData();
      form.append("material", material);
      form.append("amount", quantity);
      if (filesData[wrapId].valid && filesData[wrapId].fileHash !== null) {
        form.append("hash", filesData[wrapId].fileHash);
      } else {
        form.append("dxf_file", file, fileName);
      }
      status.innerHTML = loader;
      fetch(apiUrl, {
        method: "post",
        body: form
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(text => {
          throw new Error(text.message);
        });
      }).then(result => {
        // filesData[wrapId].productPrice = parseInt(result.price)
        filesData[wrapId].prices = result.prices;
        filesData[wrapId].materialPrices = result.prices;
        filesData[wrapId].fileHash = result.file_hash;
        filesData[wrapId].fileURL = result.filew_path;
        filesData[wrapId].fileWidth = result.model_width;
        filesData[wrapId].fileHeight = result.model_height;
        filesData[wrapId].file = file;
        filesData[wrapId].valid = true;
        // if (!filesData[wrapId].addedWrapper) {
        // addFileWrapper(fileWrapper, wrapId);
        // filesData[wrapId].addedWrapper = true;
        // }
        updateForm(wrapId);
      }).catch(error => {
        alert(error);
        status.innerHTML = "-";
        filesData[wrapId].lastMod = null;
        filesData[wrapId].valid = false;
      });
      return;
    }
    filesData[wrapId].material = quantity;
    filesData[wrapId].material = materialName;
    updateForm(wrapId);
    filesData[wrapId].valid = true;
  }
  const loader = "...";
  const fileWrapper = document.querySelector(".form-group");
  const apiUrl = "https://lasercut.internetguru.io/api/v2/analyze?id=mos";
  initFilesData(0, fileWrapper);
  totalPriceElm = document.getElementById("order-price");
  addFileWrapperListener(fileWrapper, 0);
  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(orderForm);
    filesData.forEach(data => {
      formData.append("price", data.productPrice);
    });
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
  };
  orderForm.addEventListener("submit", handleSubmit);
  orderForm.reset();
});
/******/ })()
;
//# sourceMappingURL=api.js.map
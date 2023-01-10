/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/blocks/order-form/frontend.js ***!
  \*******************************************/
document.addEventListener("DOMContentLoaded", () => {
  // TODO check valid
  let valid = true;
  let speed = null;
  let delivery = null;
  let totalPrice = null;
  let totalPriceDph = null;
  let status = null;
  let customer = [];
  let filesData = [];
  let lastWrapperId = 0;
  let totalPriceElm = null;
  let totalPriceDphElm = null;
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
    newWrapper.querySelector(".form-filestatus").innerHTML = "–";
    newWrapper.querySelector(".form-file").value = "";
    newWrapper.querySelector(".form-quantity").value = 1;
    newWrapper.querySelector(".form-size").innerHTML = "–";
    // newWrapper.querySelector('.form-fileid').innerHTML = '–'
    fileWrapper.querySelector(".col").insertAdjacentHTML("beforeend", `<a class="form-del btn btn-outline-dark border-0 w-auto mt-0 position-absolute top-0 end-0" data-id="${wrapId}" href="Javascript:void(0);"><span class="bi-x-lg"></span></a>`);
    fileWrapper.querySelector(".form-filestatus").insertAdjacentHTML("afterend", `<div><div></div><a class="form-calc btn btn-primary btn-sm" title="Recalculate" href="Javascript:void(0);"><span class="bi-arrow-clockwise fs-5"></span></a></div>`);
    fileInput = fileWrapper.querySelector(".form-file");
    fileName = document.createElement("p");
    fileName.className = "mt-2 mb-0";
    fileName.innerHTML = `<strong>${fileInput.files[0].name}</strong> a fost incarcat cu succes!`;
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
    return num.toLocaleString("cs-CZ");
  }
  function formatSize(num) {
    return Math.round(num);
    //return num.replace(/\..*$/, '')
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
      var materialSelect = file.fileWrapper.querySelector(".form-material");
      if (materialSelect.children.length == 1) {
        materialSelect.innerHTML = "";
        file.prices.forEach(priceData => {
          var option = document.createElement("option");
          option.value = priceData.material_id;
          // option.innerHTML = `${priceData.materialName} (`
          // + formatPrice(priceData.fixPrice) + ' Kč fix + '
          // + formatPrice(priceData.unitPrice) + ` Kč za 1 ks)`
          option.innerHTML = `${priceData.material_name}`;
          option.setAttribute("data-name", priceData.material_name);
          materialSelect.appendChild(option);
        });
      }
      var quantity = file.fileWrapper.querySelector(".form-quantity").value;
      var price = file.prices[materialSelect.selectedIndex].unit_price * quantity + file.prices[materialSelect.selectedIndex].fix_price;
      setTimeout(() => {
        file.status.innerHTML = `${formatPrice(price)} €`;
      }, 400);
      width = formatSize(file.fileWidth);
      height = formatSize(file.fileHeight);
      file.fileWrapper.querySelector(".form-size").innerHTML = `${width} × ${height}`;
      // file.fileWrapper.querySelector('.form-fileid').innerHTML = `${file.fileHash}`
      file.productPrice = price;
      totalPrice += price;
      file.material = materialSelect[materialSelect.selectedIndex].getAttribute("data-name");
    });
    //totalPrice = Math.round(totalPrice * speed)
    //totalPriceDph = Math.round(totalPrice * 1.21)
    totalPriceElm.innerHTML = `${formatPrice(totalPrice)} €`;
  }
  function getValidFilesCnt() {
    cnt = 0;
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
    const status = fileWrapper.querySelector(".form-filestatus");
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
      var form = new FormData();
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
        if (!filesData[wrapId].addedWrapper) {
          addFileWrapper(fileWrapper, wrapId);
          filesData[wrapId].addedWrapper = true;
        }
        updateForm(wrapId);
      }).catch(error => {
        alert(error);
        status.innerHTML = "–";
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
  function saveFormData(form) {
    const formData = new FormData(form);
    for (let [name, value] of formData) {
      var label = document.querySelector(`label[for="${name}"]`).innerHTML;
      customer.push({
        key: name,
        value: value,
        label: label
      });
      const varname = document.getElementById(name).getAttribute("data-varname");
      if (varname) {
        window[varname] = value;
      }
    }
  }
  const loader = "…";
  const fileWrapper = document.querySelector(".form-group");
  const id = "mos";
  const apiUrl = "https://lasercut.internetguru.io/api/v2/analyze" + (id ? "?id=" + id : "");
  initFilesData(0, fileWrapper);
  totalPriceElm = document.getElementById("order-price");
  addFileWrapperListener(fileWrapper, 0);
  fileWrapper.addEventListener("submit", event => {
    event.preventDefault();
    if (getValidFilesCnt() == 0) {
      // TODO highlight error
      return false;
    }
    var msg = document.querySelector(".status-message");
    if (msg) {
      msg.parentNode.removeChild(msg);
    }
  });
  document.querySelector(".form-placeholder").style.display = "none";
  document.querySelector(".form-placeholder + form").style.display = "block";
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map
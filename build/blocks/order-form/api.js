/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/blocks/order-form/api.js ***!
  \**************************************/
document.addEventListener("DOMContentLoaded", () => {
  // TODO check valid
  let totalPrice = null;
  let customer = [];
  let filesData = [];
  let lastWrapperId = 0;
  let totalPriceElm = null;
  const loader = '…';
  const formGroup = document.querySelector('.form-group');
  const apiUrl = 'https://lasercut.internetguru.io/api/v2/analyze?id=mos';
  function addFileGroupListener(formGroup, fileGroupId) {
    formGroup.addEventListener('change', event => {
      calculatePrice(fileGroupId);
    });
    formGroup.querySelector(".form-quantity").addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        calculatePrice(fileGroupId);
        event.preventDefault();
      }
      if (event.keyCode == 9) {
        calculatePrice(fileGroupId);
      }
    });
  }
  function addFileWrapper(formGroup, fileGroupId) {
    let newWrapper = formGroup.cloneNode(true);
    lastWrapperId++;
    initFilesData(lastWrapperId, newWrapper);
    newWrapper.setAttribute('data-filenum', lastWrapperId);
    newWrapper.querySelector('.form-filestatus').innerHTML = '–';
    newWrapper.querySelector(".form-file").value = '';
    newWrapper.querySelector(".form-quantity").value = 1;
    newWrapper.querySelector(".form-size").innerHTML = '–';
    // newWrapper.querySelector('.form-fileid').innerHTML = '–'
    formGroup.querySelector('.form-wrapper').insertAdjacentHTML('beforeend', `<a class="form-del btn btn-outline-dark border-0 w-auto mt-0 position-absolute top-0 end-0" data-id="${fileGroupId}" href="Javascript:void(0);"><span class="bi-x-lg"></span></a>`);
    formGroup.querySelector('.form-filestatus').insertAdjacentHTML('afterend', `<div><div></div><a class="form-calc btn btn-primary btn-sm" title="Recalculate" href="Javascript:void(0);"><span class="bi-arrow-clockwise fs-5"></span></a></div>`);
    fileInput = formGroup.querySelector(".form-file");
    fileName = document.createElement('p');
    fileName.className = "mt-2 mb-0";
    fileName.innerHTML = fileInput.files[0].name;
    fileInput.parentNode.replaceChild(fileName, fileInput);
    formGroup.querySelector('.form-del').addEventListener('click', event => {
      filesData[event.currentTarget.getAttribute('data-id')] = null;
      formGroup.parentNode.removeChild(formGroup);
      updateForm();
    });
    formGroup.querySelector(".form-calc").addEventListener('click', event => {
      calculatePrice(fileGroupId);
    });
    addFileGroupListener(newWrapper, lastWrapperId);
    formGroup.parentNode.insertBefore(newWrapper, formGroup.nextElementSibling);
  }
  function initFilesData(formGroupId, formGroup) {
    filesData[formGroupId] = {
      formGroup: formGroup,
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
    return num.toLocaleString('cs-CZ');
  }
  function formatSize(num) {
    return Math.round(num);
    //return num.replace(/\..*$/, '')
  }

  function updateForm(fileGroupId) {
    totalPrice = 0;
    filesData.forEach(file => {
      if (file == null || file.prices == null) {
        return;
      }
      if (fileGroupId !== undefined && fileGroupId == file.formGroup.getAttribute('data-filenum')) {
        file.status.innerHTML = loader;
      }
      var materialSelect = file.formGroup.querySelector('.form-material');
      if (materialSelect.children.length == 1) {
        materialSelect.innerHTML = '';
        file.prices.forEach(priceData => {
          var option = document.createElement('option');
          option.value = priceData.material_id;
          option.innerHTML = `${priceData.material_name}`;
          option.setAttribute('data-name', priceData.material_name);
          materialSelect.appendChild(option);
        });
      }
      var quantity = file.formGroup.querySelector('.form-quantity').value;
      var price = file.prices[materialSelect.selectedIndex].unit_price * quantity + file.prices[materialSelect.selectedIndex].fix_price;
      setTimeout(() => {
        file.status.innerHTML = `${formatPrice(price)} €`;
      }, 400);
      width = formatSize(file.fileWidth);
      height = formatSize(file.fileHeight);
      file.formGroup.querySelector('.form-size').innerHTML = `${width} × ${height}`;
      file.productPrice = price;
      totalPrice += price;
      file.material = materialSelect[materialSelect.selectedIndex].getAttribute('data-name');
    });
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
  function calculatePrice(fileGroupId) {
    const formGroup = filesData[fileGroupId].formGroup;
    const fileInputElement = formGroup.querySelector(".form-file");
    const material = formGroup.querySelector(".form-material").value;
    const materialName = formGroup.querySelector(".form-material").selectedOptions[0].text;
    const quantity = formGroup.querySelector(".form-quantity").value;
    const status = formGroup.querySelector('.form-filestatus');
    let file = null;
    if (filesData[fileGroupId].file == null) {
      if (!fileInputElement.value) {
        status.innerHTML = 'Choose file';
        return false;
      }
      file = fileInputElement.files[0];
    } else {
      file = filesData[fileGroupId].file;
    }
    if (quantity < 1 || quantity > 100) {
      status.innerHTML = 'Quantity must be between 1 and 100';
      return false;
    }
    const fileName = file.name;
    const lastMod = file.lastModified + fileName;
    filesData[fileGroupId].quantity = quantity;
    if (filesData[fileGroupId].lastMod !== lastMod) {
      filesData[fileGroupId].status = status;
      filesData[fileGroupId].material = materialName;
      filesData[fileGroupId].lastMod = lastMod;
      var form = new FormData();
      form.append("material", material);
      form.append("amount", quantity);
      if (filesData[fileGroupId].valid && filesData[fileGroupId].fileHash !== null) {
        form.append("hash", filesData[fileGroupId].fileHash);
      } else {
        form.append("dxf_file", file, fileName);
      }
      status.innerHTML = loader;
      fetch(apiUrl, {
        method: 'post',
        body: form
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(text => {
          throw new Error(text.message);
        });
      }).then(result => {
        filesData[fileGroupId].prices = result.prices;
        filesData[fileGroupId].materialPrices = result.prices;
        filesData[fileGroupId].fileHash = result.file_hash;
        filesData[fileGroupId].fileURL = result.filew_path;
        filesData[fileGroupId].fileWidth = result.model_width;
        filesData[fileGroupId].fileHeight = result.model_height;
        filesData[fileGroupId].file = file;
        filesData[fileGroupId].valid = true;
        if (!filesData[fileGroupId].addedWrapper) {
          addFileWrapper(formGroup, fileGroupId);
          filesData[fileGroupId].addedWrapper = true;
        }
        updateForm(fileGroupId);
      }).catch(error => {
        alert(error);
        status.innerHTML = '–';
        filesData[fileGroupId].lastMod = null;
        filesData[fileGroupId].valid = false;
      });
      return;
    }
    filesData[fileGroupId].material = quantity;
    filesData[fileGroupId].material = materialName;
    updateForm(fileGroupId);
    filesData[fileGroupId].valid = true;
  }
  initFilesData(0, formGroup);
  totalPriceElm = document.getElementById("order-price");
  addFileGroupListener(formGroup, 0);
  formGroup.addEventListener('submit', event => {
    event.preventDefault();
    if (getValidFilesCnt() == 0) {
      // TODO highlight error
      return false;
    }
    var msg = document.querySelector('.status-message');
    if (msg) {
      msg.parentNode.removeChild(msg);
    }
  });
  document.querySelector('.form-placeholder').style.display = 'none';
  document.querySelector('.form-placeholder + form').style.display = 'block';
});
/******/ })()
;
//# sourceMappingURL=api.js.map
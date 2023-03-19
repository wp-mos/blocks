/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/blocks/order-form-old/api.js ***!
  \******************************************/
document.addEventListener("DOMContentLoaded", () => {
  let totalPrice = null;
  let filesData = [];
  let lastWrapperId = 0;
  let totalPriceElm = null;
  const loader = "…";
  const formGroup = document.querySelector(".form-group");
  const apiUrl = "https://lasercut.internetguru.io/api/v2/analyze?id=mos";
  const orderForm = document.getElementById("mos-order-form");

  /** ****************************************************************************************** **/
  // sof: init files data
  /** ****************************************************************************************** **/
  const initFilesData = (formGroupId, formGroup) => {
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
  };
  const formatPrice = num => {
    return num.toLocaleString();
  };
  const formatSize = num => {
    return Math.round(num);
  };
  const getValidFilesCnt = () => {
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
  };
  /** ****************************************************************************************** **/

  /** ****************************************************************************************** **/
  // sof: blocks
  /** ****************************************************************************************** **/
  // close all blocks
  const closeAllBlocks = blocks => {
    blocks.forEach(block => {
      block.classList.add("disabled");
    });
  };

  // open first blocks
  const openFirstBlock = blocks => {
    blocks.forEach((block, index) => {
      index !== 0 ? block.classList.add("disabled") : block.classList.remove("disabled");
    });
  };

  // close block
  const closeBlock = (blocks, id) => {
    blocks.forEach((block, index) => {
      if (index === id) {
        block.classList.add("disabled");
      } else if (index === id + 1) {
        block.classList.remove("disabled");
      } else if (index === 2) {
        block.classList.add("disabled");
      }
    });
  };
  /** ****************************************************************************************** **/

  /** ****************************************************************************************** **/
  // sof: init form blocks
  /** ****************************************************************************************** **/
  const initFormBlocks = formGroup => {
    const formBlocks = formGroup.querySelectorAll(".form-block");
    const formUploadFile = formGroup.querySelector(".form-file");
    const formSelectMaterial = formGroup.querySelector(".form-select");
    const formQuantity = formGroup.querySelector(".form-quantity");
    closeAllBlocks(formBlocks);
    openFirstBlock(formBlocks);
    formBlocks.forEach((block, index) => {
      const blockHeader = block.querySelector(".form-block-header");
      blockHeader.addEventListener("click", event => {
        event.preventDefault();
        const {
          currentTarget
        } = event;
        closeAllBlocks(formBlocks);
        if (+currentTarget.id === index) {
          block.classList.remove("disabled");
        } else {
          block.classList.add("disabled");
        }
      });
    });
    formUploadFile.addEventListener("change", event => {
      event.preventDefault();
      closeBlock(formBlocks, +formUploadFile.dataset.id);
    });
    formSelectMaterial.addEventListener("change", event => {
      event.preventDefault();
      closeBlock(formBlocks, +formSelectMaterial.dataset.id);
    });
    formQuantity.addEventListener("change", event => {
      event.preventDefault();
      closeBlock(formBlocks, +formQuantity.dataset.id);
    });
  };

  // FORM GROUP LISTENER
  const addFileGroupListener = (formGroup, fileGroupId) => {
    formGroup.addEventListener("change", event => {
      calculatePrice(fileGroupId);
    });
    initFormBlocks(formGroup);
  };
  const addFormGroup = (formGroup, fileGroupId) => {
    let newWrapper = formGroup.cloneNode(true);
    lastWrapperId++;
    initFilesData(lastWrapperId, newWrapper);
    newWrapper.setAttribute("data-filenum", lastWrapperId);
    newWrapper.querySelector(".form-filestatus").innerHTML = "-";
    newWrapper.querySelector(".form-file").value = "";
    newWrapper.querySelector(".form-quantity").value = 1;
    newWrapper.querySelector(".form-size").innerHTML = "-";
    formGroup.querySelector(".form-wrapper").insertAdjacentHTML("beforeend", `<a class="form-del" data-id="${fileGroupId}" href="Javascript:void(0);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 18L6 6" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>`);
    fileInput = formGroup.querySelector(".form-file");
    fileName = document.createElement("p");
    fileName.className = "mt-2 mb-0";
    fileName.innerHTML = fileInput.files[0].name;
    fileInput.parentNode.replaceChild(fileName, fileInput);
    formGroup.querySelector(".form-del").addEventListener("click", event => {
      filesData[event.currentTarget.getAttribute("data-id")] = null;
      formGroup.parentNode.removeChild(formGroup);
      updateForm();
    });
    addFileGroupListener(newWrapper, lastWrapperId);
    formGroup.parentNode.insertBefore(newWrapper, formGroup.nextElementSibling);
  };

  /** ****************************************************************************************** **/
  // sof: update form
  /** ****************************************************************************************** **/
  const updateForm = fileGroupId => {
    totalPrice = 0;
    filesData.forEach(file => {
      if (file == null || file.prices == null) {
        return;
      }
      if (fileGroupId !== undefined && fileGroupId == file.formGroup.getAttribute("data-filenum")) {
        file.status.innerHTML = loader;
      }
      var materialSelect = file.formGroup.querySelector(".form-material");
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
      var quantity = file.formGroup.querySelector(".form-quantity").value;
      var price = file.prices[materialSelect.selectedIndex].unit_price * quantity + file.prices[materialSelect.selectedIndex].fix_price;
      setTimeout(() => {
        file.status.innerHTML = `${formatPrice(price)} RON`;
      }, 400);
      width = formatSize(file.fileWidth);
      height = formatSize(file.fileHeight);
      file.formGroup.querySelector(".form-size").innerHTML = `${width} × ${height}`;

      // show form details
      file.formGroup.querySelector(".form-block-details").classList.remove("hide");

      // add file name as title
      file.formGroup.querySelector(".form-block-details-title").innerHTML = `${file.file.name}`;

      // disable upload file button
      file.formGroup.querySelector(".form-subscribe-button").classList.add("disabled");

      // show total price
      document.querySelector(".form-price").classList.remove("hide");

      // show submit
      document.querySelector(".form-submit-button").classList.remove("hide");
      file.productPrice = price;
      totalPrice += price;
      file.material = materialSelect[materialSelect.selectedIndex].getAttribute("data-name");
    });
    totalPriceElm.innerHTML = `${formatPrice(totalPrice)} RON`;
  };
  /** ****************************************************************************************** **/

  /** ****************************************************************************************** **/
  // sof: calculate price
  /** ****************************************************************************************** **/
  const calculatePrice = fileGroupId => {
    const formGroup = filesData[fileGroupId].formGroup;
    const fileInputElement = formGroup.querySelector(".form-file");
    const material = formGroup.querySelector(".form-material").value;
    const materialName = formGroup.querySelector(".form-material").selectedOptions[0].text;
    const quantity = formGroup.querySelector(".form-quantity").value;
    const status = formGroup.querySelector(".form-filestatus");
    let file = null;
    if (filesData[fileGroupId].file == null) {
      if (!fileInputElement.value) {
        status.innerHTML = "Choose file";
        return false;
      }
      file = fileInputElement.files[0];
    } else {
      file = filesData[fileGroupId].file;
    }
    if (quantity < 1 || quantity > 200) {
      status.innerHTML = "Quantity must be between 1 and 200";
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
        method: "post",
        body: form
      }).then(async response => {
        if (response.ok) {
          return response.json();
        }
        const text = await response.json();
        throw new Error(text.message);
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
          addFormGroup(formGroup, fileGroupId);
          filesData[fileGroupId].addedWrapper = true;
        }
        updateForm(fileGroupId);
      }).catch(error => {
        alert(error);
        status.innerHTML = "–";
        filesData[fileGroupId].lastMod = null;
        filesData[fileGroupId].valid = false;
      });
      return;
    }
    filesData[fileGroupId].material = quantity;
    filesData[fileGroupId].material = materialName;
    updateForm(fileGroupId);
    filesData[fileGroupId].valid = true;
  };
  /** ****************************************************************************************** **/

  initFilesData(0, formGroup);
  totalPriceElm = document.getElementById("order-price");
  addFileGroupListener(formGroup, 0);
  formGroup.addEventListener("submit", event => {
    event.preventDefault();
    if (getValidFilesCnt() == 0) {
      return false;
    }
    var msg = document.querySelector(".status-message");
    if (msg) {
      msg.parentNode.removeChild(msg);
    }
  });
  orderForm.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(orderForm);
    filesData.forEach(data => {
      formData.append("price", data.productPrice);
    });
    console.log(filesData);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", mos_auth_rest.order);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response);
        } else {
          console.log("error");
        }
      }
    };
    xhr.send(formData);
  });
});
/******/ })()
;
//# sourceMappingURL=api.js.map
document.addEventListener("DOMContentLoaded", () => {
  let totalPrice = null;
  let filesData = [];
  let lastWrapperId = 0;
  let totalPriceElm = null;

  const loader = "…";
  const formGroup = document.querySelector(".form-group");
  const apiUrl = "https://lasercut.internetguru.io/api/v2/analyze?id=mos";

  const orderForm = document.getElementById("mos-order-form");

  // UTILS
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
      valid: false,
    };
  };

  const formatPrice = (num) => {
    return num.toLocaleString();
  };

  const formatSize = (num) => {
    return Math.round(num);
  };

  const getValidFilesCnt = () => {
    cnt = 0;
    filesData.forEach((file) => {
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

  // FRONTEND
  const toggleFormBlocks = (formBlocks) => {
    formBlocks.forEach((formBlock, index) => {
      const formBlockHeader = formBlock.querySelector(".form-block-header");

      let isOpen = false;

      index === 0 ? (isOpen = true) : (isOpen = false);

      formBlockHeader.addEventListener("click", (event) => {
        event.preventDefault();

        formBlocks.forEach((block) => {
          isOpen = false;
          block.classList.add("disabled");
        });

        !isOpen
          ? formBlock.classList.remove("disabled")
          : formBlock.classList.add("disabled");
        isOpen = !isOpen;
      });
    });
  };

  const initFormBlocks = (formGroup) => {
    const formBlocks = formGroup.querySelectorAll(".form-block");
    const formFile = formGroup.querySelector(".form-file");
    const formSelect = formGroup.querySelector(".form-select");

    const el = [];

    // init
    formBlocks.forEach((formBlock, index) => {
      if (index !== 0) {
        formBlock.classList.add("disabled");
      } else {
        el.push(formBlocks[0]);
        toggleFormBlocks(el);
      }
    });

    const closeAllFormBlocks = () => {
      formBlocks.forEach((formBlock) => {
        formBlock.classList.add("disabled");
      });
    };

    const openFormBlock = (id) => {
      formBlocks.forEach((formBlock, index) => {
        if (index === id) {
          formBlock.classList.remove("disabled");
        }
      });
    };

    formFile.addEventListener("change", (event) => {
      event.preventDefault();
      if (event) {
        closeAllFormBlocks();
        openFormBlock(1);
        el.push(formBlocks[1]);
        toggleFormBlocks(el);
      }
    });

    formSelect.addEventListener("change", (event) => {
      event.preventDefault();
      if (event) {
        // closeAllFormBlocks();
        // openFormBlock(2);
        el.push(formBlocks[2]);
        toggleFormBlocks(el);
      }
    });
  };

  // START: CUSTOMS
  const buildSizes = (material_id, material_name, str, arr) => {
    if (material_name.includes(str)) {
      arr.set(material_id, material_name.slice(str.length));
    }
  };

  const buildSizeEl = (sizes, parentEl) => {
    sizes.forEach((value, key) => {
      const sizeEl = document.createElement("div");
      sizeEl.classList.add("size-el");
      sizeEl.innerHTML = value;
      sizeEl.setAttribute("data-size", key);
      parentEl.appendChild(sizeEl);
    });
  };

  const searchNode = (searchInput, els) => {
    console.log(els);
    filter = searchInput.toUpperCase();

    els.forEach((el) => {
      txtValue = el.textContent || el.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });
  };
  // END: CUSTOMS

  // FORM GROUP LISTENER
  const addFileGroupListener = (formGroup, fileGroupId) => {
    formGroup.addEventListener("change", (event) => {
      calculatePrice(fileGroupId);
    });

    // const a = formGroup.querySelector(".form-group-add");
    // a.addEventListener("click", (event) => {
    //   event.preventDefault;
    //   addFormGroup(formGroup, fileGroupId);
    // });

    initFormBlocks(formGroup, fileGroupId);
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
    formGroup.querySelector(".form-wrapper").insertAdjacentHTML(
      "beforeend",
      `<a class="form-del" data-id="${fileGroupId}" href="Javascript:void(0);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 18L6 6" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>`
    );
    fileInput = formGroup.querySelector(".form-file");
    fileName = document.createElement("p");
    fileName.className = "mt-2 mb-0";
    fileName.innerHTML = fileInput.files[0].name;
    fileInput.parentNode.replaceChild(fileName, fileInput);
    formGroup.querySelector(".form-del").addEventListener("click", (event) => {
      filesData[event.currentTarget.getAttribute("data-id")] = null;
      formGroup.parentNode.removeChild(formGroup);
      updateForm();
    });
    addFileGroupListener(newWrapper, lastWrapperId);
    formGroup.parentNode.insertBefore(newWrapper, formGroup.nextElementSibling);
  };

  const updateForm = (fileGroupId) => {
    totalPrice = 0;
    filesData.forEach((file) => {
      if (file == null || file.prices == null) {
        return;
      }
      if (
        fileGroupId !== undefined &&
        fileGroupId == file.formGroup.getAttribute("data-filenum")
      ) {
        file.status.innerHTML = loader;
      }

      // search form build
      const formSearch = file.formGroup.querySelector(".form-search");
      const materialSelect = file.formGroup.querySelector(".form-material");
      const searchDropdown = file.formGroup.querySelector(
        ".form-search-dropdown"
      );

      const carbonSteelS335 = "Carbon steel S335 ";
      const carbonSteelDC01 = "Carbon steel DC01 ";
      const materials = [carbonSteelS335, carbonSteelDC01];

      const sizesCarbonSteelS335 = new Map();
      const sizesCarbonSteelDC01 = new Map();

      file.prices.forEach((priceData) => {
        const { material_id, material_name } = priceData;

        buildSizes(
          material_id,
          material_name,
          carbonSteelS335,
          sizesCarbonSteelS335
        );

        buildSizes(
          material_id,
          material_name,
          carbonSteelDC01,
          sizesCarbonSteelDC01
        );
      });

      if (searchDropdown.childNodes.length === 0) {
        materials.forEach((mat) => {
          const matEl = document.createElement("div");
          matEl.classList.add("mat-el");
          matEl.innerHTML = mat;
          matEl.setAttribute("data-name", mat);
          searchDropdown.appendChild(matEl);
        });
      }

      const searchMaterialsHandler = (event) => {
        event.preventDefault();
        const matEls = searchDropdown.querySelectorAll(".mat-el");

        const value = event.target.value;
        if (matEls) {
          searchNode(value, matEls);
        }
      };

      const searchSizesHandler = (event) => {
        event.preventDefault();
        const sizeEls = searchDropdown.querySelectorAll(".size-el");

        const value = event.target.value;
        if (sizeEls) {
          searchNode(value, sizeEls);
        }
      };

      const clickSizesHandler = (ev) => {
        ev.preventDefault();

        materialSelect.value = "";

        if (
          materialSelect.getAttribute("placeholder").includes(carbonSteelS335)
        ) {
          materialSelect.setAttribute(
            "placeholder",
            `${carbonSteelS335}; ${ev.currentTarget.innerText}`
          );
        } else if (
          materialSelect.getAttribute("placeholder").includes(carbonSteelDC01)
        ) {
          materialSelect.setAttribute(
            "placeholder",
            `${carbonSteelDC01}; ${ev.currentTarget.innerText}`
          );
        }

        searchDropdown.classList.add("hide");
      };

      materialSelect.addEventListener("keyup", searchMaterialsHandler);

      // show dropdown when clicked
      materialSelect.addEventListener("click", (event) => {
        event.preventDefault();
        searchDropdown.classList.remove("hide");
      });

      // add event listener to all materials in the search
      const searchElements = searchDropdown.querySelectorAll(".mat-el");
      searchElements.forEach((el) => {
        el.addEventListener("click", (event) => {
          event.preventDefault();
          searchDropdown.innerHTML = "";
          materialSelect.value = "";
          materialSelect.removeEventListener("keyup", searchMaterialsHandler);

          materialSelect.setAttribute(
            "placeholder",
            event.currentTarget.innerText
          );

          // const btn = document.createElement("div");
          // btn.classList.add("reset-search");
          // btn.innerHTML = `
          //   <a class="form-del">
          //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          //       <path d="M6 18L18 6" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          //       <path d="M18 18L6 6" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          //     </svg>
          //   </a>
          // `;
          // formSearch.appendChild(btn);

          // btn.addEventListener("click", (event) => {
          //   event.preventDefault();
          //   searchDropdown.innerHTML = "";
          //   materialSelect.value = "";

          //   materials.forEach((mat) => {
          //     const matEl = document.createElement("div");
          //     matEl.classList.add("mat-el");
          //     matEl.innerHTML = mat;
          //     matEl.setAttribute("data-name", mat);
          //     searchDropdown.appendChild(matEl);
          //   });
          // });

          if (searchDropdown.childNodes.length === 0) {
            if (event.currentTarget.innerText === carbonSteelS335) {
              buildSizeEl(sizesCarbonSteelS335, searchDropdown);
            } else if (event.currentTarget.innerText === carbonSteelDC01) {
              buildSizeEl(sizesCarbonSteelDC01, searchDropdown);
            }
          }

          const sizesElements = searchDropdown.querySelectorAll(".size-el");
          sizesElements.forEach((el) => {
            el.addEventListener("click", clickSizesHandler);
          });

          materialSelect.addEventListener("keyup", searchSizesHandler);
        });
      });

      console.log(file.prices);
      console.log(materialSelect);

      var quantity = file.formGroup.querySelector(".form-quantity").value;

      var price = 0;
      //   file.prices[materialSelect.selectedIndex].unit_price * quantity +
      //   file.prices[materialSelect.selectedIndex].fix_price;
      setTimeout(() => {
        file.status.innerHTML = `${formatPrice(price)} RON`;
      }, 400);
      width = formatSize(file.fileWidth);
      height = formatSize(file.fileHeight);
      file.formGroup.querySelector(
        ".form-size"
      ).innerHTML = `${width} × ${height}`;

      // show form details
      file.formGroup
        .querySelector(".form-block-details")
        .classList.remove("hide");

      // add file name as title
      file.formGroup.querySelector(
        ".form-block-details-title"
      ).innerHTML = `${file.file.name}`;

      // disable upload file button
      file.formGroup
        .querySelector(".form-subscribe-button")
        .classList.add("disabled");

      // show total price
      document.querySelector(".form-price").classList.remove("hide");

      // show submit
      document.querySelector(".form-submit-button").classList.remove("hide");

      file.productPrice = price;
      totalPrice += price;
      file.material = "material";
    });
    totalPriceElm.innerHTML = `${formatPrice(totalPrice)} RON`;
  };

  const calculatePrice = (fileGroupId) => {
    const formGroup = filesData[fileGroupId].formGroup;
    const fileInputElement = formGroup.querySelector(".form-file");
    const material = formGroup.querySelector(".form-material").value;

    const materialName = formGroup.querySelector(".form-material");

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
      if (
        filesData[fileGroupId].valid &&
        filesData[fileGroupId].fileHash !== null
      ) {
        form.append("hash", filesData[fileGroupId].fileHash);
      } else {
        form.append("dxf_file", file, fileName);
      }
      status.innerHTML = loader;

      fetch(apiUrl, {
        method: "post",
        body: form,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((text) => {
            throw new Error(text.message);
          });
        })
        .then((result) => {
          filesData[fileGroupId].prices = result.prices;
          filesData[fileGroupId].materialPrices = result.prices;
          filesData[fileGroupId].fileHash = result.file_hash;
          filesData[fileGroupId].fileURL = result.filew_path;
          filesData[fileGroupId].fileWidth = result.model_width;
          filesData[fileGroupId].fileHeight = result.model_height;
          filesData[fileGroupId].file = file;
          filesData[fileGroupId].valid = true;
          if (!filesData[fileGroupId].addedWrapper) {
            // addFormGroup(formGroup, fileGroupId);
            filesData[fileGroupId].addedWrapper = true;
          }
          updateForm(fileGroupId);
        })
        .catch((error) => {
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

  function saveFormData(form) {
    const formData = new FormData(form);
    for (let [name, value] of formData) {
      var label = document.querySelector(`label[for="${name}"]`).innerHTML;
      // customer.push({ key: name, value: value, label: label });
      const varname = document
        .getElementById(name)
        .getAttribute("data-varname");
      if (varname) {
        window[varname] = value;
      }
    }
  }

  initFilesData(0, formGroup);
  totalPriceElm = document.getElementById("order-price");
  addFileGroupListener(formGroup, 0);
  formGroup.addEventListener("submit", (event) => {
    event.preventDefault();
    if (getValidFilesCnt() == 0) {
      return false;
    }
    var msg = document.querySelector(".status-message");
    if (msg) {
      msg.parentNode.removeChild(msg);
    }
  });

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);

    filesData.forEach((data) => {
      formData.append("price", data.productPrice);
    });

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

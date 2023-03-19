document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://lasercut.internetguru.io/api/v2/analyze?id=mos";

  const orderForm = document.getElementById("mos-order-form");
  const formGroup = document.querySelector(".order-form-group");
  const totalPriceElm = document.getElementById("order-form-total-price");
  const addGroup = document.getElementById("order-form-add");
  const firstFileInput = document.getElementById("order-form-file-0");
  const firstFileLabel = document.querySelector(
    ".form-subscribe-button[for='order-form-file-0']"
  );

  const data = [];
  const loader = "...";
  let prevId = 0;

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
      valid: false,
    };
  };

  // Listen for form group change
  const formGroupListener = (group, id) => {
    group.addEventListener("change", () => {
      // getResult(id);
    });
  };

  const updateGroup = (id) => {
    totalPrice = 0;
    data.forEach((group) => {
      if (group === null || group.prices === null) {
        return;
      }

      if (id && id === group.group.getAttribute("data-id")) {
        group.status.innerHTML = loader;
      }

      const materialSelect = group.group.querySelector(".order-form-material");

      if (materialSelect.children.length == 1) {
        materialSelect.innerHTML = "";

        group.prices.forEach((priceData) => {
          const option = document.createElement("option");
          option.value = priceData.material_id;
          option.innerHTML = `${priceData.material_name}`;
          option.setAttribute("data-name", priceData.material_name);
          materialSelect.appendChild(option);
        });
      }

      const quantity = group.group.querySelector(".order-form-quantity").value;
      const price =
        group.prices[materialSelect.selectedIndex].unit_price * quantity +
        group.prices[materialSelect.selectedIndex].fix_price;

      setTimeout(() => {
        group.status.innerHTML = `${Math.round(price)} RON`;
      }, 300);

      let width = Math.round(group.fileWidth);
      let height = Math.round(group.fileHeight);

      group.group.querySelector(
        ".order-form-dimensions"
      ).innerHTML = `${width} x ${height} mm`;

      group.group.productPrice = price;
      totalPrice += price;
      group.material =
        materialSelect[materialSelect.selectedIndex].getAttribute("data-name");
    });
    totalPriceElm.innerHTML = `${Math.round(totalPrice)} RON`;
  };

  // Update form group
  const getResult = (id) => {
    const group = data[id].group;
    const groupFile = group.querySelector(".order-form-file");
    const groupMaterial = group.querySelector(".order-form-material");
    const groupQuantity = group.querySelector(".order-form-quantity");
    const formStatus = group.querySelector(".order-form-status");

    // Get material & quantity values
    const groupMaterialValue = groupMaterial.value;
    const groupQuantityValue = groupQuantity.value;

    // Get material name
    const groupMaterialName =
      groupMaterial.options[groupMaterial.selectedIndex].text;

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
        })
        .catch((error) => {
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

  const buildBlock = (id) => {
    const newGroup = document.createElement("div");
    newGroup.classList.add("order-form-group");
    newGroup.dataset.id = `${id}`;

    // Add file block
    const fileBlock = document.createElement("div");
    fileBlock.classList.add("order-form-block", "order-form-block-file");
    const formMeta = document.createElement("div");
    formMeta.classList.add("order-form-label");
    formMeta.innerHTML = "Fișier";
    const formBlockLabel = document.createElement("label");
    formBlockLabel.classList.add("form-subscribe-button");
    formBlockLabel.setAttribute("for", `order-form-file-${id}`);
    formBlockLabel.innerHTML = "DXF File";
    const formBlockInput = document.createElement("input");
    formBlockInput.setAttribute("id", `order-form-file-${id}`);
    formBlockInput.classList.add("order-form-file");
    formBlockInput.setAttribute("type", "file");
    formBlockInput.setAttribute("name", `order-form-file-${id}`);
    formBlockInput.setAttribute("required", true);
    formBlockInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const fileName = file.name;
      formBlockLabel.innerHTML = fileName;
    });
    fileBlock.appendChild(formMeta);
    fileBlock.appendChild(formBlockLabel);
    fileBlock.appendChild(formBlockInput);

    // Add material block
    const materialBlock = document.createElement("div");
    materialBlock.classList.add("order-form-block", "order-form-block-35");
    const materialBlockLabel = document.createElement("label");
    materialBlockLabel.classList.add("order-form-label");
    materialBlockLabel.setAttribute("for", `material-${id}`);
    materialBlockLabel.innerHTML = "Material";
    const materialBlockSelect = document.createElement("select");
    materialBlockSelect.classList.add(
      "order-form-material",
      "order-form-select"
    );
    materialBlockSelect.setAttribute("name", `material-${id}`);
    // materialBlockSelect.setAttribute("required", true);
    const materialBlockSelectOption = document.createElement("option");
    materialBlockSelectOption.innerHTML = "Choose file";
    materialBlockSelectOption.setAttribute("value", "");
    materialBlockSelect.appendChild(materialBlockSelectOption);
    materialBlock.appendChild(materialBlockLabel);
    materialBlock.appendChild(materialBlockSelect);

    // Add quantity block
    const quantityBlock = document.createElement("div");
    // quantityBlock.setAttribute("required", true);
    quantityBlock.classList.add("order-form-block", "order-form-block-10");
    const quantityBlockLabel = document.createElement("label");
    quantityBlockLabel.classList.add("order-form-label");
    quantityBlockLabel.setAttribute("for", `quantity-${id}`);
    quantityBlockLabel.innerHTML = "Cantitate";
    const quantityBlockInput = document.createElement("input");
    quantityBlockInput.classList.add(
      "order-form-quantity",
      "order-form-select"
    );
    quantityBlockInput.setAttribute("name", `quantity-${id}`);
    quantityBlockInput.setAttribute("type", "number");
    quantityBlockInput.setAttribute("required", true);
    quantityBlockInput.setAttribute("min", 1);
    quantityBlockInput.setAttribute("max", 100);
    quantityBlockInput.setAttribute("value", 1);
    quantityBlock.appendChild(quantityBlockLabel);
    quantityBlock.appendChild(quantityBlockInput);

    // Add status block
    const statusBlock = document.createElement("div");
    statusBlock.classList.add("order-form-block-status", "order-form-block-20");
    const statusBlockDimensions = document.createElement("div");
    statusBlockDimensions.classList.add("order-form-dimensions");
    statusBlockDimensions.innerHTML = "-";
    const statusBlockPrice = document.createElement("div");
    statusBlockPrice.classList.add("order-form-status");
    statusBlockPrice.innerHTML = "-";
    statusBlock.appendChild(statusBlockDimensions);
    statusBlock.appendChild(statusBlockPrice);

    newGroup.appendChild(fileBlock);
    newGroup.appendChild(materialBlock);
    newGroup.appendChild(quantityBlock);
    newGroup.appendChild(statusBlock);
    orderForm.insertBefore(newGroup, addGroup);
    return newGroup;
  };

  const addGroupHandler = (event) => {
    event.preventDefault();
    if (!firstFileInput.files[0]) return;
    prevId++;
    let newGroup = buildBlock(prevId);
    initData(prevId, newGroup);
    formGroupListener(newGroup, prevId);
  };

  // Add new group
  addGroup.addEventListener("click", addGroupHandler);

  const init = () => {
    initData(0, formGroup);
    formGroupListener(formGroup, 0);
    firstFileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const fileName = file.name;
      firstFileLabel.innerHTML = fileName;
    });
  };

  init();

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // const formData = new FormData(orderForm);
    const formData = new FormData();

    // filesData.forEach((data) => {
    //   formData.append("price", data.productPrice);
    // });

    formData.append("name", "product name");
    formData.append("price", 100);
    formData.append("quantity", 1);
    formData.append("material", "material name");
    formData.append("size", "file size");

    try {
      const response = await fetch(settings.root, {
        method: "POST",
        // body: JSON.parse(formData),
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          "X-WP-Nonce": settings.nonce,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const cartUrl = data["cart_url"];
        orderForm.reset();
        // location.replace(cartUrl);
        console.log("Success:", data);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });

  orderForm.reset();
});

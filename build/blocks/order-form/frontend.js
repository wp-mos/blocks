/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/blocks/order-form/frontend.js ***!
  \*******************************************/
// $().ready(() => {
//   // TODO check valid
//   let valid = true;
//   let speed = null;
//   let delivery = null;
//   let totalPrice = null;
//   let totalPriceDph = null;
//   let status = null;
//   let customer = [];
//   let filesData = [];
//   let lastWrapperId = 0;
//   let totalPriceElm = null;
//   let totalPriceDphElm = null;

//   const loader =
//     '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

//   const apiUrl = "https://betadxf.internetguru.cz/api/v1";
//   const backendUrl = "/wp-content/plugins/interactive-order/api.php";

//   function addFileWrapperListener(fileWrapper, wrapId) {
//     fileWrapper.addEventListener("change", (event) => {
//       calculatePrice(wrapId);
//     });
//     fileWrapper
//       .querySelector(".form-quantity")
//       .addEventListener("keydown", (event) => {
//         if (event.key === "Enter") {
//           calculatePrice(wrapId);
//           event.preventDefault();
//         }
//         if (event.keyCode == 9) {
//           calculatePrice(wrapId);
//         }
//       });
//   }

//   function addFileWrapper(fileWrapper, wrapId) {
//     let newWrapper = fileWrapper.cloneNode(true);
//     lastWrapperId++;
//     initFilesData(lastWrapperId, newWrapper);
//     newWrapper.setAttribute("data-filenum", lastWrapperId);
//     newWrapper.querySelector(".form-filestatus").innerHTML = "–";
//     newWrapper.querySelector(".form-file").value = "";
//     newWrapper.querySelector(".form-quantity").value = 1;
//     newWrapper.querySelector(".form-size").innerHTML = "–";
//     // newWrapper.querySelector('.form-fileid').innerHTML = '–'
//     fileWrapper
//       .querySelector(".col")
//       .insertAdjacentHTML(
//         "beforeend",
//         `<div><a class="form-del btn" data-id="${wrapId}" href="Javascript:void(0);">Odebrat</a></div>`
//       );
//     fileWrapper
//       .querySelector(".form-quantity")
//       .parentNode.insertAdjacentHTML(
//         "afterend",
//         `<div><a class="form-calc" title="Přepočítat" href="Javascript:void(0);">⟳</a></div>`
//       );
//     fileInput = fileWrapper.querySelector(".form-file");
//     fileName = document.createElement("p");
//     fileName.innerHTML = fileInput.files[0].name;
//     fileInput.parentNode.replaceChild(fileName, fileInput);
//     fileWrapper
//       .querySelector(".form-del")
//       .addEventListener("click", (event) => {
//         filesData[event.target.getAttribute("data-id")] = null;
//         fileWrapper.parentNode.removeChild(fileWrapper);
//         updateForm();
//       });
//     fileWrapper
//       .querySelector(".form-calc")
//       .addEventListener("click", (event) => {
//         calculatePrice(wrapId);
//       });
//     addFileWrapperListener(newWrapper, lastWrapperId);
//     fileWrapper.parentNode.insertBefore(
//       newWrapper,
//       fileWrapper.nextElementSibling
//     );
//   }

//   function initFilesData(wrapperId, wrapperElm) {
//     filesData[wrapperId] = {
//       fileWrapper: wrapperElm,
//       status: null,
//       lastMod: null,
//       material: null,
//       quantity: null,
//       file: null,
//       fileHash: null,
//       fileURL: null,
//       fileWidth: null,
//       fileHeight: null,
//       productPrice: null,
//       addedWrapper: false,
//       valid: false,
//     };
//   }

//   function formatPrice(num) {
//     return num.toLocaleString("cs-CZ");
//   }

//   function formatSize(num) {
//     return num.replace(/\..*$/, "");
//   }

//   function updateForm(wrapId) {
//     totalPrice = 0;
//     filesData.forEach((file) => {
//       if (file == null || file.prices == null) {
//         return;
//       }
//       if (
//         wrapId !== undefined &&
//         wrapId == file.fileWrapper.getAttribute("data-filenum")
//       ) {
//         file.status.innerHTML = loader;
//       }
//       var materialSelect = file.fileWrapper.querySelector(".form-material");
//       if (materialSelect.children.length == 1) {
//         materialSelect.innerHTML = "";
//         file.prices.forEach((priceData) => {
//           var option = document.createElement("option");
//           option.value = priceData.materialId;
//           // option.innerHTML = `${priceData.materialName} (` + formatPrice(priceData.fixPrice) + ' Kč fix + ' + formatPrice(priceData.unitPrice) + ` Kč za 1 ks)`
//           option.innerHTML = `${priceData.materialName}`;
//           option.setAttribute("data-name", priceData.materialName);
//           materialSelect.appendChild(option);
//         });
//       }
//       var quantity = file.fileWrapper.querySelector(".form-quantity").value;
//       var price =
//         file.prices[materialSelect.selectedIndex].unitPrice * quantity +
//         file.prices[materialSelect.selectedIndex].fixPrice;
//       setTimeout(() => {
//         file.status.innerHTML = `${formatPrice(price)} Kč`;
//       }, 400);
//       width = formatSize(file.fileWidth);
//       height = formatSize(file.fileHeight);
//       file.fileWrapper.querySelector(
//         ".form-size"
//       ).innerHTML = `${width} × ${height}`;
//       // file.fileWrapper.querySelector('.form-fileid').innerHTML = `${file.fileHash}`
//       file.productPrice = price;
//       totalPrice += price;
//       file.material =
//         materialSelect[materialSelect.selectedIndex].getAttribute("data-name");
//     });
//     totalPrice = Math.round(totalPrice * speed);
//     totalPriceDph = Math.round(totalPrice * 1.21);
//     totalPriceElm.innerHTML = `${formatPrice(totalPrice)} Kč`;
//     totalPriceDphElm.innerHTML = `${formatPrice(totalPriceDph)} Kč`;
//   }

//   function getValidFilesCnt() {
//     cnt = 0;
//     filesData.forEach((file) => {
//       if (file == null) {
//         return;
//       }
//       if (!file.valid) {
//         return;
//       }
//       cnt++;
//     });
//     return cnt;
//   }

//   function calculatePrice(wrapId) {
//     const fileWrapper = filesData[wrapId].fileWrapper;
//     const fileInputElement = fileWrapper.querySelector(".form-file");
//     const material = fileWrapper.querySelector(".form-material").value;
//     const materialName =
//       fileWrapper.querySelector(".form-material").selectedOptions[0].text;
//     const quantity = fileWrapper.querySelector(".form-quantity").value;
//     const status = fileWrapper.querySelector(".form-filestatus");
//     let file = null;
//     if (filesData[wrapId].file == null) {
//       if (!fileInputElement.value) {
//         status.innerHTML = "Zvolte soubor";
//         return false;
//       }
//       file = fileInputElement.files[0];
//     } else {
//       file = filesData[wrapId].file;
//     }
//     if (quantity < 1 || quantity > 100) {
//       status.innerHTML = "Počet kusů musí být 1 až 100";
//       return false;
//     }
//     const fileName = file.name;
//     const lastMod = file.lastModified + fileName;
//     filesData[wrapId].quantity = quantity;
//     if (filesData[wrapId].lastMod !== lastMod) {
//       filesData[wrapId].status = status;
//       filesData[wrapId].material = materialName;
//       filesData[wrapId].lastMod = lastMod;
//       var form = new FormData();
//       form.append("material", material);
//       form.append("amount", quantity);
//       if (filesData[wrapId].valid && filesData[wrapId].fileHash !== null) {
//         form.append("hash", filesData[wrapId].fileHash);
//       } else {
//         form.append("file", file, fileName);
//       }
//       var settings = {
//         url: apiUrl + "/file",
//         method: "POST",
//         timeout: 0,
//         processData: false,
//         mimeType: "multipart/form-data",
//         contentType: false,
//         data: form,
//       };
//       status.innerHTML = loader;
//       $.ajax(settings)
//         .done((response) => {
//           const result = JSON.parse(response);
//           // filesData[wrapId].productPrice = parseInt(result.price)
//           filesData[wrapId].prices = result.prices;
//           filesData[wrapId].materialPrices = result.prices;
//           filesData[wrapId].fileHash = result.hash;
//           filesData[wrapId].fileURL = (apiUrl + result.path).replace(
//             "api/v1/var/www/deploy/dxf/betadxf.internetguru.cz/",
//             ""
//           );
//           filesData[wrapId].fileWidth = result.width;
//           filesData[wrapId].fileHeight = result.height;
//           filesData[wrapId].file = file;
//           filesData[wrapId].valid = true;
//           if (!filesData[wrapId].addedWrapper) {
//             addFileWrapper(fileWrapper, wrapId);
//             filesData[wrapId].addedWrapper = true;
//           }
//           updateForm(wrapId);
//         })
//         .fail((xhr, statusMesasge, error) => {
//           const result = JSON.parse(xhr.responseText);
//           alert(result.error_message);
//           status.innerHTML = "–";
//           filesData[wrapId].lastMod = null;
//           filesData[wrapId].valid = false;
//         });
//       return;
//     }
//     filesData[wrapId].material = quantity;
//     filesData[wrapId].material = materialName;
//     updateForm(wrapId);
//     filesData[wrapId].valid = true;
//   }

//   function switchStep(oldForm, newForm) {
//     oldForm.style.display = "none";
//     newForm.style.display = "block";
//     document.getElementById("objednavka").scrollIntoView();
//   }

//   function saveFormData(form) {
//     const formData = new FormData(form);
//     for (let [name, value] of formData) {
//       var label = document.querySelector(`label[for="${name}"]`).innerHTML;
//       customer.push({ key: name, value: value, label: label });
//       const varname = document
//         .getElementById(name)
//         .getAttribute("data-varname");
//       if (varname) {
//         window[varname] = value;
//       }
//     }
//   }

//   function showSummary(form) {
//     customer.forEach((item) => {
//       var elm = form.querySelector(`.${item.key}`);
//       if (!item.value) {
//         elm.style.display = "none";
//         return;
//       }
//       elm.innerHTML = `${item.label}: ${item.value}`;
//     });
//     var orderData = getOrderData();
//     form.querySelector(".order-files").innerHTML = orderData.productSummaryHtml;
//     form.querySelector(".order-speed").innerHTML = orderData.speed;
//     form.querySelector(".order-delivery").innerHTML = orderData.delivery;
//     form.querySelector(".order-price").innerHTML = `${formatPrice(
//       totalPrice
//     )} Kč`;
//     form.querySelector(".order-pricedph").innerHTML = `${formatPrice(
//       totalPriceDph
//     )} Kč`;
//   }

//   function getOrderData() {
//     let data = {};
//     customer.forEach((item) => {
//       data[item.key] = item.value;
//     });
//     productSummary = "";
//     productSummaryHtml = "<dl>";
//     filesData.forEach((file) => {
//       if (file == null || file.productPrice == null) {
//         return;
//       }
//       productSummary += `# Soubor ${file.file.name}
// Odkaz: ${file.fileURL}
// Materiál: ${file.material}
// Počet ks: ${file.quantity}
// Cena bez DPH: ${file.productPrice} Kč

// `;
//       productSummaryHtml +=
//         `<dt>Soubor: <a href="${file.fileURL}">${file.file.name}</a></dt>
// <dd>Materiál: ${file.material}</dd>
// <dd>Počet ks: ${file.quantity}</dd>
// <dd>Cena bez DPH: ` +
//         formatPrice(file.productPrice) +
//         ` Kč</dd>`;
//     });
//     data.productSummaryHtml = productSummaryHtml + "</dl>";
//     data.productSummary = productSummary;
//     data.delivery = translateDelivery(delivery);
//     data.speed = translateSpeed(speed);
//     data.totalPrice = totalPrice;
//     data.totalPriceDph = totalPriceDph;
//     return data;
//   }
//   function translateSpeed(speed) {
//     // TODO generate
//     switch (speed) {
//       case "1":
//         return "Standard (do 10 dnů)";
//       case "1.2":
//         return "Zrychlený (do 7 dnů, + 20 %)";
//       case "2":
//         return "Super (do 5 dnů, + 100 %)";
//       case "3":
//         return "Extra (do 2 dnů, + 200 %)";
//     }
//   }
//   function translateDelivery(delivery) {
//     // TODO generate
//     switch (delivery) {
//       case "osobniodber":
//         return "Osobní odběr";
//       case "toptrans":
//         return "Top Trans";
//     }
//   }

//   /*
//   function logPaymentInfo () {
//     $.ajax({
//       type: 'POST',
//       dataType : 'json',
//       async: false,
//       url: '/wp-content/plugins/interactive-order/logger/storeCustomerInfo.php',
//       data: {
//         'customer': JSON.stringify(getOrderData())
//       }
//     })
//   }

//   function paymentTransfer () {
//     logPaymentInfo()
//     let message = ''
//     $.ajax({
//       type: 'POST',
//       async: false,
//       url: '/wp-content/plugins/interactive-order/logger/sendMail.php',
//       data: {
//         type_of_payment: "transfer",
//         email: customerEmail
//       }
//     })
//       .done(() => {
//         message = 'Email byl úspěšně odeslán.'
//       })
//       .fail(() => {
//         message = 'Email se nepodařilo se odeslat. Zkuste to prosím za chvíli znovu.'
//       })
//       .then(() => {
//         switchStep(forms[2], forms[3])
//         document.getElementById('status4').innerHTML = message
//       })
//   }
// */

//   function paymentOnline() {
//     var settings = {
//       url: myajax.ajaxurl,
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       data: {
//         action: "gopay",
//         nonce: myajax.nonce,
//         totalPriceDph: totalPriceDph,
//         customerName: customerName,
//         customerSurname: customerSurname,
//         customerEmail: customerEmail,
//         customerTelefon: customerTelefon,
//         customerCityAddress: customerCityAddress,
//         customerStreetAddress: customerStreetAddress,
//         customerPostalCodeAddress: customerPostalCodeAddress,
//         /*,
//         "comment": customerComment,
//         "company_name": companyName,
//         "company_street_address": companyStreetAddress,
//         "company_city_address": companyCityAddress,
//         "company_postal_code_address": companyPostalCodeAddress,
//         "company_ic": companyIC,
//         "company_dic": companyDIC
//         */
//       },
//     };
//     $.ajax(settings)
//       .done((response) => {
//         response = JSON.parse(response);
//         window.location.replace(response.gw_url);
//       })
//       .fail((response) => {
//         console.log(response);
//       });
//   }

//   function createCookie(name, value, days) {
//     var expires;
//     if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//       expires = "; expires=" + date.toGMTString();
//     } else {
//       expires = "";
//     }
//     document.cookie =
//       encodeURIComponent(name) +
//       "=" +
//       encodeURIComponent(value) +
//       expires +
//       "; path=/";
//   }

//   function saveCookies() {
//     const data = getOrderData();
//     for (key in data) {
//       createCookie(`order-${key}`, data[key], 1);
//     }
//   }

//   var forms = document.querySelectorAll(".form-steps");

//   // step 1
//   const fileWrapper = document.querySelector(".step1-file");
//   initFilesData(0, fileWrapper);
//   speed = document.querySelector("input[name=speed]:checked").value;
//   delivery = document.querySelector("input[name=delivery]:checked").value;
//   totalPriceElm = document.getElementById("order-price");
//   totalPriceDphElm = document.getElementById("form-pricedph");
//   document.querySelector(".speed-wrap").addEventListener("change", (event) => {
//     speed = event.target.value;
//     updateForm();
//   });
//   document
//     .querySelector(".delivery-wrap")
//     .addEventListener("change", (event) => {
//       delivery = event.target.value;
//     });
//   addFileWrapperListener(fileWrapper, 0);
//   forms[0].addEventListener("submit", (event) => {
//     event.preventDefault();
//     if (getValidFilesCnt() == 0) {
//       // TODO highlight error
//       return false;
//     }
//     var msg = document.querySelector(".status-message");
//     if (msg) {
//       msg.parentNode.removeChild(msg);
//     }
//     switchStep(forms[0], forms[1]);
//     var address = document.querySelector(".order-address");
//     if (delivery == "osobniodber") {
//       address.style.display = "none";
//       address.querySelectorAll("input").forEach((item) => {
//         item.removeAttribute("required");
//       });
//     } else {
//       address.style.display = "";
//       address.querySelectorAll("input").forEach((item) => {
//         item.setAttribute("required", "required");
//       });
//     }
//     return false;
//   });

//   // step 2
//   document.getElementById("back1").addEventListener("click", (event) => {
//     switchStep(forms[1], forms[0]);
//   });
//   forms[1].addEventListener("submit", (event) => {
//     saveFormData(forms[1]);
//     switchStep(forms[1], forms[2]);
//     showSummary(forms[2]);
//     event.preventDefault();
//     return false;
//   });

//   // step 3
//   document.getElementById("back2").addEventListener("click", (event) => {
//     switchStep(forms[2], forms[1]);
//   });
//   forms[2].addEventListener("submit", (event) => {
//     event.preventDefault();
//     return false;
//   });
//   document
//     .getElementById("third-submited-payment-transfer")
//     .addEventListener("click", (event) => {
//       saveCookies();
//       window.location.replace("?sendmail");
//       // paymentTransfer()
//     });
//   document
//     .getElementById("third-submited-payment-online")
//     .addEventListener("click", (event) => {
//       saveCookies();
//       paymentOnline();
//     });
//   if (
//     window.location.search.startsWith("?id") ||
//     window.location.search.startsWith("?sendmail")
//   ) {
//     document.getElementById("objednavka").scrollIntoView();
//   }

//   /************************/

//   var Config = {};

//   Config.ns = "hideable";
//   Config.expand = "►";
//   Config.collapse = "▼";
//   Config.expandTitle = "Zobrazit";
//   Config.collapseTitle = "Skrýt";
//   Config.hideableHiddenClass = Config.ns + "-hidden";
//   Config.hideableNohideClass = Config.ns + "-nohide";
//   Config.hideClass = Config.ns + "-hide";
//   Config.switchClass = Config.ns + "-switch";
//   Config.noprintClass = "noprint";
//   Config.hereClass = Config.ns + "-here";
//   Config.afterClass = Config.ns + "-after";
//   Config.after = "Details";
//   Config.dataHere = "data-" + Config.ns + "-here"; // TODO
//   Config.dataAfter = "data-" + Config.ns + "-after"; // TODO

//   var Hideable = function () {
//     var inited = false;

//     var initHideables = function () {
//       var hideables = document.querySelectorAll(
//         "." + Config.hideableHiddenClass + ", ." + Config.hideableNohideClass
//       );
//       for (var i = 0; i < hideables.length; i++) {
//         var link = initToggleButton(hideables[i]);
//         if (link === null) {
//           continue;
//         }
//         if (hideables[i].classList.contains(Config.hideableNohideClass)) {
//           continue;
//         }
//         hideables[i].classList.add(Config.hideableNohideClass);
//         toggleElement(link);
//       }
//     };

//     var createToggleButton = function (value) {
//       var link = document.createElement("a");
//       link.href = "Javascript:void(0)";
//       linkButton = document.createElement("span");
//       linkButton.innerHTML = Config.collapse;
//       link.appendChild(linkButton);
//       link.title = Config.collapseTitle;
//       link.classList.add(Config.switchClass);
//       link.classList.add(Config.noprintClass);
//       link.addEventListener("click", toggle, false);
//       link.innerHTML += " " + value;
//       return link;
//     };

//     var initToggleButton = function (hideable) {
//       for (var i = hideable.children.length - 1; i >= 0; i--) {
//         var item = hideable.children[i];
//         var here = item.classList.contains(Config.hereClass);
//         var after = item.classList.contains(Config.afterClass);
//         if (here) {
//           var value = item.innerHTML;
//           var button = createToggleButton(value);
//           item.innerHTML = "";
//           item.appendChild(button);
//           return button;
//         }
//         if (after) {
//           var value = Config.after;
//           var button = createToggleButton(value);
//           var el = document.createElement(item.nodeName);
//           el.appendChild(button);
//           item.parentNode.insertBefore(el, item.nextSibling);
//           return button;
//         }
//       }
//       return null;
//     };

//     var toggle = function (e) {
//       var target = e.currentTarget;
//       toggleElement(target);
//       e.preventDefault();
//     };

//     var toggleElement = function (link) {
//       var e = link.parentNode.parentNode;
//       var linkButton = link.children[0];
//       if (e.classList.contains(Config.hideableNohideClass)) {
//         e.classList.remove(Config.hideableNohideClass);
//         e.classList.add(Config.hideableHiddenClass);
//         linkButton.innerHTML = Config.expand;
//         link.title = Config.expandTitle;
//       } else {
//         e.classList.remove(Config.hideableHiddenClass);
//         e.classList.add(Config.hideableNohideClass);
//         linkButton.innerHTML = Config.collapse;
//         link.title = Config.collapseTitle;
//       }
//       for (var i = e.childNodes.length - 1; i > 0; i--) {
//         var ch = e.childNodes[i];
//         if (ch.nodeType !== 1) {
//           continue;
//         }
//         if (
//           ch.firstChild.classList &&
//           ch.firstChild.classList.contains(Config.switchClass)
//         ) {
//           return;
//         }
//         if (ch.classList.contains(Config.hideableNohideClass)) {
//           continue;
//         }
//         if (ch.classList.contains(Config.hideClass)) {
//           ch.classList.remove(Config.hideClass);
//         } else {
//           ch.classList.add(Config.hideClass);
//         }
//       }
//     };

//     // public
//     return {
//       init: function (cfg) {
//         if (inited) return;
//         /*
//         var css = ''
//           + ' .' + Config.hideClass + ' { display: none !important; }'
//           + ' a.' + Config.switchClass + ' { text-decoration: none;'
//           + ' border: none !important;'
//           + ' font-family: "Emilbus Mono", "Lucida Console", monospace;'
//           + ' font-weight: bold }';
//         IGCMS.appendStyle(css);
//         */
//         initHideables();
//         inited = true;
//       },
//       isInit: function () {
//         return inited;
//       },
//     };
//   };

//   var hideable = new Hideable();
//   hideable.init();
// });
/******/ })()
;
//# sourceMappingURL=frontend.js.map
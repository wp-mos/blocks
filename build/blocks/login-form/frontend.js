/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/blocks/login-form/frontend.js ***!
  \*******************************************/
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  // const openModalBtn = document.querySelectorAll(".open-modal");
  // const modalEl = document.querySelector(".wp-block-mos-blocks-auth-modal");
  // const modalCloseEl = document.querySelectorAll(
  //   ".modal-overlay, .modal-btn-close"
  // );

  // openModalBtn.forEach((el) => {
  //   el.addEventListener("click", (event) => {
  //     event.preventDefault();
  //
  //     modalEl.classList.add("modal-show");
  //   });
  // });

  // modalCloseEl.forEach((el) => {
  //   el.addEventListener("click", (event) => {
  //     event.preventDefault();
  //
  //     modalEl.classList.remove("modal-show");
  //   });
  // });

  // const tabs = document.querySelectorAll(".tabs a");
  // const loginForm = document.querySelector("#signin-tab");
  // const signupForm = document.querySelector("#signup-tab");

  // tabs.forEach((tab) => {
  //   tab.addEventListener("click", (event) => {
  //     event.preventDefault();
  //
  //     tabs.forEach((currentTab) => {
  //       currentTab.classList.remove("active-tab");
  //     });
  //
  //     event.currentTarget.classList.add("active-tab");
  //
  //     const activeTab = event.currentTarget.getAttribute("href");
  //
  //     if (activeTab === "#signin-tab") {
  //       loginForm.style.display = "block";
  //       signupForm.style.display = "none";
  //     } else {
  //       loginForm.style.display = "none";
  //       signupForm.style.display = "block";
  //     }
  //   });
  // });

  // signupForm?.addEventListener("submit", async (event) => {
  //   event.preventDefault();
  //
  //   const signupFieldset = signupForm.querySelector("fieldset");
  //   signupFieldset.setAttribute("disabled", true);
  //
  //   const signupStatus = signupForm.querySelector("#signup-status");
  //   signupStatus.innerHTML = `
  //     <div class="modal-status modal-status-info">
  //       Please wait! We are creating your account.
  //     </div>
  //   `;
  //
  //   const formData = {
  //     username: signupForm.querySelector("#su-name").value,
  //     email: signupForm.querySelector("#su-email").value,
  //     password: signupForm.querySelector("#su-password").value,
  //   };
  //
  //   const response = await fetch(mos_auth_rest.signup, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //
  //   const responseJSON = await response.json();
  //
  //   if (responseJSON.status === 2) {
  //     signupStatus.innerHTML = `
  //       <div class="modal-status modal-status-success">
  //         Success! Your account has been created.
  //       </div>
  //     `;
  //     location.reload();
  //   } else {
  //     signupFieldset.removeAttribute("disabled");
  //     signupStatus.innerHTML = `
  //       <div class="modal-status modal-status-danger">
  //         Unable to create account! Please try again later.
  //       </div>
  //     `;
  //   }
  // });

  loginForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const loginStatus = loginForm.querySelector("#login-status");
    const formData = {
      user_login: loginForm.querySelector("#si-email").value,
      password: loginForm.querySelector("#si-password").value
    };

    // const signinFieldset = loginForm.querySelector("fieldset");
    // signinFieldset.setAttribute("disabled", true);

    loginStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Please wait! We are logging you in.
      </div>
    `;
    const response = await fetch(mos_auth_rest.signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    console.log(response);
    const responseJSON = await response.json();
    if (responseJSON.status === 2) {
      loginStatus.innerHTML = `
        <div class="modal-status modal-status-success">
          Success! You are now logged in.
        </div>
      `;
      location.reload();
    } else {
      // signinFieldset.removeAttribute("disabled");
      loginStatus.innerHTML = `
        <div class="modal-status modal-status-danger">
          Invalid credentials! Please try again later.
        </div>
      `;
    }
  });
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map
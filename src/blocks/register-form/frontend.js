document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById('register-form');

  registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const registerStatus = registerForm.querySelector("#register-status");
    const registerFormPassword = registerForm.querySelector("#register-form-password").value;
    const registerFormConfirmPassword = registerForm.querySelector("#register-form-confirm-password").value;

    registerStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Please wait! We are creating your account.
      </div>
    `;

    if (registerFormPassword !== registerFormConfirmPassword) {
      registerStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Your password do not match
      </div>
    `;
      return
    }
    
    const formData = {
      name: registerForm.querySelector("#register-form-name").value,
      surname: registerForm.querySelector("#register-form-surname").value,
      tel: registerForm.querySelector("#register-form-tel").value,
      email: registerForm.querySelector("#register-form-email").value,
      password: registerFormPassword,
      confirmPassword: registerFormConfirmPassword,
    };

    const response = await fetch(mos_auth_rest.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseJSON = await response.json();

    if (responseJSON.status === 2) {
      registerStatus.innerHTML = `
        <div class="modal-status modal-status-success">
          Success! Your account has been created.
        </div>
      `;
      location.reload();
    } else {
      registerStatus.innerHTML = `
        <div class="modal-status modal-status-danger">
          Unable to create account! Please try again later.
        </div>
      `;
    }
  });

});

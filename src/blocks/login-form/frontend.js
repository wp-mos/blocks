document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginStatus = loginForm.querySelector("#login-status");

    const formData = {
      user_login: loginForm.querySelector("#si-email").value,
      password: loginForm.querySelector("#si-password").value,
    };

    loginStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Please wait! We are logging you in.
      </div>
    `;


    const response = await fetch(mos_auth_rest.signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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

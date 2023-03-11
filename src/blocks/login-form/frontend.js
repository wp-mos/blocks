document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("login-form-email");
  const passwordInput = document.getElementById("login-form-password");
  const loginStatus = document.getElementById("login-status");

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      user_login: emailInput.value,
      password: passwordInput.value,
    };

    const response = await fetch(mos_auth_rest.signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseJSON = await response.json();

    if (responseJSON.status === 2) {
      // location.replace("http://mos.local/utilizatori/comanda/");
      console.log(responseJSON);
    } else {
      loginStatus.innerHTML = "Email sau parolă incorectă!";
      loginStatus.classList.add("padding");

      emailInput.classList.add("error");
      passwordInput.classList.add("error");
    }
  });
});

let loggedIn = false;  // Assume the user is not initially logged in

const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username-login").value.trim();
  const password_hash = document.querySelector("#password-login").value.trim();
  
  if (username && password_hash) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password_hash }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      loggedIn = true;  // Update login status when successful login
      document.location.replace("/profile");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username-login").value.trim();
  const password_hash = document.querySelector("#password-login").value.trim();
  if (username && password_hash) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password_hash }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      loggedIn = true;  // Update login status when successful signup
      document.location.replace("/profile");
    } else {
      console.log("Failed to sign up.");
    }
  }
};

const updateLogoutButtonVisibility = () => {
  const logoutButton = document.getElementById('logoutButton');

  if (loggedIn) {
    logoutButton.style.display = 'block';
  } else {
    logoutButton.style.display = 'none';
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

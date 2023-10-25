const logout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!response.ok) {
      alert("Failed to log out.");
    } else {
      document.location.replace("/");
    }
  };
  
  const updateLogoutButtonVisibility = (loggedIn) => {
    const logoutButton = document.getElementById("logoutButton");
  
    logoutButton.style.display = loggedIn ? "flex" : "none";
    if (loggedIn) {
      logoutButton.style.alignItems = "center";
      logoutButton.style.justifyContent = "center";
    }
  };
  
  document.querySelector("#logoutButton").addEventListener("click", logout);
  updateLogoutButtonVisibility(true);
  
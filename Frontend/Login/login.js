const loginData = {
  identifier: "",
  password: "",
};

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("input", (e) => {
  loginData[e.target.name] = e.target.value;
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:3000/user/login",
      loginData,
    );

    localStorage.setItem("token", response.data.token);

    window.location.href = "../Chat/chat.html";
  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
});

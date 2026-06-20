const loginData = {
  email: "",
  password: "",
};

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("input", (e) => {
  loginData[e.target.name] = e.target.value;
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(loginData);

  // Example API call
  // axios.post("http://localhost:3000/user/login", loginData)
});

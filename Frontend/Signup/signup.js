const formData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("input", (e) => {
  formData[e.target.name] = e.target.value;
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log(formData);

  // Example API call
  // axios.post("http://localhost:3000/user/signup", formData)
});

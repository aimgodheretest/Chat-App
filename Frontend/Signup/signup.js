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

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/user/signup", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    alert(response.data.message);

    window.location.href = "../Login/login.html";
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
});

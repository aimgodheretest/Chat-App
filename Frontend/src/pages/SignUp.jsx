import { useState } from "react";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;

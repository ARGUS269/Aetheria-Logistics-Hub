<script setup>
import { ref } from "vue";

const isShow = ref(false);
const inputError = ref(false);
const emailField = ref("");
const passwordField = ref("");

function testEmailInput() {
  inputError.value = false;

  if (emailField.value === "") {
    inputError.value = true;
    return;
  }
}

function cargoSubmit() {
  const fields = emailField.value.split("@");

  if (fields.length !== 2 || fields[1] !== "agcpn.com") {
    inputError.value = true;
    return;
  }
}
</script>

<template>
  <form @submit.prevent="dispatchSignal" class="form-container">
    <h2>Welcome back</h2>
    <p>Sign in to access you project and assets</p>
    <label for="email">Email: </label>
    <input
      type="email"
      name="email"
      id="email"
      class="email"
      placeholder="you@agcpn.com"
      v-model="emailField"
      @input="testEmailInput"
    />
    <label for="password" :class="{ error: inputError }">Password: </label>
    <div class="pass">
      <input
        name="password"
        id="password"
        class="password"
        placeholder="........"
        v-model="passwordField"
        @input="testPasswordInput"
        :type="!isShow ? 'password' : 'text'"
      />
      <i
        class="fa-regular fa-eye-slash"
        @click="isShow = !isShow"
        :class="{ 'fa-eye': isShow }"
      ></i>
    </div>
    <div class="form-actions-row">
      <label class="remember-me">
        <input type="checkbox" />
        <span>Remember me</span>
      </label>

      <a href="#" class="forgot-password">Forgot password?</a>
    </div>

    <button type="submit" @click="cargoSubmit()">Sign In</button>
    <div class="form-actions-row-contact">
        <span>Don't have an account?</span>
      <a href="#" class="contact-us">Contact Us</a>
    </div>
  </form>
</template>

<style scoped>
* {
  user-select: none;
}

.form-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 24px;
}

.form-actions-row-contact{
  display: flex;
  justify-content: center;
  gap: 1px;
  width: 100%;
  margin-top: 16px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #2563eb;
}

.forgot-password, .contact-us {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

button {
  width: 100%;
  align-self: center;
  padding: 7px;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  background-color: #e5e7eb;
  font-weight: bold;
}

.error {
  position: relative;
  padding-top: 10px;
}

.error::before {
  content: "Please enter a valid email";
  position: absolute;
  top: -25%;
  left: 10px;
  font-size: 0.7em;
  width: max-content;
  height: auto;
  color: red;
}

span {
  font-weight: 300;
  font-size: 14px;
}

.pass {
  width: 100%;
  position: relative;
}

.pass i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.pass .password {
  width: 90%;
}

button:hover {
  background-color: #cccccc;
}

label {
  padding: 5px 10px;
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

h2,
p {
  text-align: center;
  margin: 0;
}

.email,
.password {
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;

  padding: 10px 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}

.email::placeholder {
  color: #888888;
  font-weight: 400;
}

.password::placeholder {
  font-size: 30px;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  padding: 30px;
  background-color: white;
}
</style>

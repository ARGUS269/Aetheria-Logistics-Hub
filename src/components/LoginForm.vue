<script setup>
import { ref } from "vue";

const isShow = ref(false);
const inputError = ref(false);
const remember = ref(false);
const emailField = ref("");
const passwordField = ref("");
const isLogin = ref(false);

const emit = defineEmits(["login-infos"]);

function testEmailInput() {
  inputError.value = false;

  if (emailField.value === "") {
    inputError.value = true;
    return;
  }
}

function dispatchSignal() {
  const fields = emailField.value.split("@");
  const pointFields = emailField.value.split(".");

  if (fields.length !== 2 || fields[1] !== "agcpn.com") {
    inputError.value = true;
    return;
  }

  if (pointFields.length !== 2) {
    inputError.value = true;
    return;
  }

  isLogin.value = true;

  emit("login-infos", {
    fullName: "AKOUDAD Abdessamad",
    email: emailField.value,
    password: passwordField.value,
    isRemembered: remember.value,
    isLogin: isLogin.value,
  });
}

function dispatchSignalLogOut() {
  isLogin.value = false;

  remember.value = false;
  emailField.value = "";
  passwordField.value = "";

  emit("login-infos", {
    isLogin: isLogin.value,
  });
}
</script>

<template>
  <div class="login-page-wrapper">
    <form @submit.prevent="dispatchSignal" class="form-container" v-if="!isLogin">
      <h2>Welcome back</h2>
      <p class="subtitle">Sign in to access your project and assets</p>

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
          <input type="checkbox" v-model="remember" />
          <span>Remember me</span>
        </label>

        <a href="#" class="forgot-password">Forgot password?</a>
      </div>

      <button type="submit">Sign In</button>

      <div class="form-actions-row-contact">
        <span>Don't have an account?</span>
        <a href="#" class="contact-us">Contact Us</a>
      </div>
    </form>
    <form @submit.prevent="dispatchSignalLogOut" class="form-container" v-if="isLogin">
      <h2>Welcome back</h2>
      <p class="subtitle">AKOUDAD Abdessamad</p>

      <img src="../assets/man.png" alt="perso-photo" />

      <span>Your Email: {{ emailField }}</span>
      <hr />

      <button type="submit">Log Out</button>
    </form>
  </div>
</template>

<style scoped>
* {
  user-select: none;
  box-sizing: border-box; /* Crucial padding fallback fix */
}

.login-page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 12px;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1); /* Cleaner modern shadow profile */
  padding: 40px;
  background-color: white;
  border-radius: 12px;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #1e293b;
  margin-bottom: 4px;
}

.subtitle {
  text-align: center;
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 16px;
  font-weight: 400;
}

label {
  padding: 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.email {
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  width: 100%;
}

img {
  width: 250px;
  align-self: center;
}

.email::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.pass {
  width: 100%;
  position: relative;
}

.pass .password {
  width: 100%;
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  padding: 10px 40px 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
}

.password::placeholder {
  font-size: 24px;
}

.pass i {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #64748b;
}

.form-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  white-space: nowrap;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #2563eb;
  margin: 0;
}

.forgot-password,
.contact-us {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  white-space: nowrap; /* FIX: Keeps link text unified */
}

.forgot-password:hover,
.contact-us:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

button {
  width: 100%;
  padding: 12px;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  background-color: #2563eb; /* Upgraded to actionable modern blue style */
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #1d4ed8;
}

.form-actions-row-contact {
  display: flex;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 12px;
}

span {
  font-weight: 400;
  font-size: 14px;
  color: #64748b;
}

/* Errors layout adjustments */
.error {
  position: relative;
  padding-top: 10px;
}

.error::after {
  content: "Please enter a valid email";
  position: absolute;
  top: -10px;
  left: 4px;
  font-size: 0.75em;
  color: #ef4444;
  font-weight: 500;
}
</style>

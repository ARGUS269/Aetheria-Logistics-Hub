<script setup>
import { ref, inject, watch, computed } from "vue";
const props = defineProps({
  btnisClicked: {
    type: Object,
    required: true,
  },
});

const isShow = ref(false);
const inputError = ref(false);
const remember = ref(false);
const emailField = ref("");
const passwordField = ref("");
const globalUserCapsule = inject("globalUser");
const user = computed(() => globalUserCapsule?.value);
const isLogin = ref(!!user.value);

const emit = defineEmits(["login-infos"]);
watch(
  () => user.value,
  (newUser) => {
    isLogin.value = !!newUser;
    if (newUser) {
      // Auto-populate the email input from the injected session data if it exists
      emailField.value = newUser.email || "";
    }
  },
  { deep: true, immediate: true },
);
function testPasswordInput() {
  inputError.value = false;
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

  if (user?.value) {
    emit("login-infos", { ...user.value, isLogin: true });
  } else {
    emit("login-infos", {
      fullName: "AKOUDAD Abdessamad",
      email: emailField.value,
      password: passwordField.value,
      isRemembered: remember.value,
      isLogin: isLogin.value,
    });
  }
}

function dispatchSignalLogOut() {
  isLogin.value = false;

  remember.value = false;
  emailField.value = "";
  passwordField.value = "";

  emit("login-infos", {
    isLogin: false,
    fullName: null,
    email: null,
  });
}
</script>

<template>
  <div class="login-page-wrapper" :data-theme="btnisClicked?.value ? 'dark' : 'light'">
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
    <form @submit.prevent="dispatchSignalLogOut" class="form-container" v-else>
      <h2>Welcome back</h2>
      <p class="subtitle">{{ user?.fullName || "AKOUDAD Abdessamad" }}</p>

      <img src="../assets/man.png" alt="perso-photo" />

      <span>Your Email: {{ emailField || user?.email }}</span>
      <hr />

      <button type="submit">Log Out</button>
    </form>
  </div>
</template>

<style scoped>
/* Scoped locks your style definitions cleanly within this layout file context */
* {
  user-select: none;
  box-sizing: border-box;
}

.login-page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* FIX 1: Use var(--bg-card) so the card lifts off your page's main background */
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 12px;
  box-shadow:
    0 10px 25px -5px rgba(var(--shadow-color), var(--shadow-opacity, 0.1)),
    0 8px 10px -6px rgba(var(--shadow-color), var(--shadow-opacity, 0.1));
  padding: 40px;
  background-color: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: var(--text-main);
  margin-bottom: 4px;
}

.subtitle {
  text-align: center;
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 16px;
  font-weight: 400;
}

label {
  padding: 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* FIX 2: Corrected the input text color and background parameters */
.email {
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-main);              /* Text stays visible */
  background-color: var(--bg-main);     /* Input field remains legible */
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  outline: none;
  width: 100%;
  transition: all 0.2s ease;
}

img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  align-self: center;
  margin: 16px 0;
  border: 4px solid var(--border-color);
}

.email::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.pass {
  width: 100%;
  position: relative;
}

/* FIX 3: Corrected the password text color and background parameters */
.pass .password {
  width: 100%;
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-main);              /* Text stays visible */
  background-color: var(--bg-main);     /* Input field remains legible */
  padding: 10px 40px 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  outline: none;
  transition: all 0.2s ease;
}

.password::placeholder {
  font-size: 24px;
  color: var(--text-muted);
}

.pass i {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--icon-color);
  transition: color 0.2s ease;
}

.pass i:hover {
  color: var(--text-main);
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
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--text-main);
  margin: 0;
}

.forgot-password,
.contact-us {
  font-size: 0.875rem;
  color: var(--icon-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.forgot-password:hover,
.contact-us:hover {
  color: var(--text-main);
  text-decoration: underline;
}

/* FIX 4: Aligned button background variables to standard action styles */
button {
  width: 100%;
  padding: 12px;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  background-color: var(--bg-button);
  color: var(--text-main);
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover {
  background-color: var(--bg-button-hover);
}

button:active {
  transform: scale(0.98);
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
  color: var(--text-muted);
}

hr {
  border: 0;
  border-top: 1px dashed var(--border-color);
  margin: 16px 0;
  width: 100%;
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

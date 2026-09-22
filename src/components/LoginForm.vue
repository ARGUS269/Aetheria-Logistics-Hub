<script setup>
import { ref } from "vue";

const isShow = ref(false);
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
      placeholder="you@company.com"
      v-model="emailField"
      @input="testEmailInput"
    />
    <label for="password">Password: </label>
    <div class="pass">
      <input
        name="password"
        id="password"
        class="email password"
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

    <div class="mass-slider-card">
      <label for="scale-slider" class="scale-slider-label" :data-text="massValue"
        >Cargo Mass Scale:</label
      >
    </div>
    <button
      type="submit"
      @click="cargoSubmit()"
      :disabled="isLaunched"
      :class="{ launchClass: isLaunched }"
    >
      Sign In
    </button>
  </form>
</template>

<style scoped>
* {
  user-select: none;
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

.email {
  position: relative;
}

.email::before {
  content: "Please enter A valid Email";
  position: absolute;
  top: -85%;
  left: 10px;
  font-size: 0.7em;
  width: max-content;
  height: auto;
  color: red;
  margin-top: 5px;
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

.email {
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

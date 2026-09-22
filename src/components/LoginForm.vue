<script setup>
import { ref } from "vue";

const emit = defineEmits(["SubmitClicked"]);

function cargoSubmit() {
  console.log(destinationCity.value);

  if (destinationCity.value === "") {
    inputError.value = true;
    return;
  }
  launch.value = "---------------------";
  isLaunched.value = true;
  const intervalID = setInterval(() => {
    emit("submit-clicked", {
      id: `TRK-${isDuplicated(Date.now().toString().slice(-4))}`,
      destination: destinationCity.value,
      cargoType: categorization.value,
      weight: massValue.value,
      value: valValue.value,
      status: "MANIFEST_CREATED",
      transitProgress: 0,
    });
    categorization.value = "Electronics";
    destinationCity.value = "";
    massValue.value = 10;
    valValue.value = 500;
    clearInterval(intervalID);
  }, 2000);
}

function testInput() {
  inputError.value = false;

  if (destinationCity.value === "") {
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
      placeholder="you@company.com"
      v-model="emailField"
      @input="testEmailInput"
    />
    <label for="password">Password: </label>
    <input
      type="password"
      name="password"
      id="password"
      class="email"
      placeholder="........"
      v-model="passwordField"
      @input="testPasswordInput"
    />
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
      {{ launch }}
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
}

.errorHundle {
  position: relative;
}

.errorHundle::before {
  content: "Please enter A destination City";
  position: absolute;
  top: -85%;
  left: 10px;
  font-size: 0.7em;
  width: max-content;
  height: auto;
  color: red;
  margin-top: 5px;
}
button:hover {
  background-color: #cccccc;
}

.launchClass:hover {
  background-color: #e5e7eb;
}

.launchClass {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.4em;
  position: relative;
  overflow: hidden;
  background-color: #e5e7eb;
}

.launchClass::before {
  content: "";
  position: absolute;
  left: 20px;
  width: 20px;
  height: 20px;
  background-image: url(../assets/truck-regular-full.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  top: 27%;
  transform: translateY(-50%);
  animation: slideIn 2s ease-in normal 1 forwards;
}

@keyframes slideIn {
  50% {
    left: calc(100% - 50px);
  }
  100% {
    left: calc(100% - 50px);
  }
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

.slider-wrapper {
  position: relative;
  margin-bottom: 10px;
}

input[type="range"] {
  width: 100%;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 9999px;
  background: #e5e7eb;
  outline: none;
}

.scale-ticks span::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 6px;
  background-color: #d1d5db;
}

h2,
p {
  text-align: center;
  margin: 0;
}

.scale-ticks {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  margin-top: 10px;
}

.scale-ticks span {
  font-size: 12px;
  color: #9ca3af;
  position: relative;
  text-align: center;
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

.select-options li {
  color: #333333;

  padding: 10px 14px;
}

.select-options li:hover {
  background-color: #cccccc;
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

.custom-select {
  position: relative;
}

.select-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  list-style: none;
  cursor: pointer;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #cccccc;
  margin-top: 5px;
  transform-origin: center top;
  z-index: 10;
}

.shrink-square-enter-active,
.shrink-square-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.shrink-square-enter-from,
.shrink-square-leave-to {
  opacity: 0;
  transform: scale(0.4);
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  color: #333333;

  padding: 10px 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
}

.select-trigger div i {
  transition: transform 0.3s ease;
}

.rotated-state {
  transform: rotate(180deg);
}
</style>

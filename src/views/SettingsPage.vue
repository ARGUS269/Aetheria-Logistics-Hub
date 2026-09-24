<script setup>
import { ref } from "vue";
const props = defineProps({
  cargoManifest: {
    type: Object,
    required: true,
  },
  loginObject: {
    type: [Object, null],
    required: true,
  },
});
const emit = defineEmits(["add-cargo", "add-infos"]);
</script>

<template>
  <div class="infos">
    <div class="user-name"></div>
    <div class="user-photo"></div>
    <div class="user-desc"></div>
  </div>
  <div class="basics">
    <div class="perso-photo"></div>
    <div class="perso-name"></div>
    <div class="perso-email"></div>
  </div>
  <div class="pereferences">
    <div class="theme"></div>
    <div class="language"></div>
    <div class="date-format"></div>
  </div>
</template>

<style scoped>
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

input[type="text"] {
  margin-bottom: 10px;
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
.scale-slider-label {
  position: relative;
  display: inline-block;
  padding-right: 55px;
}

.scale-slider-label::after {
  content: attr(data-text);
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  height: 24px;
  padding: 0 4px;
  box-sizing: border-box;
  white-space: nowrap;

  border: 1px solid #e5e7eb;
  background-color: white;
  border-radius: 4px;

  transform: translateY(-50%);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-wrapper-mass::-webkit-slider-thumb {
  background-image: url("../assets/truck-regular-full.svg");
}

.slider-wrapper-val::-webkit-slider-thumb {
  background-image: url("../assets/dollar-sign-solid-full.svg");
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
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

.destination-field {
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;

  padding: 10px 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}

.destination-field::placeholder {
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

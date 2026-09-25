<script setup>
import { ref } from "vue";

const cargoManifest = ref([
  {
    id: "TRK-1002",
    destination: "Tokyo (NRT)",
    cargoType: "Electronics",
    weight: 450,
    value: 12000,
    status: "IN_TRANSIT",
    transitProgress: 45,
  },
  {
    id: "TRK-5541",
    destination: "London (LHR)",
    cargoType: "Medical Supplies",
    weight: 120,
    value: 25000,
    status: "HELD_IN_CUSTOMS",
    transitProgress: 20,
  },
]);

const userGreetingValue = ref([]);

const loginObject = ref(null);

function NewMessage(payload) {
  userGreetingValue.value.push(payload);
}

function SubmitClickedToParent(payload) {
  cargoManifest.value.push(payload);
}

function LoginClickedToParent(payload) {
  loginObject.value = payload;
}
const isClicked = ref(false);
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="top">
        <div class="nav-brand">AG</div>
        <div class="nav-links">
          <RouterLink
            to="/logistic"
            class="nav-item"
            :class="{ hover: !isClicked }"
            @click="isClicked = false"
          >
            <i class="fa-solid fa-truck"></i>
          </RouterLink>
        </div>
      </div>
      <div class="bottom">
        <RouterLink
          to="/settings"
          class="nav-item"
          :class="{ hover: isClicked }"
          @click="isClicked = true"
        >
          <i class="fa-solid fa-gear"></i>
        </RouterLink>
      </div>
    </nav>

    <div class="app-main-container">
      <main class="app-viewport">
        <RouterView v-slot="{ Component }">
          <component
            :is="Component"
            :cargoManifest="cargoManifest"
            :loginObject="loginObject"
            :messages="userGreetingValue"
            @add-cargo="SubmitClickedToParent"
            @add-infos="LoginClickedToParent"
            @messages="NewMessage"
          />
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
}

.app-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20px 0;
  box-shadow: 4px 0 6px -1px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #e2e8f0;
  height: 100%;
  width: 64px;
  flex-shrink: 0;
  z-index: 50;
}
.top,
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 800;
  color: #4b5563;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1.25rem;
  width: 44px;
  height: 44px;
  color: #333;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.hover {
  background-color: #f1f5f9;
}

.app-main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: calc(100% - 64px);
  height: 100%;
  overflow: hidden;
}

.app-viewport {
  flex-grow: 1;
  height: calc(100% - 56px);
  overflow-y: auto;
}

i {
  color: #4b5563;
}
</style>

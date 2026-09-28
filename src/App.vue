<script setup>
import { ref, provide, computed, onMounted } from "vue";
import { apiClient } from "@/api/client";

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
const isLoadingSession = ref(true);
const btnisClicked = ref(false);
const isClicked = ref(false);

onMounted(async () => {
  const hasTokenCookie = document.cookie.includes("ag_auth_session=true");

  if (hasTokenCookie) {
    try {
      // Hit the centralized secure /auth/me profile endpoint
      const userProfile = await apiClient.getProfile();

      // Populate global user memory directly from the verified server payload response
      loginObject.value = {
        ...userProfile,
        isLogin: true,
      };
    } catch (error) {
      console.warn("Automatic token authentication failed:", error.message);
      loginObject.value = null;
    }
  }
  isLoadingSession.value = false;
});

function btnISClicked() {
  btnisClicked.value = !btnisClicked.value;
}

const userGreetingValue = ref([]);

const loginObject = ref(null);
const AMPMObject = ref("en-US");
provide(
  "globalUser",
  computed(() => loginObject.value),
);
provide(
  "globalAMPM",
  computed(() => AMPMObject.value),
);

function NewMessage(payload) {
  if (!userGreetingValue.value.includes(payload)) userGreetingValue.value.push(payload);
}

function SubmitClickedToParent(payload) {
  cargoManifest.value.push(payload);
  console.log(cargoManifest.value);
}

async function LoginClickedToParent(payload) {
  if (!payload || payload.isLogin === false) {
    loginObject.value = null;
    document.cookie = "ag_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  } else {
    try {
      const secureSessionData = await apiClient.login({
        email: payload.email,
        password: payload.password
      });

      loginObject.value = {
        fullName: secureSessionData.fullName,
        email: secureSessionData.email,
        isLogin: true
      };

      document.cookie = "ag_auth_session=true; path=/; max-age=86400; SameSite=Strict;";
    } catch (error) {
      alert(`Sign In Failed: ${error.message}`);
    }

  }
}
function AMPMValue(payload) {
  AMPMObject.value = payload;
}
</script>

<template>
  <div class="app-layout" :data-theme="btnisClicked ? 'dark' : 'light'">
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
            :btnisClicked="{ value: btnisClicked }"
            :AMPMValueParent="{ value: AMPMObject }"
            @add-cargo="SubmitClickedToParent"
            @add-infos="LoginClickedToParent"
            @messages="NewMessage"
            @btn-clicked="btnISClicked"
            @AMPM-value="AMPMValue"
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
  background-color: var(--bg-card);
  padding: 20px 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  border-right: 1px solid var(--border-color);
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
  color: var(--text-muted);
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
  background-color: var(--bg-button-hover);
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
  color: var(--icon-color);
}
</style>

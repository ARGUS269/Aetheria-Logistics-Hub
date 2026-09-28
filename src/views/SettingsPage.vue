<script setup>
import { ref, watch } from "vue";
const TransIsRotated = ref(false);
const AMPMValue = ref("en-US");
const props = defineProps({
  cargoManifest: {
    type: Array,
    required: true,
  },
  loginObject: {
    type: [Object, null],
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
  btnisClicked: {
    type: Object,
    required: true,
  },
  AMPMValueParent: {
    type: Object,
    required: true,
  },
});
watch(
  () => props.AMPMValueParent?.value,
  (newValue) => {
    if (newValue) AMPMValue.value = newValue;
  },
  { immediate: true }, //Auto-syncs the value on the very first frame the component mounts!
);
const emit = defineEmits(["add-cargo", "add-infos", "messages", "btn-clicked", "AMPM-value"]);
function chevron() {
  TransIsRotated.value = !TransIsRotated.value;
}
function selectOption(val) {
  AMPMValue.value = val;
  TransIsRotated.value = !TransIsRotated.value;
}
function btnisClickedFun() {
  emit("btn-clicked");
}
watch(AMPMValue, () => {
  emit("AMPM-value", AMPMValue.value);
});
</script>

<template>
  <div class="settings-page-wrapper" :data-theme="btnisClicked?.value ? 'dark' : 'light'">
    <div class="infos" v-if="loginObject?.isLogin">
      <div class="perso-photo"><img src="../assets/man.png" alt="" class="operator-img" /></div>
      <div class="perso-name">
        <span>{{ loginObject?.fullName }}</span>
      </div>
      <div class="perso-desc"><span>{{ loginObject?.role }}</span></div>
      <div class="perso-email">
        <span>{{ loginObject?.email }}</span>
      </div>
    </div>
    <div class="noLogin" v-else><span>You Are Not Login Yet</span></div>
    <div class="pereferences">
      <label for="theme">
        Theme:
        <div class="theme" id="theme" name="theme" @click="btnisClickedFun">
          <i class="fa-solid" :class="btnisClicked?.value ? 'fa-sun' : 'fa-moon'"></i>
        </div>
      </label>

      <div class="custom-select">
        <div class="select-trigger" @click="chevron">
          <span>{{ AMPMValue }}</span>
          <div>
            <i class="fa-solid fa-chevron-down" :class="{ 'rotated-state': TransIsRotated }"></i>
          </div>
        </div>
        <Transition name="shrink-square">
          <ul class="select-options" v-if="TransIsRotated">
            <li class="first-li" @click="selectOption('en-US')">en-US</li>
            <li @click="selectOption('en-GB')">en-GB</li>
            <li @click="selectOption('zh-CN')">zh-CN</li>
          </ul>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  min-height: 100%;
  padding: 40px;

  background-color: var(--bg-main);

  transition: background-color 0.25s ease-in-out;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--bg-panel);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  max-width: 400px;
}

.custom-select {
  position: relative;
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  color: var(--text-main);

  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.select-trigger div i {
  transition: transform 0.3s ease;
}

.rotated-state {
  transform: rotate(180deg);
}

.operator-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
  margin-bottom: 8px;
}

.perso-name span {
  font-size: 1.15rem;
  font-weight: 700;
}

.perso-desc span {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}

.perso-email span {
  font-size: 0.9rem;
  font-weight: 400;
}

.noLogin span {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-muted);
}

span {
  font-family:
    "Inter",
    "Roboto",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: var(--text-main);
  transition: color 0.25s ease-in-out;
}

.pereferences {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.select-options li {
  color: var(--text-main);

  padding: 10px 14px;
}

.select-options li:hover {
  background-color: var(--bg-button-hover);
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
  background-color: var(--bg-card);
  border-radius: 6px;
  border: 1px solid var(--border-color);
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

label {
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 30px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.25s ease-in-out;
}

.theme {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background-color: var(--bg-button);
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.2s ease,
    color 0.2s ease;
}

.theme :deep(i),
.theme :deep(svg) {
  font-size: 1.05rem;
  color: var(--icon-color);
  transition: color 0.2s ease;
}

.theme:hover {
  transform: scale(1.1);
  background-color: var(--bg-button-hover);
}

.theme:hover :deep(i),
.theme:hover :deep(svg) {
  color: var(--text-main);
}
</style>

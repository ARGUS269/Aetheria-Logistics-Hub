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
  messages: {
    type: Array,
    required: true,
  },
  btnisClicked:{
    type: Object,
    required: true,
  }
});
const emit = defineEmits(["add-cargo", "add-infos", "messages", "btn-clicked"]);

function btnisClickedFun(){
  emit("btn-clicked");
}
</script>

<template>
  <div class="settings-page-wrapper" :data-theme="btnisClicked?.value ? 'dark' : 'light'">
    <div class="infos" v-if="loginObject?.isLogin">
      <div class="perso-photo"><img src="../assets/man.png" alt="" class="operator-img" /></div>
      <div class="perso-name">
        <span>{{ loginObject?.fullName }}</span>
      </div>
      <div class="perso-desc"><span>Administrator</span></div>
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

      <div class="language"></div>
      <div class="date-format"></div>
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
  font-family: "Inter", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text-main);
  transition: color 0.25s ease-in-out;
}

.pereferences {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

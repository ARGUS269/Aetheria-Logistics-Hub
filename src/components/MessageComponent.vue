<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const mesNot = ref(true); //Message
const notMes = ref(false); //Notification
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  messageValue: {
    type: Array,
    required: true,
  },
  isLogin: {
    type: Object,
    required: true,
  },
  btnisClicked: {
    type: Object,
    required: true,
  },
});
if (props.message.value === "Messages") mesNot.value = false;
else notMes.value = true;
</script>

<template>
  <div class="body" :data-theme="btnisClicked?.value ? 'dark' : 'light'">
    <div class="head">
      <h3>{{ message?.value }}</h3>
    </div>
    <div class="isLogin" v-if="isLogin?.value">
      <div class="message" v-if="!messageValue || !messageValue.length || (mesNot && notMes)">
        No {{ message?.value }} Yet...
      </div>
      <div class="messages" v-else>
        <div class="msg" v-if="message.value === 'Messages'">
          <p v-for="(mes, index) in messageValue" :key="index">{{ mes }}</p>
        </div>
      </div>
    </div>
    <div class="isNotLogin" v-else>
      <div class="message">You Are Not Login Yet</div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family:
    "Inter",
    "Roboto",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  color: var(--text-main);
}
.body {
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 30px;
  min-height: 150px;
  max-height: 450px;
  border-radius: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow:
    0 1px 3px 0 rgba(var(--shadow-color), var(--shadow-opacity, 0.05)),
    0 1px 2px -1px rgba(var(--shadow-color), var(--shadow-opacity, 0.05));
  gap: 20px;
  background-color: var(--bg-card);
}

.body::-webkit-scrollbar {
  width: 10px;
}

.body::-webkit-scrollbar-track {
  background: transparent;
}
.body::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.body:hover::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
}

.body::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-thumb-hover);
}

.head {
  display: flex;
  justify-content: start;
}

p {
  display: flex;
  flex-direction: column;
  width: 100%;

  cursor: pointer;
  padding: 20px;
  border-radius: 16px;
  background-color: var(--bg-card);
  margin-bottom: 10px;
  border-top-left-radius: 0px;

  scale: 1;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;

  box-shadow:
    0 4px 6px -1px rgba(var(--shadow-color), 0.05),
    0 2px 4px -1px rgba(var(--shadow-color), 0.03);
}
.message:hover,
p:hover {
  transform: scale(1.02);
  box-shadow:
    0 10px 15px -3px rgba(var(--shadow-color), 0.08),
    0 4px 6px -2px rgba(var(--shadow-color), 0.04);
}
</style>

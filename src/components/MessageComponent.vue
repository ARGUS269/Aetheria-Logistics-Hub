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
      <div class="message">
        You Are Not Login Yet
      </div>
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
  overflow: scroll;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.05),
    0 1px 2px -1px rgba(0, 0, 0, 0.05);
  gap: 20px;
  background-color: var(--bg-card);
}

.head {
  display: flex;
  justify-content: start;
}

.message,
p {
  display: flex;
  flex-direction: column;
  width: 320px;
  cursor: pointer;
  padding: 20px;
  border-radius: 16px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.295),
    0 1px 2px -1px rgba(0, 0, 0, 0.432);
  gap: 20px;
  background-color: var(--bg-card);
  transition: scale 0.2s ease;
  margin-bottom: 10px;
  border-top-left-radius: 0px;
}
.message:hover,
p:hover {
  scale: 1.05;
}
</style>

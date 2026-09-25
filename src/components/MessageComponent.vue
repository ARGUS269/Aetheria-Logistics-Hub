<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  messageValue: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="body">
    <div class="head">
      <h3>{{ message.value }}</h3>
    </div>
    <div class="message" v-if="!messageValue">No {{ message.value }} Yet...</div>
    <div class="message" v-else> {{ messageValue }}</div>
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
}
.body {
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 30px;
  min-height: 150px;
  max-height: 500px;
  border-radius: 16px;
  overflow: scroll;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.05),
    0 1px 2px -1px rgba(0, 0, 0, 0.05);
  gap: 20px;
  background-color: white;
}

.head {
  display: flex;
  justify-content: start;
}

.message {
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
  background-color: white;
  transition: scale 0.2s ease;
}
.message:hover {
  scale: 1.05;
}
</style>

<script setup>
import CargoForm from "@/components/CargoForm.vue";
</script>

<template>
  <div class="dashboard-view">
    <CargoForm />
  </div>
</template>

<style scoped>
.dashboard-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  cargoManifest: {
    type: Array,
    required: true,
  },
});

const totalVol = computed(() => {
  return props.cargoManifest.reduce((accumulator, item) => {
    return accumulator + parseInt(item.value);
  }, 0);
});

const totalCustomHolds = computed(() => {
  return props.cargoManifest.reduce((accumulator, item) => {
    if (item.status === "HELD_IN_CUSTOMS") return accumulator + 1;
    return accumulator
  }, 0);
});

const totalMass = computed(() => {
  return props.cargoManifest.reduce((accumulator, item) => {
    return accumulator + parseInt(item.weight);
  }, 0);
});
</script>

<template>
  <pre class="json-terminal">
    {
      Volume: {{ totalVol }},
      Mass: {{ totalMass }},
      Customs Holds: {{ totalCustomHolds }}
    }
  </pre>
</template>

<style scoped>
.json-terminal {
  background-color: #090d16;
  color: #38bdf8;
  padding: 24px;
  border-radius: 8px;
  font-family: "Fira Code", monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
  border: 1px solid #1e293b;
}
</style>

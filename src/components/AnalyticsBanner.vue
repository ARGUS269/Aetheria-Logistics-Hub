<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  cargoManifest: {
    type: Array,
    required: true,
  },
  baselineVolume: {
    type: Number,
    default: 37000,
  },
  baselineMass: {
    type: Number,
    default: 570,
  },
});

const table = ref([]);

const totalVol = computed(() => {
  return props.cargoManifest.reduce((accumulator, item) => {
    return accumulator + parseInt(item.value);
  }, 0);
});

const totalCustomHolds = computed(() => {
  return props.cargoManifest.reduce((accumulator, item) => {
    if (item.status === "HELD_IN_CUSTOMS") return accumulator + 1;
    return accumulator;
  }, 0);
});

const totalMass = computed(() => {
  return props.cargoManifest.reduce((accumulator, item) => {
    return accumulator + parseInt(item.weight);
  }, 0);
});

const calculatedTrendVolume = computed(() => {
  if (props.baselineVolume === 0) return "0%";

  const percentageChange = ((totalVol.value - props.baselineVolume) / props.baselineVolume) * 100;

  const sign = percentageChange > 0 ? "+" : "";
  return `${sign}${Math.round(percentageChange)}%`;
});

// 3. Class binary trigger using props instead of missing .value references
const isPositiveVolumeTrend = computed(() => {
  return totalVol.value >= props.baselineVolume;
});
</script>

<template>
  <div class="statics">
    <div class="volume">
      <span>Volume</span>
      <div class="values">
        <div
          class="value val"
          :class="cargoManifest.length > 0 && trendVol > 0 ? 'trend-positive' : 'trend-negative'"
          :data-text="trendVolPrint"
        >
          {{ totalVol }}
        </div>
      </div>
    </div>
    <div>
      <span>Mass</span>
      <div class="values">
        <div
          class="value mass"
          :class="cargoManifest.length > 0 && trendMass > 0 ? 'trend-positive' : 'trend-negative'"
          :data-text="trendMassPrint"
        >
          {{ totalMass }}
        </div>
      </div>
    </div>
    <div class="in-holds">
      <span>Customs Holds</span>
      <div class="value">{{ totalCustomHolds }}</div>
    </div>
  </div>
</template>

<style scoped>
.statics {
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 16px;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.value::after {
  position: absolute;
  right: -37px;
  bottom: -5px;
  font-size: 0.7em;
  width: 40px;
  height: auto;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
}

.mass::after {
  content: attr(data-text);
}

.val::after {
  content: attr(data-text);
}

.trend-positive::after {
  color: #2e7d32;
}

.trend-negative::after {
  color: #d32f2f;
}

p {
  margin: 0;
}

.statics div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

span {
  font-size: 0.85rem;
  color: #8a8a8a;
  font-weight: 500;
  letter-spacing: -0.2px;
}

.value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.5px;
  position: relative;
  width: fit-content;
}

.values {
  display: flex;
}
</style>

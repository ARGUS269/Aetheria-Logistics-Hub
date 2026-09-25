<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

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

const previousVolValue = ref(props.baselineVolume);
const previousMassValue = ref(props.baselineMass);

const trendMass = ref(0);
const trendVol = ref(0);

const trendMassPrint = ref("");
const trendVolPrint = ref("");

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

watch(
  totalVol,
  (newTotal, oldTotal) => {
    if (oldTotal === undefined || oldTotal === null || oldTotal === 0) {
      previousVolValue.value = props.baselineVolume || newTotal || 1;
      trendVol.value = 0;
      trendVolPrint.value = "0%";
      return;
    }

    previousVolValue.value = oldTotal === 0 ? props.baselineVolume : oldTotal;

    if (previousVolValue.value === 0) {
      trendVol.value = newTotal > 0 ? 100 : 0;
    } else {
      trendVol.value = Math.round(
        ((newTotal - previousVolValue.value) / previousVolValue.value) * 100,
      );
    }

    // 4. Print formatting rules
    trendVolPrint.value = trendVol.value >= 0 ? `+${trendVol.value}%` : `${trendVol.value}%`;
  },
  { deep: true, immediate: true },
);

watch(
  totalMass,
  (newTotal, oldTotal) => {
    if (oldTotal === undefined || oldTotal === null || oldTotal === 0) {
      previousMassValue.value = props.baselineMass || newTotal || 1;
      trendMass.value = 0;
      trendMassPrint.value = "0%";
      return;
    }

    previousMassValue.value = oldTotal === 0 ? props.baselineMass : oldTotal;

    if (previousMassValue.value === 0) {
      trendMass.value = newTotal > 0 ? 100 : 0;
    } else {
      trendMass.value = Math.round(
        ((newTotal - previousMassValue.value) / previousMassValue.value) * 100,
      );
    }

    trendMassPrint.value = trendMass.value >= 0 ? `+${trendMass.value}%` : `${trendMass.value}%`;
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div class="statics">
    <div class="volume">
      <span>Volume</span>
      <div class="values">
        <div
          class="value val"
          :class="cargoManifest.length > 0 && trendVol >= 0 ? 'trend-positive' : 'trend-negative'"
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
          :class="cargoManifest.length > 0 && trendMass >= 0 ? 'trend-positive' : 'trend-negative'"
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.value::after {
  position: absolute;
  right: -40px;
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

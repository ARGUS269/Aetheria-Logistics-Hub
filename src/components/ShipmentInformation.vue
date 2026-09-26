<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const source = ref("Agadir");
const destination = ref("Rabat");
const shipmentID = ref("CGO-4821");
const loadingDock = ref("Dock B2");
const departed = ref("09:15 AM");
const props = defineProps({
  btnisClicked: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="body" :data-theme="btnisClicked?.value ? 'dark' : 'light'">
    <div class="head">
      <h3 class="txt">Shipment Information</h3>
    </div>
    <div class="dashboard-infos">
      <div class="contact-information custom-dash-bottom">
        <div class="contact-infos">
          <img src="../assets/operator.png" alt="" class="operator-img" />
          <div class="names">
            <div class="title">Operator</div>
            <div class="operator-name txt">Amrou Altanji</div>
          </div>
        </div>
        <div class="contacts">
          <div class="corps"><i class="fa-solid fa-phone"></i></div>
          <div class="corps"><i class="fa-regular fa-message"></i></div>
        </div>
      </div>
      <div class="shipment-infos custom-dash-bottom">
        <div class="shipment-id">
          <div class="ttl">Shipment ID</div>
          <div class="bdy txt">{{ shipmentID }}</div>
        </div>
        <div class="loading-dock">
          <div class="ttl">Loading Dock</div>
          <div class="bdy txt">{{ loadingDock }}</div>
        </div>
        <div class="departed">
          <div class="ttl">Departed</div>
          <div class="bdy txt">{{ departed }}</div>
        </div>
      </div>
      <div class="shipment-path">
        <div class="origin">
          <div class="source">{{ source }}</div>
          <div class="label">Origin</div>
        </div>
        <div class="ico"><i class="fa-solid fa-truck-arrow-right"></i></div>
        <div class="path"></div>
        <div class="destination">
          <div class="dest">{{ destination }}</div>
          <div class="label">Destination</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
.shipment-path,
.shipment-infos {
  text-align: center;
}
.ico {
  padding: 10px;
  width: 40px;
  height: 40px;
  background-color: var(--bg-button);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
.ico :deep(i),
.ico :deep(svg) {
  color: var(--icon-color) !important;
  font-size: 0.9rem;
}

.shipment-infos {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.fa-truck-arrow-right {
  color: var(--text-main);
}
.source,
.dest {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}
.origin,
.destination {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--bg-card);
  padding: 0 12px;
  position: relative;
  z-index: 10;
  width: 88px;
}

.txt {
  color: var(--text-main);
}

.label {
  font-size: 0.8rem;
  width: auto !important;
  margin-top: 2px;
}
.shipment-path {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 24px 0;
}
.shipment-path::before {
  content: "";
  position: absolute;
  left: 20px;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 2px dashed var(--bg-button-hover);
  z-index: 1;
}
.ttl,
.label {
  color: var(--text-muted);
}
.body {
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 30px;
  border-radius: 16px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.05),
    0 1px 2px -1px rgba(0, 0, 0, 0.05);
  gap: 20px;
  background-color: var(--bg-card);
}

.title {
  color: var(--text-muted);
}

.shipment-infos {
  padding-top: 10px;
}

.names {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.names div {
  text-align: start;
}

.contact-infos {
  display: flex;
  align-items: center;
  gap: 7px;
}

.contact-information {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.custom-dash-bottom {
  background-image: linear-gradient(
    to right,
    var(--bg-button-hover) 66%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 10px 2px;
  background-repeat: repeat-x;
  padding-bottom: 20px;
}

.head {
  display: flex;
  justify-content: start;
}
.operator-img {
  width: 60px;
  height: 60px;

  border-radius: 50%;

  object-fit: cover;
  background-color: #f8fafc;
  border: 2px solid var(--bg-button-hover);
}

.contacts {
  display: flex;
  gap: 12px;
  align-items: center;
}

.corps {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: var(--bg-button);
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.2s ease,
    color 0.2s ease;
}

.corps :deep(i),
.corps :deep(svg) {
  font-size: 1rem;
  color: var(--icon-color);
  transition: color 0.2s ease;
}

.corps:hover {
  transform: scale(1.1);
  background-color: var(--bg-button-hover);
}

.corps:hover i {
  color: var(--text-main);
}

.dashboard-infos {
}
</style>

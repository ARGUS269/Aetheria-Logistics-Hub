<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const source = ref("Agadir");
const destination = ref("Rabat");
const shipmentID = ref("CGO-4821");
const loadingDock = ref("Dock B2");
const departed = ref("09:15 AM");
</script>

<template>
  <div class="body">
    <div class="head">
      <h3>Shipment Information</h3>
    </div>
    <div class="dashboard-infos">
      <div class="contact-information custom-dash-bottom">
        <div class="contact-infos">
          <img src="../assets/operator.png" alt="" class="operator-img" />
          <div class="names">
            <div class="title">Operator</div>
            <div class="operator-name">Amrou Altanji</div>
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
          <div class="bdy">{{ shipmentID }}</div>
        </div>
        <div class="loading-dock">
          <div class="ttl">Loading Dock</div>
          <div class="bdy">{{ loadingDock }}</div>
        </div>
        <div class="departed">
          <div class="ttl">Departed</div>
          <div class="bdy">{{ departed }}</div>
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
  background-color: #4b5563;
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
  color: #ffffff !important;
  font-size: 0.9rem;
}

.shipment-infos {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.fa-truck-arrow-right {
  color: white;
}
.source,
.dest {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
}
.origin,
.destination {
  display: flex;
  flex-direction: column;
  background-color: #ffffff; /* Blocks the dashed background line completely */
  padding: 0 12px; /* Gives comfortable horizontal padding breathing space */
  position: relative;
  z-index: 10; /* Lifts full container block safely over the line */
}

.origin {
  align-items: flex-start;
  text-align: left;
}

.destination {
  align-items: flex-end;
  text-align: right;
}

.label {
  font-size: 0.8rem;
  width: auto !important;
  margin-top: 2px;
}
.shipment-path {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Crucial: aligns both city blocks and center circle node vertically */
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
  border-top: 2px dashed #e2e8f0;
  z-index: 1; /* Lowest index layers */
}
.ttl,
.label {
  color: #8a8a8a;
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
  background-color: white;
}

.title {
  color: #8a8a8a;
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
  background-image: linear-gradient(to right, #e2e8f0 66%, rgba(255, 255, 255, 0) 0%);
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

  border: 2px solid #e2e8f0;
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
  background-color: #f1f5f9;
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.2s ease,
    color 0.2s ease;
}

.corps :deep(i),
.corps :deep(svg) {
  font-size: 1rem;
  color: #64748b;
  transition: color 0.2s ease;
}

.corps:hover {
  transform: scale(1.1);
  background-color: #e2e8f0;
}

.corps:hover i {
  color: #1e293b;
}

.dashboard-infos {
}
</style>

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
          <img src="../assets/operator.png" alt="" />
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
        <div class="path"></div>
        <div class="destination">
          <div class="dest">{{ destination }}</div>
          <div class="label">Destination</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
img {
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

.corps i {
  font-size: 1.1rem;
  color: #4b5563;
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

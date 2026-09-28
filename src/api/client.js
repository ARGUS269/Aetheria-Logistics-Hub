// src/api/client.js

const BASE_URL = "https://agcpn.com";
const USE_MOCK = true; // 🧪 TEST FLAG: Switch to false when your real backend is ready!

export const apiClient = {
  async request(endpoint, options = {}) {
    // --- 1. RUNNING IN MOCK ENVIRONMENT MODE ---
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        // Simulate a 1-second network latency lag to test your loading spinners
        setTimeout(() => {

          // A. TEST CASE: POST /auth/login
          if (endpoint === "/auth/login") {
            const body = JSON.parse(options.body || "{}");

            // Check credentials safely
            if (body.email === "admin@agcpn.com" && body.password === "password123") {
              resolve({
                fullName: "AKOUDAD Abdessamad",
                email: "admin@agcpn.com",
                role: "Administrator"
              });
            } else {
              reject(new Error("Invalid email or security password string. Use admin@agcpn.com / password123"));
            }
          }

          // B. TEST CASE: GET /auth/me
          if (endpoint === "/auth/me") {
            // Check if our test cookie is still present in document context
            if (document.cookie.includes("ag_auth_session=true")) {
              resolve({
                fullName: "AKOUDAD Abdessamad",
                email: "admin@agcpn.com",
                role: "Administrator"
              });
            } else {
              reject(new Error("Unauthorized token footprint."));
            }
          }

        }, 1000);
      });
    }

    // --- 2. RUNNING IN PRODUCTION MODE (REAL URL) ---
    const url = `${BASE_URL}${endpoint}`;
    options.headers = { "Content-Type": "application/json", ...options.headers };
    options.credentials = "include";

    const response = await fetch(url, options);
    if (response.status === 401) {
      document.cookie = "ag_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.href = "/login";
      throw new Error("Session expired.");
    }
    if (!response.ok) throw new Error("Network communication failed.");
    return response.json();
  },

  async login(credentials) { return this.request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }); },
  async getProfile() { return this.request("/auth/me", { method: "GET" }); }
};

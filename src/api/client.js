const BASE_URL = "https://agcpn.com";
const USE_MOCK = true;

export const apiClient = {
  async request(endpoint, options = {}) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          if (endpoint === "/auth/login") {
            const body = JSON.parse(options.body || "{}");

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

          if (endpoint === "/auth/me") {
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

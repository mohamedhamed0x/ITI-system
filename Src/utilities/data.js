const API_URL = "http://localhost:3000";
const DB = {
  async getUsers() {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  },

  async findUser(email) {
    const users = await this.getUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  async addUser(user) {
    user.createdAt = new Date().toISOString();
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return res.json();
  },

  async updateUser(userId, data) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteUser(userId) {
    await fetch(`${API_URL}/users/${userId}`, { method: "DELETE" });
  },

  async getDoctors(includeUnapproved = false) {
    const users = await this.getUsers();
    return users.filter(
      (u) => u.role === "doctor" && (includeUnapproved || u.approved)
    );
  },

  async getPatients() {
    const users = await this.getUsers();
    return users.filter((u) => u.role === "patient");
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  },

  setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem("currentUser");
  },

  async getAppointments() {
    const res = await fetch(`${API_URL}/appointments`);
    return res.json();
  },

  async addAppointment(apt) {
    apt.createdAt = new Date().toISOString();
    const res = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apt),
    });
    return res.json();
  },

  async updateAppointment(aptId, data) {
    const res = await fetch(`${API_URL}/appointments/${aptId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getMedicalRecords() {
    const res = await fetch(`${API_URL}/medicalRecords`);
    return res.json();
  },

  async addMedicalRecord(record) {
    record.createdAt = new Date().toISOString();
    const res = await fetch(`${API_URL}/medicalRecords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    return res.json();
  },
};

import axios from "axios";
import { API_BASE_URL } from "../Config";

export const policeOfficerApi = {
  register: async (data) => {
    return fetch(`${API_BASE_URL}/policeOfficers/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },
  
  login: async (data) => {
    return fetch(`${API_BASE_URL}/policeOfficers/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },
  
  getAll : async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/policeIssueFine/all`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  
  
  update: async (id, data, token) => {
    return fetch(`${API_BASE_URL}/policeOfficers/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  },
  
  delete: async (id, token) => {
    return fetch(`${API_BASE_URL}/policeOfficers/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },
  
  issueFine: async (data, token) => {
    return fetch(`${API_BASE_URL}/policeIssueFine/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  },
  
  getFinesByNIC: async (nic, token) => {
    return fetch(`${API_BASE_URL}/policeIssueFine/fines-get-by-NIC/${nic}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  getFinesByOfficer: async (officerId, token) => {
    return fetch(`${API_BASE_URL}/policeIssueFine/policeOfficer-get-by-policeId/${officerId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
};
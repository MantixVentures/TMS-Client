import { API_BASE_URL } from "../Config";

export const policeFineApi = {
    getAllUsers: async (token) => {
        return fetch(`${API_BASE_URL}/users/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      },
    
      // Fine Management
      getAllOffences: async (token) => {
        return fetch(`${API_BASE_URL}/fine/all`, {
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

      getOffenceById: async (id, token) => {
        return fetch(`${API_BASE_URL}/fine/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    
};
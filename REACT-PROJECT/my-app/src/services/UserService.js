
import axios from "axios" ;

const API_BASE_URL = "http://localhost:9090/api/users/"; // Ensure this matches your backend API

class UserService {
    // Get JWT token from localStorage (ensure token is stored after login)
    getAuthToken() {
        return localStorage.getItem("token") || null; 
    }
    

    // Get user by ID with authentication
    async getUserById(id) {
        try {
            const token = this.getAuthToken();
            const response = await axios.get(`${API_BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to request
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            this.handleAuthError(error); // Handle authentication errors
            throw error;
        }
    }

    
    // Delete user by ID (No Authentication)
    async  deleteUser(userId) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${userId}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            return response.data; // Success message
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
    
    

    
    
    
    

    // Handle authentication errors (e.g., token expiration)
    handleAuthError(error) {
        if (error.response && error.response.status === 401) {
            console.error("⚠ Unauthorized! Redirecting to login...");
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token"); // Clear invalid token
            window.location.href = "/login"; // Redirect to login page
        }
    }
}

// ✅ Export a single instance
const userServiceInstance = new UserService();
export default userServiceInstance;

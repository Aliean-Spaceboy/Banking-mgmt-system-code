import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/UserService";

const EnterUserId = () => {
  const { id } = useParams(); // Get user ID from URL if present
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      handleDeleteUser(id);
    }
  }, [id]);

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await userService.deleteUser(userId);
      alert(`User with ID ${userId} deleted successfully!`);
      navigate("/"); // Redirect to home or another page after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please enter a User ID.");
      return;
    }
    navigate(`/delete-user/${userId}`); // Redirect with user ID
  };

  return (
    <div className="container mt-4">
      {!id ? (
        <>
          <h2>Delete User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter User ID:</label>
              <input
                type="text"
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
              />
            </div>
            <button className="btn btn-danger mt-3" type="submit">
              Delete
            </button>
          </form>
        </>
      ) : (
        <div>
          <h2>Deleting User...</h2>
          {loading ? <p>Processing...</p> : <p>Redirecting...</p>}
        </div>
      )}
    </div>
  );
};

export default EnterUserId;

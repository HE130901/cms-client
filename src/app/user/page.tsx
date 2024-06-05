"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });
  const [deleteUserId, setDeleteUserId] = useState("");

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7148/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserById = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7148/api/users/${userId}`
      );
      setUser(response.data);
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7148/api/users",
        newUser
      );
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUserById = async () => {
    try {
      await axios.put(
        `https://localhost:7148/api/users/${updateUser.id}`,
        updateUser
      );
      fetchUsers();
    } catch (error) {
      console.error(`Error updating user with ID ${updateUser.id}:`, error);
    }
  };

  const deleteUserById = async () => {
    try {
      await axios.delete(`https://localhost:7148/api/users/${deleteUserId}`);
      fetchUsers();
    } catch (error) {
      console.error(`Error deleting user with ID ${deleteUserId}:`, error);
    }
  };

  return (
    <div>
      <h1>Users Management</h1>

      <div>
        <h2>All Users</h2>
        <button onClick={fetchUsers}>Refresh</button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Fetch User By ID</h2>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
        />
        <button onClick={fetchUserById}>Fetch User</button>
        {user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Create User</h2>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Enter user name"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Enter user email"
        />
        <button onClick={createUser}>Create User</button>
      </div>

      <div>
        <h2>Update User</h2>
        <input
          type="text"
          value={updateUser.id}
          onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
          placeholder="Enter user ID"
        />
        <input
          type="text"
          value={updateUser.name}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, name: e.target.value })
          }
          placeholder="Enter user name"
        />
        <input
          type="email"
          value={updateUser.email}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, email: e.target.value })
          }
          placeholder="Enter user email"
        />
        <button onClick={updateUserById}>Update User</button>
      </div>

      <div>
        <h2>Delete User</h2>
        <input
          type="text"
          value={deleteUserId}
          onChange={(e) => setDeleteUserId(e.target.value)}
          placeholder="Enter user ID"
        />
        <button onClick={deleteUserById}>Delete User</button>
      </div>
    </div>
  );
};

export default UsersComponent;

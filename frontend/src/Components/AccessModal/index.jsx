import axios from "axios";
import React, { useState } from "react";

const AccessModal = ({ visible, closeModal }) => {
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin-access", {
        password,
      });
      closeModal();
    } catch (error) {
      setError("Incorrect Password");

      setTimeout(function () {
        setError("");
      }, 5000);
    }
  };
  const [password, setPassword] = useState("");
  return (
    <>
      {visible && (
        <div className="access-modal">
          <div className="access-modal-inner">
            <h1>Admin Password</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <span className="error">{error}</span>
              </div>
              <div className="button-outer">
                <button type="submit" onClick={handleSubmit}>
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessModal;

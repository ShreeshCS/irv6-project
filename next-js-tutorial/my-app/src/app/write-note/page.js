"use client";
import { useEffect, useState } from "react";

export default function Write() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      if (res.ok) {
        setUsers(await res.json());
      }
    }
    fetchUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const formData = new FormData(e.target);
    const res = await fetch("/api/write-note", {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    if (res.ok) {
      setSuccess("Note saved!");
      e.target.reset();
    } else {
      setError("Failed to save note");
    }
  }

  return (
    <div>
      <fieldset className="note-fieldset">
        <legend>Write a new note</legend>
        <form onSubmit={handleSubmit} className="note-form">
          <label>
            From
            <select name="from_user">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            To
            <select defaultValue={2} name="to_user">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Note
            <textarea name="note" />
          </label>
          <button type="submit" disabled={loading}>
            Save
          </button>
        </form>
        {success && <div style={{ color: "green" }}>{success}</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </fieldset>
    </div>
  );
}

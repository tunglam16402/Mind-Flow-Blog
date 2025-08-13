"use client";

import { useState } from "react";

export default function ZendeskTicketForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/tickets", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Ticket created successfully!");
      e.currentTarget.reset();
    } else {
      alert("Error: " + data.error);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Create Zendesk Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="userName"
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="userEmail"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input name="file" type="file" className="w-full" />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

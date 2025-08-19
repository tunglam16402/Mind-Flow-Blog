/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function GorgiasTicketForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        body: formData,
      });

      setLoading(false);

      // đọc raw text trước
      const text = await res.text();
      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text; // nếu không phải JSON
        }
      }

      if (res.ok) {
        alert("✅ Ticket created successfully!");
        e.currentTarget.reset();
      } else if (data?.error) {
        alert("❌ Error: " + JSON.stringify(data.error));
      }
    } catch (err: any) {
      setLoading(false);
      alert("❌ Error: " + JSON.stringify(err));
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Create Return Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="orderNumber"
          type="text"
          placeholder="Order Number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="productBeingReturn"
          type="text"
          placeholder="Product Being Returned"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="reasonReturn"
          type="text"
          placeholder="Reason for Return"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="batchSerialNumber"
          type="text"
          placeholder="Batch / Serial Number"
          className="w-full p-2 border rounded"
        />
        <input
          name="untouched"
          type="text"
          placeholder="Product is Untouched? (Yes/No)"
          className="w-full p-2 border rounded"
        />
        <input
          name="desiredOutcome"
          type="text"
          placeholder="Desired Outcome"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="additionalInfo"
          placeholder="Additional Information"
          className="w-full p-2 border rounded"
        />
        <input
          name="attachments" // optional
          type="file"
          className="w-full"
          multiple
        />

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

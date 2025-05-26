import { useState } from "react";

export default function MessageForm() {
  const [situation, setSituation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/generate-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation, email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Error: " + (data.detail || "Something went wrong."));
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Get Dating Advice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <textarea
          placeholder="Describe your situation..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded h-24"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Thinking..." : "Generate Message"}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <strong>Advice:</strong>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) {
      setAnswer("Please enter a question.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      setAnswer(data.answer || data.error || "No answer received.");
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        AI Markdown Knowledge Base Chatbot
      </h1>

      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Ask Your Question
        </h2>

        <input
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askAI();
          }}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {answer && (
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <h3 className="font-bold">Answer:</h3>
            <p className="mt-2 whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}
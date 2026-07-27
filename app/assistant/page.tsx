"use client";

import { useState } from "react";
import Link from "next/link";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.result },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't get a response. Please try again.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred while connecting to LabMate AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex justify-between items-center pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-teal-400">
            🧪 LabMate AI Assistant
          </h1>
          <p className="text-sm text-slate-400">
            Protocol Guidance & Troubleshooting Specialist
          </p>
        </div>
        <Link
          href="/"
          className="text-sm bg-slate-800 hover:bg-slate-700 text-teal-300 px-4 py-2 rounded-lg transition"
        >
          ← Back to Calculators
        </Link>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto my-6 bg-slate-800/60 rounded-xl border border-slate-700 p-4 min-h-[400px] flex flex-col justify-between">
        {/* Messages List */}
        <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto p-2">
          {messages.length === 0 ? (
            <div className="text-center text-slate-400 my-12">
              <p className="text-lg font-medium">Welcome to LabMate AI!</p>
              <p className="text-sm mt-1">
                Ask me about protocols, buffer prep, or troubleshooting experiments like PCR & Western Blot.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-teal-600 text-white ml-auto"
                    : "bg-slate-900 text-slate-200 border border-slate-700"
                }`}
              >
                <p className="font-semibold text-xs mb-1 opacity-75">
                  {msg.role === "user" ? "You" : "LabMate AI"}
                </p>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))
          )}
          {loading && (
            <div className="p-3 rounded-lg bg-slate-900 text-slate-400 border border-slate-700 text-sm animate-pulse">
              LabMate AI is analyzing...
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your protocol query or experiment issue..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
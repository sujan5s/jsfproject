import React, { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋, I’m FloraBot! How can I help you with your plants today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    // Simple simulated AI response (replace with Gemini/OpenAI API later)
    const response = {
      sender: "bot",
      text:
        input.toLowerCase().includes("water")
          ? "Most indoor plants prefer watering once every 5-7 days 💧."
          : "That’s a great question! I’ll soon connect you with plant info 🌿.",
    };

    setTimeout(() => setMessages((prev) => [...prev, response]), 600);
    setInput("");
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        title="Chat with FloraBot"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🌿 FloraBot</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-msg ${m.sender === "user" ? "user" : "bot"}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
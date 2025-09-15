import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm your assistant. How can I help you today?",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage = { id: Date.now(), type: "user", text: inputText };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          type: "bot",
          text: `I understand you're asking about "${inputText}". Based on your current data, I can help you analyze  SKIN ELEMENTS, profit margins, and product performance. Would you like specific insights about any product?`,
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);

      setInputText("");
    }
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Assistant</h1>

      <div className="flex-1 bg-white rounded-xl shadow p-4 mb-4 overflow-y-auto max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me anything about your data..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

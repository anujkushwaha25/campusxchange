import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaSearch,
  FaCommentDots,
  FaPaperclip,
  FaSmile,
  FaPaperPlane,
  FaEllipsisV,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaCheckDouble,
} from "react-icons/fa";

import "./Messages.css";

// ================================
// NO BACKEND YET
// ================================
// All conversations + messages live in the browser's
// localStorage. This means:
//  - Messages survive a page refresh on the same device/browser.
//  - Nothing is shared between two different users/devices.
//  - When a real backend exists, swap `loadConversations` /
//    `saveConversations` for API calls and the rest of the
//    component logic (state, handlers, JSX) stays the same.

const STORAGE_KEY = "cx_conversations_v1";
const AVATAR_COLORS = ["blue", "pink", "green", "orange", "purple"];

// ================================
// DEFAULT DUMMY DATA (used only the very first time,
// before anything is saved to localStorage)
// ================================

const defaultConversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    initial: "R",
    color: "blue",
    online: true,
    type: "selling",
    unread: 2,
    product: "MacBook Air M1",
    description: "8GB RAM • 256GB SSD",
    price: "₹45,000",
    messages: [
      { sender: "them", text: "Hi! Is the MacBook Air M1 still available?", time: "10:35 PM" },
      { sender: "me", text: "Hey Rahul! Yes, it's still available.", time: "10:37 PM" },
      { sender: "them", text: "Great! What is the condition of the laptop?", time: "10:38 PM" },
      { sender: "me", text: "It's in very good condition. I've been using it carefully and there are no major scratches.", time: "10:39 PM" },
      { sender: "them", text: "Can you lower the price a little?", time: "10:41 PM" },
      { sender: "me", text: "Sure, we can discuss it when we meet.", time: "10:42 PM" },
      { sender: "them", text: "Is the laptop still available?", time: "10:42 PM" },
    ],
  },
  {
    id: 2,
    name: "Priya Singh",
    initial: "P",
    color: "pink",
    online: true,
    type: "buying",
    unread: 0,
    product: "Java Programming Book",
    description: "Good condition",
    price: "₹350",
    messages: [{ sender: "them", text: "Thanks! I'll take it.", time: "9:28 PM" }],
  },
  {
    id: 3,
    name: "Aman Verma",
    initial: "A",
    color: "green",
    online: false,
    type: "selling",
    unread: 1,
    product: "Ergonomic Chair",
    description: "Excellent condition",
    price: "₹1,200",
    messages: [{ sender: "them", text: "Can we meet near the library?", time: "Yesterday" }],
  },
  {
    id: 4,
    name: "Sneha Patel",
    initial: "S",
    color: "orange",
    online: false,
    type: "buying",
    unread: 0,
    product: "iPhone 13",
    description: "128GB • Good condition",
    price: "₹32,000",
    messages: [{ sender: "them", text: "Is the price negotiable?", time: "Yesterday" }],
  },
  {
    id: 5,
    name: "Vikram Joshi",
    initial: "V",
    color: "purple",
    online: false,
    type: "selling",
    unread: 0,
    product: "Study Table",
    description: "Wooden table",
    price: "₹1,500",
    messages: [{ sender: "them", text: "Okay, sounds good 👍", time: "Monday" }],
  },
];

// ================================
// LOCALSTORAGE HELPERS
// ================================

const loadConversations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Could not read saved messages:", e);
  }
  return defaultConversations;
};

const saveConversations = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Could not save messages:", e);
  }
};

const nowTime = () =>
  new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const lastMessagePreview = (conv) =>
  conv.messages.length ? conv.messages[conv.messages.length - 1].text : "";

const lastMessageTime = (conv) =>
  conv.messages.length ? conv.messages[conv.messages.length - 1].time : "";

const Messages = () => {
  const location = useLocation();
  const { sellerId } = useParams();

  const [conversations, setConversations] = useState(loadConversations);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [mobileChat, setMobileChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handledIncoming = useRef(false);

  // Save to localStorage any time conversations change
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  // ================================
  // Handle arriving from the Buy Product page
  // (route: /messages/:sellerId, with navigate state
  // { product, seller, message, pickupSpot, pickupTime })
  // ================================
  useEffect(() => {
    if (handledIncoming.current) return;

    const incomingSeller = location.state?.seller;
    const incomingProduct = location.state?.product;
    const incomingMessage = location.state?.message;
    const routeId = sellerId ? Number(sellerId) : incomingSeller?.id;

    if (!routeId) return; // plain "/messages" visit, nothing to merge

    handledIncoming.current = true;

    setConversations((prev) => {
      const existingIndex = prev.findIndex((c) => c.id === routeId);

      // Conversation with this seller already exists — just add the
      // drafted message onto it (and don't duplicate on re-render/refresh)
      if (existingIndex !== -1) {
        const existing = prev[existingIndex];
        const alreadySent =
          incomingMessage &&
          existing.messages.some(
            (m) => m.sender === "me" && m.text === incomingMessage
          );

        if (!incomingMessage || alreadySent) return prev;

        const updated = [...prev];
        updated[existingIndex] = {
          ...existing,
          messages: [
            ...existing.messages,
            { sender: "me", text: incomingMessage, time: nowTime() },
          ],
        };
        return updated;
      }

      // Brand new conversation, started from the Buy Product page
      const newConversation = {
        id: routeId,
        name: incomingSeller?.name || "Seller",
        initial: (incomingSeller?.name || "S").charAt(0).toUpperCase(),
        color: AVATAR_COLORS[routeId % AVATAR_COLORS.length],
        online: true,
        unread: 0,
        type: "buying",
        product: incomingProduct?.name || "Item",
        description: incomingProduct?.condition || "",
        price: incomingProduct
          ? `₹${Number(incomingProduct.price).toLocaleString("en-IN")}`
          : "",
        messages: incomingMessage
          ? [{ sender: "me", text: incomingMessage, time: nowTime() }]
          : [],
      };

      return [newConversation, ...prev];
    });

    setSelectedChatId(routeId);
    setMobileChat(true);
  }, [location.state, sellerId]);

  // Default selection for a plain "/messages" visit
  useEffect(() => {
    if (!selectedChatId && conversations.length) {
      setSelectedChatId(conversations[0].id);
    }
  }, [conversations, selectedChatId]);

  const currentChat =
    conversations.find((c) => c.id === selectedChatId) || conversations[0];

  const handleSend = () => {
    if (!message.trim() || !currentChat) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === currentChat.id
          ? {
              ...c,
              messages: [
                ...c.messages,
                { sender: "me", text: message.trim(), time: nowTime() },
              ],
            }
          : c
      )
    );

    setMessage("");
  };

  const openChat = (id) => {
    setSelectedChatId(id);
    setMobileChat(true);

    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const filteredConversations = conversations.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(term) ||
      c.product.toLowerCase().includes(term);

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Unread" && c.unread > 0) ||
      (activeFilter === "Buying" && c.type === "buying") ||
      (activeFilter === "Selling" && c.type === "selling");

    return matchesSearch && matchesFilter;
  });

  if (!currentChat) {
    return (
      <>
        <Navbar />
        <div className="cx-messages-page">
          <main className="cx-message-main">
            <p>No conversations yet.</p>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cx-messages-page">
        <main className="cx-message-main">
          <div className="cx-message-heading">
            <div>
              <h1>Messages</h1>
              <p>Connect with buyers and sellers on CampusXchange.</p>
            </div>

            <div className="cx-inbox-count">
              <FaCommentDots />
              {conversations.length} conversations
            </div>
          </div>

          <div className={`cx-chat-layout ${mobileChat ? "mobile-chat-open" : ""}`}>
            {/* ================= LEFT ================= */}
            <aside className="cx-conversations">
              <div className="cx-conversation-title">
                <div>
                  <h2>Inbox</h2>
                  <p>Your recent conversations</p>
                </div>
              </div>

              <div className="cx-inbox-search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="cx-filters">
                {["All", "Unread", "Buying", "Selling"].map((f) => (
                  <button
                    key={f}
                    className={activeFilter === f ? "active" : ""}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="cx-conversation-list">
                {filteredConversations.length === 0 && (
                  <p style={{ padding: "10px", fontSize: "11px", color: "#9ba0ae" }}>
                    No conversations found.
                  </p>
                )}

                {filteredConversations.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => openChat(chat.id)}
                    className={`cx-conversation ${
                      currentChat.id === chat.id ? "selected" : ""
                    }`}
                  >
                    <div className={`cx-avatar ${chat.color}`}>
                      {chat.initial}
                      {chat.online && <span className="cx-online"></span>}
                    </div>

                    <div className="cx-conversation-info">
                      <div className="cx-conversation-name">
                        <h3>{chat.name}</h3>
                        <span>{lastMessageTime(chat)}</span>
                      </div>

                      <div className="cx-last-message">
                        <p>{lastMessagePreview(chat)}</p>
                        {chat.unread > 0 && (
                          <span className="cx-unread">{chat.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* ================= RIGHT CHAT ================= */}
            <section className="cx-active-chat">
              <div className="cx-chat-header">
                <div className="cx-chat-person">
                  <button className="cx-back-btn" onClick={() => setMobileChat(false)}>
                    <FaArrowLeft />
                  </button>

                  <div className={`cx-avatar ${currentChat.color}`}>
                    {currentChat.initial}
                    {currentChat.online && <span className="cx-online"></span>}
                  </div>

                  <div>
                    <h2>{currentChat.name}</h2>
                    <p>
                      <span></span>
                      {currentChat.online ? "Active now" : "Last seen recently"}
                    </p>
                  </div>
                </div>

                <button className="cx-more-btn">
                  <FaEllipsisV />
                </button>
              </div>

              <div className="cx-product-card">
                <div className="cx-product-icon">
                  <FaShoppingBag />
                </div>

                <div className="cx-product-info">
                  <small>ABOUT THIS ITEM</small>
                  <h3>{currentChat.product}</h3>
                  <p>{currentChat.description}</p>
                  <span>
                    <FaMapMarkerAlt />
                    ITM University
                  </span>
                </div>

                <div className="cx-product-price">
                  <strong>{currentChat.price}</strong>
                  <button>View Item</button>
                </div>
              </div>

              <div className="cx-chat-messages">
                <div className="cx-today">
                  <span>Today</span>
                </div>

                {currentChat.messages.length === 0 && (
                  <p style={{ textAlign: "center", fontSize: "11px", color: "#a0a5b2" }}>
                    Say hi to start the conversation.
                  </p>
                )}

                {currentChat.messages.map((chat, index) => (
                  <div
                    key={index}
                    className={`cx-message ${chat.sender === "me" ? "sent" : "received"}`}
                  >
                    {chat.sender === "them" && (
                      <div className={`cx-avatar small ${currentChat.color}`}>
                        {currentChat.initial}
                      </div>
                    )}

                    <div>
                      <div className="cx-message-bubble">{chat.text}</div>
                      <div className="cx-message-time">
                        {chat.time}
                        {chat.sender === "me" && <FaCheckDouble />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cx-message-composer">
                <button className="cx-attach">
                  <FaPaperclip />
                </button>

                <div className="cx-input-box">
                  <input
                    type="text"
                    value={message}
                    placeholder="Write a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                  />
                  <button type="button">
                    <FaSmile />
                  </button>
                </div>

                <button className="cx-send" onClick={handleSend}>
                  <FaPaperPlane />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Messages;

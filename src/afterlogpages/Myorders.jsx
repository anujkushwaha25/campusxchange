import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {
  FaShoppingBag,
  FaClock,
  FaCheck,
  FaTimes,
  FaBoxOpen,
  FaChevronDown,
} from "react-icons/fa";

import "./Myorders.css";


const Myorders = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [sortBy, setSortBy] = useState("Latest");

  const orders = [
    {
      id: "CXO12345",
      name: "Boat Rockerz 450 Headphones",
      seller: "TechStore",
      category: "Electronics",
      price: 1299,
      status: "Shipped",
      date: "20 May 2025, 10:30 AM",
      image: null,
    },
    {
      id: "CXO12344",
      name: "Atomic Habits",
      seller: "BookHub",
      category: "Books",
      price: 299,
      status: "To Pay",
      date: "19 May 2025, 09:15 PM",
      image: null,
    },
    {
      id: "CXO12343",
      name: "Water Bottle 1L",
      seller: "DailyNeeds",
      category: "Home & Kitchen",
      price: 199,
      status: "To Receive",
      date: "18 May 2025, 02:45 PM",
      image: null,
    },
    {
      id: "CXO12342",
      name: "College Backpack",
      seller: "Campus Essentials",
      category: "Bags & Luggage",
      price: 850,
      status: "Delivered",
      date: "15 May 2025, 11:20 AM",
      image: null,
    },
    {
      id: "CXO12341",
      name: "Study Table Lamp",
      seller: "BrightHome",
      category: "Home & Kitchen",
      price: 349,
      status: "Cancelled",
      date: "10 May 2025, 08:30 PM",
      image: null,
    },
  ];

  const stats = [
    {
      title: "Total Orders",
      count: 12,
      subtitle: "All time",
      icon: <FaShoppingBag />,
      className: "total-stat",
    },
    {
      title: "Active Orders",
      count: 4,
      subtitle: "To Pay + Shipped",
      icon: <FaClock />,
      className: "active-stat",
    },
    {
      title: "Delivered",
      count: 6,
      subtitle: "Successfully delivered",
      icon: <FaCheck />,
      className: "delivered-stat",
    },
    {
      title: "Cancelled",
      count: 2,
      subtitle: "Cancelled orders",
      icon: <FaTimes />,
      className: "cancelled-stat",
    },
  ];


  const tabs = [
    "All Orders",
    "To Pay",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "All Orders") return true;

    if (activeTab === "To Pay") {
      return order.status === "To Pay";
    }

    return order.status === activeTab;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "Oldest") return a.id.localeCompare(b.id);
    return b.id.localeCompare(a.id);
  });

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <main className="my-orders-page">

      {/* PAGE HEADER */}
      <section className="orders-header">
        <div>
          <h1>My Orders</h1>
          <p>Track and manage all your orders in one place.</p>
        </div>
      </section>

      {/* ORDER STATS */}
      <section className="order-stats-grid">
        {stats.map((stat, index) => (
          <div className="order-stat-card" key={index}>

            <div className={`order-stat-icon ${stat.className}`}>
              {stat.icon}
            </div>

            <div className="order-stat-info">
              <h3>{stat.title}</h3>
              <strong>{stat.count}</strong>
              <span>{stat.subtitle}</span>
            </div>

          </div>
        ))}
      </section>

      {/* FILTER BAR */}
      <section className="orders-filter-bar">

        <div className="order-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`order-tab ${
                activeTab === tab ? "active-order-tab" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="orders-sort">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Latest">Sort by: Latest</option>
            <option value="Oldest">Sort by: Oldest</option>
          </select>

          <FaChevronDown />
        </div>

      </section>

      {/* ORDER LIST */}
      <section className="orders-list">

        {sortedOrders.length > 0 ? (
          sortedOrders.map((order) => (

            <article className="order-card" key={order.id}>

              {/* PRODUCT IMAGE AREA */}
              <div className="order-product-image">

                {order.image ? (
                  <img src={order.image} alt={order.name} />
                ) : (
                  <FaBoxOpen />
                )}

              </div>

              {/* PRODUCT INFO */}
              <div className="order-product-info">
                <h3>{order.name}</h3>

                <p>
                  Seller: <span>{order.seller}</span>
                </p>

                <span className="order-category">
                  {order.category}
                </span>
              </div>

              {/* ORDER DETAILS */}
              <div className="order-details">
                <div>
                  <span>Order ID</span>
                  <strong>{order.id}</strong>
                </div>

                <div>
                  <span>Order Date</span>
                  <strong>{order.date}</strong>
                </div>
              </div>

              {/* PRICE AND STATUS */}
              <div className="order-price-status">

                <div className="order-price">
                  <span>Amount</span>
                  <strong>₹{order.price.toLocaleString("en-IN")}</strong>
                </div>

                <div
                  className={`order-status ${
                    order.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                  }`}
                >
                  {order.status}
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="order-actions">

                <button className="view-order-btn">
                  View Details
                </button>

                {order.status === "Shipped" && (
                  <button className="primary-order-btn">
                    Track Order
                  </button>
                )}

                {order.status === "To Pay" && (
                  <button className="primary-order-btn">
                    Pay Now
                  </button>
                )}

                {order.status === "To Receive" && (
                  <button className="primary-order-btn">
                    Track Order
                  </button>
                )}

              </div>

            </article>
          ))
        ) : (
          <div className="no-orders">
            <FaShoppingBag />
            <h3>No orders found</h3>
            <p>You don't have any orders in this category.</p>
          </div>
        )}

      </section>

    </main>
    </>
  );
};

export default Myorders;
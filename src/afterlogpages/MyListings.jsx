import React, { useState } from "react";
import Navbar from "./components/Navbar";

import {
  FaStore,
  FaCheckCircle,
  FaFileAlt,
  FaImage,
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaLightbulb,
} from "react-icons/fa";

import "./MyListings.css";

const listings = [
  {
    id: 1,
    name: "Advanced JavaScript Book",
    price: 1000,
    category: "Books",
    status: "Active",
  },

  {
    id: 2,
    name: "Gaming Mouse",
    price: 2500,
    category: "Electronics",
    status: "Active",
  },

  {
    id: 3,
    name: "Study Table",
    price: 800,
    category: "Furniture",
    status: "Sold",
  },

  {
    id: 4,
    name: "DBMS Notes",
    price: 500,
    category: "Notes",
    status: "Draft",
  },

  {
    id: 5,
    name: "Scientific Calculator",
    price: 700,
    category: "Electronics",
    status: "Sold",
  },

  {
    id: 6,
    name: "Hostel Chair",
    price: 600,
    category: "Hostel Essentials",
    status: "Draft",
  },

  {
    id: 7,
    name: "React Development Book",
    price: 1200,
    category: "Books",
    status: "Active",
  },

  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 1800,
    category: "Electronics",
    status: "Active",
  },

  {
    id: 9,
    name: "Office Chair",
    price: 1500,
    category: "Furniture",
    status: "Sold",
  },

  {
    id: 10,
    name: "Cycle",
    price: 4500,
    category: "Vehicle",
    status: "Draft",
  },
  
];



const MyListings = () => {
  const [activeTab, setActiveTab] = useState("active");

 //------------------FOR PAGE NUMBERS----
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [sortOption, setSortOption] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Modal state
  const [modalType, setModalType] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  const openModal = (type, listing) => {
    setModalType(type);
    setSelectedListing(listing);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedListing(null);
  };

  {/*-------------------------- FILTER SECTION -----------------------------------------*/}


  const filteredListings = listings
  .filter((item) => {
    // Status filter
    if (activeTab === "drafts") {
      return item.status === "Draft";
    }

    return item.status.toLowerCase() === activeTab;
  })
  .filter((item) => {
    // Category filter
    if (categoryFilter === "all") {
      return true;
    }

    return item.category === categoryFilter;
  })
  .sort((a, b) => {
    // Sorting
    if (sortOption === "price-low") {
      return a.price - b.price;
    }

    if (sortOption === "price-high") {
      return b.price - a.price;
    }

    if (sortOption === "oldest") {
      return a.id - b.id;
    }

    // newest
    return b.id - a.id;
  });


      const activeCount = listings.filter(
  (item) => item.status === "Active"
).length;

const soldCount = listings.filter(
  (item) => item.status === "Sold"
).length;

const draftCount = listings.filter(
  (item) => item.status === "Draft"
).length;

  // Dummy data ONLY for showing empty/placeholder cards.
  // Later this will come from the products uploaded by the user.
          const dummyItems = [1, 2, 3, 4];

          const totalPages = Math.ceil(
          filteredListings.length / itemsPerPage
        );

        const startIndex = (currentPage - 1) * itemsPerPage;

        const currentListings = filteredListings.slice(
          startIndex,
          startIndex + itemsPerPage
        );

  return (
<>
      <Navbar />
    <div className="my-listings-page">

      {/* ================= HEADER ================= */}

      <div className="listings-header">

        <div className="listings-title">
          <div className="title-icon">
            <FaStore />
          </div>

          <div>
            <h1>My Listings</h1>
            <p>
              Manage all the items you have listed for sale on CampusXchange.
            </p>
          </div>
        </div>

        {/* Tip */}
        <div className="listing-tip">
          <div className="tip-icon">
            <FaLightbulb />
          </div>

          <div>
            <strong>Tip</strong>
            <p>
              Keep your listings up to date to get more views and faster
              responses.
            </p>
          </div>
        </div>

      </div>


      {/* ================= SUMMARY CARDS ================= */}

      <div className="listing-summary">

        <div
          className="summary-card active-summary"
          onClick={() => {
                    setActiveTab("active");
                    setCurrentPage(1);
                  }}>
        
          <div className="summary-icon">
            <FaStore />
          </div>

          <div className="summary-info">
            <h2>{activeCount}</h2>
            <h3>Active Listings</h3>
            <p>Items currently for sale</p>
          </div>

          <span className="summary-arrow">›</span>
        </div>


        <div
          className="summary-card sold-summary"
            onClick={() => {
               setActiveTab("sold");
                setCurrentPage(1);}}
        >
          <div className="summary-icon">
            <FaCheckCircle />
          </div>

          <div className="summary-info">
            <h2>{soldCount}</h2>
            <h3>Sold Items</h3>
            <p>Successfully sold items</p>
          </div>

          <span className="summary-arrow">›</span>
        </div>


        <div
          className="summary-card draft-summary"
          onClick={() => {
            setActiveTab("drafts");
            setCurrentPage(1);}}
        >
          <div className="summary-icon">
            <FaFileAlt />
          </div>

          <div className="summary-info">
            <h2>{draftCount}</h2>
            <h3>Drafts</h3>
            <p>Saved but not published</p>
          </div>

          <span className="summary-arrow">›</span>
        </div>

      </div>


      {/* ================= LISTINGS CONTAINER ================= */}

      <div className="listings-container">

        {/* Tabs */}

        <div className="listing-tabs">

          <button
            className={activeTab === "active" ? "tab active-tab" : "tab"}
            onClick={() => {setActiveTab("active");setCurrentPage(1);}}
            
          >
            <FaStore />
            Active Listings
          </button>

          <button
            className={activeTab === "sold" ? "tab active-tab" : "tab"}
            onClick={() =>{ setActiveTab("sold");setCurrentPage(1);}}
          >
            <FaCheckCircle />
            Sold Items
          </button>

          <button
            className={activeTab === "drafts" ? "tab active-tab" : "tab"}
            onClick={() => {setActiveTab("drafts");setCurrentPage(1);}}
          >
            <FaFileAlt />
            Drafts
          </button>

        </div>


        {/* ================= CONTENT HEADER ================= */}

        <div className="listing-content-header">

          <h2>
            {activeTab === "active" && "Active Listings"}
            {activeTab === "sold" && "Sold Items"}
            {activeTab === "drafts" && "Drafts"}
          </h2>

          <div className="listing-controls">

            <div className="dropdown-wrapper">

                  <button
                    className="sort-button"
                    onClick={() => {
                      setShowSortMenu(!showSortMenu);
                      setShowFilterMenu(false);
                    }}
                  >
                    Sort by:{" "}
                    {sortOption === "newest" && "Newest"}
                    {sortOption === "oldest" && "Oldest"}
                    {sortOption === "price-low" && "Price: Low to High"}
                    {sortOption === "price-high" && "Price: High to Low"}

                    <FaChevronDown />
                  </button>


                  {showSortMenu && (
                    <div className="dropdown-menu">

                      <button
                        className={sortOption === "newest" ? "selected-option" : ""}
                        onClick={() => {
                          setSortOption("newest");
                          setShowSortMenu(false);
                        }}
                      >
                        Newest
                      </button>

                      <button
                        className={sortOption === "oldest" ? "selected-option" : ""}
                        onClick={() => {
                          setSortOption("oldest");
                          setShowSortMenu(false);
                        }}
                      >
                        Oldest
                      </button>

                      <button
                        className={sortOption === "price-low" ? "selected-option" : ""}
                        onClick={() => {
                          setSortOption("price-low");
                          setShowSortMenu(false);
                        }}
                      >
                        Price: Low to High
                      </button>

                      <button
                        className={sortOption === "price-high" ? "selected-option" : ""}
                        onClick={() => {
                          setSortOption("price-high");
                          setShowSortMenu(false);
                        }}
                      >
                        Price: High to Low
                      </button>

                    </div>
                  )}

                </div>

                     <div className="dropdown-wrapper">

                      <button
                        className="filter-button"
                        onClick={() => {
                          setShowFilterMenu(!showFilterMenu);
                          setShowSortMenu(false);
                        }}
                      >
                        <FaFilter />
                        Filter

                        {categoryFilter !== "all" && (
                          <span className="filter-active-dot"></span>
                        )}
                      </button>


                      {showFilterMenu && (
                        <div className="dropdown-menu filter-menu">

                          <button
                            className={
                              categoryFilter === "all"
                                ? "selected-option"
                                : ""
                            }
                            onClick={() => {
                              setCategoryFilter("all");
                              setCurrentPage(1);
                              setShowFilterMenu(false);
                            }}
                          >
                            All Categories
                          </button>

                          <button
                            className={
                              categoryFilter === "Books"
                                ? "selected-option"
                                : ""
                            }
                            onClick={() => {
                              setCategoryFilter("Books");
                              setCurrentPage(1);
                              setShowFilterMenu(false);
                            }}
                          >
                            Books
                          </button>

                          <button
                            className={
                              categoryFilter === "Electronics"
                                ? "selected-option"
                                : ""
                            }
                            onClick={() => {
                              setCategoryFilter("Electronics");
                              setCurrentPage(1);
                              setShowFilterMenu(false);
                            }}
                          >
                            Electronics
                          </button>

                          <button
                            className={
                              categoryFilter === "Furniture"
                                ? "selected-option"
                                : ""
                            }
                            onClick={() => {
                              setCategoryFilter("Furniture");
                              setCurrentPage(1);
                              setShowFilterMenu(false);
                            }}
                          >
                            Furniture
                          </button>

                          <button
                            className={
                              categoryFilter === "Notes"
                                ? "selected-option"
                                : ""
                            }
                            onClick={() => {
                              setCategoryFilter("Notes");
                              setCurrentPage(1);
                              setShowFilterMenu(false);
                            }}
                          >
                            Notes
                          </button>

                          <button
                            className={
                              categoryFilter === "Hostel Essentials"
                                ? "selected-option"
                                : ""
                            }
                            onClick={() => {
                              setCategoryFilter("Hostel Essentials");
                              setCurrentPage(1);
                              setShowFilterMenu(false);
                            }}
                          >
                            Hostel Essentials
                          </button>

                          <button
                            className={
                              categoryFilter === "Vehicle"
                                ? "selected-option"
                                : ""
                            }
                            onClick={() => {
                              setCategoryFilter("Vehicle");
                              setCurrentPage(1);
                              setShowFilterMenu(false);
                            }}
                          >
                            Vehicle
                          </button>

                        </div>
                      )}

                    </div>
          </div>

        </div>


        {/* ================= PLACEHOLDER CARDS ================= */}

        <div className="listing-grid">

          {currentListings.map((item)=> (

            <div className="listing-card" key={item.id}>

              {/* Three dot menu */}

              <button className="more-button">
                <FaEllipsisV />
              </button>


              {/* Image placeholder */}

              <div className="listing-image-placeholder">

                <FaImage />

                <span>Image Preview</span>

              </div>


              {/* Product placeholder */}

              <div className="listing-details">

                  <div className="listing-category">
                    {item.category}
                  </div>

                  <h3 className="listing-name">
                    {item.name}
                  </h3>

                  <div className="location-placeholder">
                    <span>⌖</span>
                    <span>CampusXchange</span>
                  </div>

                  <div className="listing-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </div>


                {/* Status */}

                <div
                  className={`listing-status ${
                    item.status === "Active"
                      ? "active-status"
                      : item.status === "Sold"
                      ? "sold-status"
                      : "draft-status"
                  }`}>
                
                  <span></span>
                  {item.status}
                </div>

              </div>


              {/* Actions */}

              <div className="listing-actions">

                    <button onClick={() => openModal("view", item)}>
                      <FaEye />
                      View
                    </button>

          <button onClick={() => openModal("edit", item)}>
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      className="delete-action"
                      onClick={() => openModal("delete", item)}
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

            </div>

          ))}

        </div>


        {/* ================= PAGINATION ================= */}

        <div className="listing-pagination">

                      <button
                        className="pagination-arrow"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <FaChevronLeft />
                      </button>


                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          className={`pagination-number ${
                            currentPage === index + 1
                              ? "active-page"
                              : ""
                          }`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}


                      <button
                        className="pagination-arrow"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <FaChevronRight />
                      </button>
                <span>
                  Showing{" "}
                  {filteredListings.length === 0
                    ? 0
                    : `${startIndex + 1}–${Math.min(
                        startIndex + itemsPerPage,
                        filteredListings.length
                      )}`}{" "}
                  of {filteredListings.length}{" "}
                  {filteredListings.length === 1 ? "item" : "items"}
                </span>

        </div>

      </div>
    


{/* ================= MODAL ================= */}

{modalType && selectedListing && (
  <div className="modal-overlay" onClick={closeModal}>

    <div
      className="listing-modal"
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE BUTTON */}
      <button
        className="modal-close"
        onClick={closeModal}
      >
        ×
      </button>


      {/* VIEW MODAL */}
      {modalType === "view" && (
        <>
          <div className="modal-header">
            <div>
              <span className="modal-category">
                {selectedListing.category}
              </span>

              <h2>{selectedListing.name}</h2>

              <p>CampusXchange</p>
            </div>
          </div>

          <div className="modal-image">
            <FaImage />
            <span>Product Image</span>
          </div>

          <div className="modal-details">

            <div className="detail-box">
              <span>Price</span>
              <strong>
                ₹{selectedListing.price.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="detail-box">
              <span>Category</span>
              <strong>{selectedListing.category}</strong>
            </div>

            <div className="detail-box">
              <span>Status</span>
              <strong>{selectedListing.status}</strong>
            </div>

            <div className="detail-box">
              <span>Location</span>
              <strong>CampusXchange</strong>
            </div>

          </div>

          <div className="modal-footer">

            <button
              className="modal-secondary-btn"
              onClick={closeModal}
            >
              Close
            </button>

            <button
              className="modal-primary-btn"
              onClick={() => openModal("edit", selectedListing)}
            >
              <FaEdit />
              Edit Listing
            </button>

          </div>
        </>
      )}


      {/* EDIT MODAL */}
      {modalType === "edit" && (
        <>
          <div className="modal-heading">

            <span className="modal-icon">
              <FaEdit />
            </span>

            <div>
              <h2>Edit Listing</h2>
              <p>Update your product information</p>
            </div>

          </div>

          <div className="edit-form">

            <div className="form-group">
              <label>Product Name</label>

              <input
                type="text"
                defaultValue={selectedListing.name}
              />
            </div>


            <div className="form-row">

              <div className="form-group">
                <label>Price</label>

                <input
                  type="number"
                  defaultValue={selectedListing.price}
                />
              </div>


              <div className="form-group">
                <label>Category</label>

                <select defaultValue={selectedListing.category}>
                  <option>Books</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Notes</option>
                  <option>Hostel Essentials</option>
                  <option>Vehicle</option>
                </select>
              </div>

            </div>


            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                defaultValue="CampusXchange"
              />
            </div>


            <div className="form-group">
              <label>Description</label>

              <textarea
                rows="4"
                placeholder="Enter product description..."
              ></textarea>
            </div>

          </div>


          <div className="modal-footer">

            <button
              className="modal-secondary-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="modal-primary-btn"
              onClick={closeModal}
            >
              Save Changes
            </button>

          </div>
        </>
      )}


      {/* DELETE MODAL */}
      {modalType === "delete" && (
        <>
          <div className="delete-modal-content">

            <div className="delete-icon">
              <FaTrash />
            </div>

            <h2>Delete Listing?</h2>

            <p>
              Are you sure you want to delete
              <strong> "{selectedListing.name}" </strong>
              ?
            </p>

            <span>
              This action cannot be undone.
            </span>

          </div>


          <div className="modal-footer">

            <button
              className="modal-secondary-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="modal-delete-btn"
              onClick={() => {
                console.log("Delete:", selectedListing);
                closeModal();
              }}
            >
              <FaTrash />
              Delete Listing
            </button>

          </div>
        </>
      )}

    </div>

  </div>

)}




    </div>
    </>
  );
};

export default MyListings;
import React, { useMemo, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import {
  FaSearch,
  FaThLarge,
  FaList,
  FaHeart,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBook,
  FaLaptop,
  FaCouch,
  FaBicycle,
  FaHome,
  FaHeadphones,
  FaTshirt,
  FaGamepad,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

import BrowseProductCard from "./components/BrowseProductCard";

import "./BrowseProducts.css";

// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



// ================================
// CATEGORY DATA
// ================================

const browseProductCategories = [
  {
    name: "All",
    icon: <FaThLarge />,
  },
  {
    name: "Books",
    icon: <FaBook />,
  
  },
  {
    name: "Electronics",
    icon: <FaLaptop />,
  },
  {
    name: "Furniture",
    icon: <FaCouch />,
  },
  {
    name: "Vehicles",
    icon: <FaBicycle />,
  },
  {
    name: "Hostel Essentials",
    icon: <FaHome />,
  },
  {
    name: "Accessories",
    icon: <FaHeadphones />,
  },
  // {
  //   name: "Clothing",
  //   icon: <FaTshirt />,
  // },
  {
    name: "Gaming",
    icon: <FaGamepad />,
  },
];


// ================================
// PRODUCT DATA
// ================================

export const browseProductData = [
  {
    id: 1,
    name: "MacBook Air M2",
    price: 58999,
    category: "Electronics",
    condition: "Like New",
    location: "ITM Campus",
    posted: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 2,
    name: "Java Programming Books",
    price: 799,
    category: "Books",
    condition: "New",
    location: "Hostel Block A",
    posted: "8 hours ago",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 3,
    name: "iPhone 14 Pro",
    price: 37999,
    category: "Electronics",
    condition: "Used",
    location: "Main Campus",
    posted: "5 hours ago",
    image:
  "https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D",
  },

  {
    id: 4,
    name: "Mountain Bicycle",
    price: 3500,
    category: "Vehicles",
    condition: "Used",
    location: "Girls Hostel",
    posted: "6 hours ago",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 5,
    name: "Study Table",
    price: 1500,
    category: "Furniture",
    condition: "Like New",
    location: "Boys Hostel",
    posted: "8 hours ago",
    image:
    "https://images.unsplash.com/photo-1705417272217-490f4511abeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZHklMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D",
  },

  {
    id: 6,
    name: "Sony Headphones",
    price: 4999,
    category: "Accessories",
    condition: "New",
    location: "Main Campus",
    posted: "9 hours ago",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 7,
    name: "PS5 Console",
    price: 32000,
    category: "Gaming",
    condition: "Used",
    location: "ITM Campus",
    posted: "12 hours ago",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
  },

  // {
  //   id: 8,
  //   name: "Hoodie (L)",
  //   price: 899,
  //   category: "Clothing",
  //   condition: "New",
  //   location: "Hostel Block B",
  //   posted: "1 day ago",
  //   image:
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  // },

  {
    id: 9,
    name: "Gaming Laptop",
    price: 64999,
    category: "Electronics",
    condition: "Like New",
    location: "ITM Campus",
    posted: "1 day ago",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 10,
    name: "Data Structures Book",
    price: 499,
    category: "Books",
    condition: "Used",
    location: "Main Campus",
    posted: "1 day ago",
    image:
      "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D",
  },

  {
    id: 11,
    name: "Office Chair",
    price: 2200,
    category: "Furniture",
    condition: "Used",
    location: "Boys Hostel",
    posted: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 12,
    name: "College Backpack",
    price: 699,
    category: "Accessories",
    condition: "Like New",
    location: "Girls Hostel",
    posted: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
];


// ================================
// MAIN COMPONENT
// ================================

function BrowseProducts() {

  const navigate = useNavigate();
  const location = useLocation();

  // Search
  const [browseSearchText, setBrowseSearchText] = useState("");

  // Category
  const [selectedBrowseCategory, setSelectedBrowseCategory] =
    useState("All");

  // Agar Dashboard se category select karke aaye hain, to wahi apply kar do
  useEffect(() => {

    if (location.state?.category) {

      setSelectedBrowseCategory(location.state.category);

    }

  }, [location.state]);

  // Condition
  const [selectedBrowseConditions, setSelectedBrowseConditions] =
    useState([]);

  // Price
  const [browseMaximumPrice, setBrowseMaximumPrice] =
    useState(100000);

  // Location
  const [selectedBrowseLocation, setSelectedBrowseLocation] =
    useState("All Locations");

  // Sort
  const [browseSortOption, setBrowseSortOption] =
    useState("Newest First");

  // View
  const [browseViewMode, setBrowseViewMode] =
    useState("grid");

  // Wishlist
  const [browseWishlistItems, setBrowseWishlistItems] =
    useState([]);

  // Hidden ("Not interested") products
  const [browseHiddenProductIds, setBrowseHiddenProductIds] =
    useState([]);

  
  // ================================
  // CONDITION FILTER
  // ================================

  const handleBrowseConditionChange = (condition) => {

    setSelectedBrowseConditions((previousConditions) => {

      if (previousConditions.includes(condition)) {

        return previousConditions.filter(
          (item) => item !== condition
        );

      }

      return [...previousConditions, condition];

    });
  };


  // ================================
  // WISHLIST
  // ================================

  const handleBrowseWishlistToggle = (productId) => {

    setBrowseWishlistItems((previousItems) => {

      if (previousItems.includes(productId)) {

        return previousItems.filter(
          (id) => id !== productId
        );

      }

      return [...previousItems, productId];

    });
  };


  // ================================
  // BUY NOW
  // ================================

  const handleBrowseBuyNow = (productId) => {

    // Sends the user to a dedicated buy/checkout page for this product.
    // Make sure a matching route exists, e.g.:
    //   <Route path="/buy/:productId" element={<BuyProduct />} />
    navigate(`/buy/${productId}`);

  };


  // ================================
  // HIDE ("NOT INTERESTED")
  // ================================

  const handleBrowseHideProduct = (productId) => {

    setBrowseHiddenProductIds((previousIds) => [
      ...previousIds,
      productId,
    ]);

  };


  // ================================
  // CLEAR FILTERS
  // ================================

  const clearBrowseFilters = () => {

    setSelectedBrowseCategory("All");
    setSelectedBrowseConditions([]);
    setBrowseMaximumPrice(100000);
    setSelectedBrowseLocation("All Locations");
    setBrowseSearchText("");

  };


  // ================================
  // FILTER + SEARCH + SORT
  // ================================

  const filteredBrowseProducts = useMemo(() => {

    let products = [...browseProductData];


    // Remove products the user marked "Not interested"
    products = products.filter(
      (product) =>
        !browseHiddenProductIds.includes(product.id)
    );


    // Search
    if (browseSearchText.trim()) {

      const searchValue =
        browseSearchText.toLowerCase().trim();

      products = products.filter((product) =>

        product.name.toLowerCase().includes(searchValue) ||

        product.category
          .toLowerCase()
          .includes(searchValue) ||

        product.location
          .toLowerCase()
          .includes(searchValue)

      );

    }


    // Category
    if (selectedBrowseCategory !== "All") {

      products = products.filter(
        (product) =>
          product.category === selectedBrowseCategory
      );

    }


    // Condition
    if (selectedBrowseConditions.length > 0) {

      products = products.filter((product) =>
        selectedBrowseConditions.includes(
          product.condition
        )
      );

    }


    // Price
    products = products.filter(
      (product) =>
        product.price <= browseMaximumPrice
    );


    // Location
    if (selectedBrowseLocation !== "All Locations") {

      products = products.filter(
        (product) =>
          product.location === selectedBrowseLocation
      );

    }


    // Sort
    if (browseSortOption === "Price: Low to High") {

      products.sort(
        (a, b) => a.price - b.price
      );

    }

    if (browseSortOption === "Price: High to Low") {

      products.sort(
        (a, b) => b.price - a.price
      );

    }

    if (browseSortOption === "Name: A-Z") {

      products.sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );

    }

    return products;

  }, [
    browseHiddenProductIds,
    browseSearchText,
    selectedBrowseCategory,
    selectedBrowseConditions,
    browseMaximumPrice,
    selectedBrowseLocation,
    browseSortOption,
  ]);


  // ================================
  // PAGINATION
  // ================================

  const browseProductsPerPage = 12;

  const [browseCurrentPage, setBrowseCurrentPage] =
    useState(1);

  const browseTotalPages = Math.max(
    1,
    Math.ceil(
      filteredBrowseProducts.length /
        browseProductsPerPage
    )
  );

  const paginatedBrowseProducts = useMemo(() => {

    const startIndex =
      (browseCurrentPage - 1) * browseProductsPerPage;

    return filteredBrowseProducts.slice(
      startIndex,
      startIndex + browseProductsPerPage
    );

  }, [filteredBrowseProducts, browseCurrentPage]);


  // Whenever search/filters/sort change, jump back to page 1
  useEffect(() => {

    setBrowseCurrentPage(1);

  }, [
    browseSearchText,
    selectedBrowseCategory,
    selectedBrowseConditions,
    browseMaximumPrice,
    selectedBrowseLocation,
    browseSortOption,
  ]);


  const handleBrowsePageChange = (pageNumber) => {

    setBrowseCurrentPage(pageNumber);

    // Scroll back to top of results when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });

  };


  return (
    <>
    <Navbar/>
    <Sidebar/>

    <main className="browse-products-page">

      {/* =================================
          BROWSE PRODUCTS BODY
      ================================= */}

      <section className="browse-products-content">


        {/* =================================
            HERO SECTION
        ================================= */}

        <div className="browse-products-hero">

          <div className="browse-products-hero-content">

            <span className="browse-products-hero-label">
              BROWSE PRODUCTS
            </span>

            <h1>
              Find What You <span>Need</span>
            </h1>

            <p>
              Discover great deals from your
              campus community.
            </p>

          </div>


          <div className="browse-products-hero-visual">

            <div className="browse-products-hero-circle"></div>

            <div className="browse-products-hero-laptop">
              💻
            </div>

            <div className="browse-products-hero-bag">
              🎒
            </div>

          </div>

        </div>


        {/* =================================
            SEARCH + SORT
        ================================= */}

        <div className="browse-products-search-row">

          <div className="browse-products-search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search products..."
              value={browseSearchText}
              onChange={(e) =>
                setBrowseSearchText(e.target.value)
              }
            />

            {browseSearchText && (

              <button
                className="browse-products-search-clear"
                onClick={() => setBrowseSearchText("")}
              >
                <FaTimes />
              </button>

            )}

            <button className="browse-products-search-button">
              Search
            </button>

          </div>


          <div className="browse-products-sort-area">

            <label>
              Sort by:
            </label>

            <div className="browse-products-sort-select">

              <select
                value={browseSortOption}
                onChange={(e) =>
                  setBrowseSortOption(e.target.value)
                }
              >

                <option>
                  Newest First
                </option>

                <option>
                  Price: Low to High
                </option>

                <option>
                  Price: High to Low
                </option>

                <option>
                  Name: A-Z
                </option>

              </select>

              <FaChevronDown />

            </div>


            <button
              className={`browse-products-view-button ${
                browseViewMode === "grid"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setBrowseViewMode("grid")
              }
            >
              <FaThLarge />
            </button>


            <button
              className={`browse-products-view-button ${
                browseViewMode === "list"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setBrowseViewMode("list")
              }
            >
              <FaList />
            </button>

          </div>

        </div>


        {/* =================================
            CATEGORY NAVIGATION
        ================================= */}

        <div className="browse-products-category-list">

          {browseProductCategories.map((category) => (

            <button
              key={category.name}
              className={`browse-products-category-button ${
                selectedBrowseCategory === category.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedBrowseCategory(category.name)
              }
            >

              <span className="browse-products-category-icon">
                {category.icon}
              </span>

              <span>
                {category.name}
              </span>

            </button>

          ))}

        </div>


        {/* =================================
            MAIN PRODUCT AREA
        ================================= */}

        <div className="browse-products-main-layout">


          {/* =================================
              FILTER PANEL
          ================================= */}

          <aside className="browse-products-filter-panel">

            <div className="browse-products-filter-heading">

              <h2>
                Filters
              </h2>

              <button
                onClick={clearBrowseFilters}
              >
                Clear All
              </button>

            </div>


            {/* Category */}

            <div className="browse-products-filter-section">

              <h3>
                Category
              </h3>

              <div className="browse-products-select-wrapper">

                <select
                  value={selectedBrowseCategory}
                  onChange={(e) =>
                    setSelectedBrowseCategory(e.target.value)
                  }
                >

                  {browseProductCategories.map(
                    (category) => (

                      <option
                        key={category.name}
                        value={category.name}
                      >
                        {category.name === "All"
                          ? "All Categories"
                          : category.name}
                      </option>

                    )
                  )}

                </select>

                <FaChevronDown />

              </div>

            </div>


            {/* Condition */}

            <div className="browse-products-filter-section">

              <h3>
                Condition
              </h3>

              {["New", "Like New", "Used"].map(
                (condition) => (

                  <label
                    key={condition}
                    className="browse-products-checkbox-row"
                  >

                    <input
                      type="checkbox"
                      checked={selectedBrowseConditions.includes(
                        condition
                      )}
                      onChange={() =>
                        handleBrowseConditionChange(
                          condition
                        )
                      }
                    />

                    <span>
                      {condition}
                    </span>

                  </label>

                )
              )}

            </div>


            {/* Price */}

            <div className="browse-products-filter-section">

              <h3>
                Price Range
              </h3>

              <div className="browse-products-price-label">
                ₹0 – ₹
                {browseMaximumPrice.toLocaleString("en-IN")}
              </div>

   <input
  className="browse-products-price-slider"
  type="range"
  min="0"
  max="100000"
  step="5"
  value={browseMaximumPrice}
  onChange={(e) =>
    setBrowseMaximumPrice(
      Number(e.target.value)
    )
  }
  style={{
    background: `linear-gradient(to right, #6637ed 0%, #6637ed ${
      (browseMaximumPrice / 100000) * 100
    }%, #e2e3eb ${
      (browseMaximumPrice / 100000) * 100
    }%, #e2e3eb 100%)`,
  }}
/>
              <div className="browse-products-price-values">

                <span>₹0</span>

                <span>₹1,00,000</span>

              </div>

            </div>


            {/* Location */}

            <div className="browse-products-filter-section">

              <h3>
                Location
              </h3>

              <div className="browse-products-select-wrapper">

                <select
                  value={selectedBrowseLocation}
                  onChange={(e) =>
                    setSelectedBrowseLocation(
                      e.target.value
                    )
                  }
                >

                  <option>
                    All Locations
                  </option>

                  <option>
                    ITM Campus
                  </option>

                  <option>
                    Main Campus
                  </option>

                  <option>
                    Boys Hostel
                  </option>

                  <option>
                    Girls Hostel
                  </option>

                  <option>
                    Hostel Block A
                  </option>

                  <option>
                    Hostel Block B
                  </option>

                </select>

                <FaChevronDown />

              </div>

            </div>


            {/* Sort */}

            <div className="browse-products-filter-section">

              <h3>
                Sort By
              </h3>

              <div className="browse-products-select-wrapper">

                <select
                  value={browseSortOption}
                  onChange={(e) =>
                    setBrowseSortOption(e.target.value)
                  }
                >

                  <option>
                    Newest First
                  </option>

                  <option>
                    Price: Low to High
                  </option>

                  <option>
                    Price: High to Low
                  </option>

                  <option>
                    Name: A-Z
                  </option>

                </select>

                <FaChevronDown />

              </div>

            </div>

          </aside>


          {/* =================================
              PRODUCTS
          ================================= */}

          <section className="browse-products-results">

            <div className="browse-products-results-header">

              <p>
                Showing{" "}
                <strong>
                  {filteredBrowseProducts.length}
                </strong>{" "}
                products
              </p>

              <button className="browse-products-mobile-filter">
                <FaSlidersH />
                Filters
              </button>

            </div>


            {filteredBrowseProducts.length > 0 ? (

              <>

              <div
                className={`browse-products-grid ${
                  browseViewMode === "list"
                    ? "list-view"
                    : ""
                }`}
              >

                {paginatedBrowseProducts.map(
                  (product) => (

                    <BrowseProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={browseWishlistItems.includes(
                        product.id
                      )}
                      onWishlistToggle={
                        handleBrowseWishlistToggle
                      }
                      onBuyNow={handleBrowseBuyNow}
                      onHide={handleBrowseHideProduct}
                      viewMode={browseViewMode}
                    />

                  )
                )}

              </div>


              {/* =================================
                  PAGINATION
              ================================= */}

              {browseTotalPages > 1 && (

                <div className="browse-products-pagination">

                  <button
                    className="browse-pagination-arrow"
                    onClick={() =>
                      handleBrowsePageChange(
                        Math.max(1, browseCurrentPage - 1)
                      )
                    }
                    disabled={browseCurrentPage === 1}
                    aria-label="Previous page"
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from(
                    { length: browseTotalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (

                    <button
                      key={pageNumber}
                      className={`browse-pagination-number ${
                        browseCurrentPage === pageNumber
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handleBrowsePageChange(pageNumber)
                      }
                    >
                      {pageNumber}
                    </button>

                  ))}

                  <button
                    className="browse-pagination-arrow"
                    onClick={() =>
                      handleBrowsePageChange(
                        Math.min(
                          browseTotalPages,
                          browseCurrentPage + 1
                        )
                      )
                    }
                    disabled={
                      browseCurrentPage === browseTotalPages
                    }
                    aria-label="Next page"
                  >
                    <FaChevronRight />
                  </button>

                </div>

              )}

              </>

            ) : (

              <div className="browse-products-empty-state">

                <div>
                  <FaSearch />
                </div>

                <h3>
                  No products found
                </h3>

                <p>
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearBrowseFilters}
                >
                  Clear Filters
                </button>

              </div>

            )}

          </section>

        </div>

      </section>

    </main>
</>
  );
  
}

export default BrowseProducts;
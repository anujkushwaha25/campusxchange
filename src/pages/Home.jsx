// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Whycampus from "../components/Whycampus";
// import Categories from "../components/Categories";
// import FeaturedProduct from "../components/FeaturedProduct";
// import HowItWork from "../components/HowItWork";
// import Testimonial from "../components/Testimonial";
// import Stats from "../components/Stats"
// import Faq from "../components/Faq";
// import Cta  from "../components/Cta";
// import Footer from "../components/Footer"


// function Home (){
//     return (
//         <>
//       <Navbar />
//       <Hero/>
//       <Whycampus />
//       <Categories/>
//       <FeaturedProduct />
//       <HowItWork/>
//       <Testimonial/>
//       <Stats/>
//       <Faq/>
//       <Cta/>
//       <Footer/>
//     </>
//     );
// }

// export default Home;

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Whycampus from "../components/Whycampus";
import Categories from "../components/Categories";
import FeaturedProduct from "../components/FeaturedProduct";
import HowItWork from "../components/HowItWork";
import Testimonial from "../components/Testimonial";
import Stats from "../components/Stats"
import Faq from "../components/Faq";
import Cta  from "../components/Cta";
import Footer from "../components/Footer"
import LoginRequired from "../components/LoginRequired";


function Home (){
    const [showAuthModal, setShowAuthModal] = useState(false);
    const isLoggedIn = !!localStorage.getItem("token"); // apna actual auth-check yahan lagana agar alag hai

    // Categories/FeaturedProduct isko call karke poochenge "click allowed hai ya nahi"
    const handleProtectedClick = () => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
            return false; // navigation/action rok do
        }
        return true; // logged in hai, normal behavior chalne do
    };

    return (
        <>
      <Navbar onProtectedClick={handleProtectedClick} />
      <Hero/>
      <Whycampus />
      <Categories />
      <FeaturedProduct onProtectedClick={handleProtectedClick} />
      <HowItWork/>
      <Testimonial/>
      <Stats/>
      <Faq/>
      <Cta onProtectedClick={handleProtectedClick}/>
      <Footer onProtectedClick={handleProtectedClick}/>

      <LoginRequired
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
    );
}

export default Home;
 "use client"
import { ParallaxProvider } from "react-scroll-parallax";
import Banner from "./components/Banner/Banner";
import FeaturedProducts from "./components/FeauturedProducts/FeaturedProducts";
import KidsOutfit from "./components/KidsOutfit/KidsOutfit";
import Navbar from "./components/Navbar/Navbar";

import NewArrival from "./components/Products/NewArrival";
import SellBanner from "./components/SellBanner/SellBanner";
import FooterComponent from "./components/Footer/Footer";
import Support from "./components/Support/Support";
export default function Home() {
  return (
    <div className="">
     <Navbar/>
     <div>
      <Banner/>
     </div>
     <div>
      <NewArrival />
     </div>
     <div>
      <KidsOutfit />
     </div>
     <div>
     <ParallaxProvider>
      <div className="overflow-x-hidden">
      <SellBanner />
      </div>
    </ParallaxProvider>
      
     </div>
     <div>
      <FeaturedProducts />
     </div>
     <div>
      <Support />
     </div>
     <div>
      <FooterComponent />
     </div>
    
   

    
    
    </div>
  );
}


// "use client";
// import { useState, useEffect } from "react";
// import { ParallaxProvider } from "react-scroll-parallax";
// import Banner from "./components/Banner/Banner";
// import FeaturedProducts from "./components/FeauturedProducts/FeaturedProducts";
// import KidsOutfit from "./components/KidsOutfit/KidsOutfit";
// import Navbar from "./components/Navbar/Navbar";
// import NewArrival from "./components/Products/NewArrival";
// import SellBanner from "./components/SellBanner/SellBanner";
// import FooterComponent from "./components/Footer/Footer";
// import Support from "./components/Support/Support";

// // Loader Component
// const Loader = () => (
//   <div className="flex items-center justify-center min-h-screen">
//     <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
//   </div>
// );

// export default function Home() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulating loading time (e.g., fetching data)
//     setTimeout(() => {
//       setLoading(false);
//     }, 800); // Adjust the delay time as needed
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Navbar />
//           <div>
//             <Banner />
//           </div>
//           <div>
//             <NewArrival />
//           </div>
//           <div>
//             <KidsOutfit />
//           </div>
//           <div>
//             <ParallaxProvider>
//               <div className="overflow-x-hidden">
//                 <SellBanner />
//               </div>
//             </ParallaxProvider>
//           </div>
//           <div>
//             <FeaturedProducts />
//           </div>
//           <div>
//             <Support />
//           </div>
//           <div>
//             <FooterComponent />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

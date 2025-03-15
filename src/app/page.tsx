 "use client"
import { ParallaxProvider } from "react-scroll-parallax";
import Banner from "./components/Banner/Banner";
import FeaturedProducts from "./components/FeauturedProducts/FeaturedProducts";
import KidsOutfit from "./components/KidsOutfit/KidsOutfit";
import Navbar from "./components/Navbar/Navbar";

import NewArrival from "./components/Products/NewArrival";
import SellBanner from "./components/SellBanner/SellBanner";
import FooterComponent from "./components/Footer/Footer";
// import Support from "./components/Support/Support";
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
     {/* <div>
      <Support />
     </div> */}
     <div>
      <FooterComponent />
     </div>
    
   

    
    
    </div>
  );
}

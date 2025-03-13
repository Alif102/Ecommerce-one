import Banner from "./components/Banner/Banner";
import FeaturedProducts from "./components/FeauturedProducts/FeaturedProducts";
import KidsOutfit from "./components/KidsOutfit/KidsOutfit";
import Navbar from "./components/Navbar/Navbar";

import NewArrival from "./components/Products/NewArrival";
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
      <FeaturedProducts />
     </div>
    
   

    
    
    </div>
  );
}

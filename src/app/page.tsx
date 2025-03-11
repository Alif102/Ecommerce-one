import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import banner from '../../public/assets/bnr.jpg'
export default function Home() {
  return (
    <div className="">
     <Navbar/>
     <div className=" mt-16">
     <Image 
      src={banner} 
      alt="Description" 
      // width={500} 
      // height={300} 
    />
     </div>
    
    </div>
  );
}

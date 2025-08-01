import Image from "next/image";
import pa1 from '../../../public/assets/pa3.jpg'
import Link from "next/link";
export default function OrderSuccess() {
    return (
        <div className=" mt-16 w-[80%] mx-auto">
          
          <div className=" flex justify-center items-center flex-col">
          <Image
                    src={pa1}
                    alt='tic' className=" border border-yellow-500 p-3 w-32 rounded-full  bg-yellow-200  "
                  
                />
                <h1 className="text-5xl font-bold text-yellow-500">Thank you.</h1>
                <p className="text-2xl text-center font-semibold text-yellow-500">Your order was completed successfully.</p>
                <p className="text-lg text-center text-gray-600">We appreciate your purchase. A confirmation email has been sent to you.</p>
                <Link href='/' className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-yellow-500 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-yellow-500 group-hover:h-full"></span>
    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Back Home</span>
</Link>
                
          </div>
               
            </div>
      
    );
}

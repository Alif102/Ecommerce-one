import { TruckOutlined, RedoOutlined, CreditCardOutlined, MessageOutlined } from "@ant-design/icons";

const features = [
  {
    icon: <TruckOutlined className="text-4xl text-red-400" />, 
    title: "Free Delivery", 
    description: "For all orders over $100"
  },
  {
    icon: <RedoOutlined className="text-4xl text-red-400" />, 
    title: "3 Days Return", 
    description: "If goods have problems"
  },
  {
    icon: <CreditCardOutlined className="text-4xl text-red-400" />, 
    title: "Secure Payment", 
    description: "100% secure payment"
  },
  {
    icon: <MessageOutlined className="text-4xl text-red-400" />, 
    title: "24/7 Support", 
    description: "Dedicated support"
  }
];

export default function Support() {
  return (
    <div className=" grid lg:grid-cols-4 grid-cols-2 justify-center w-[80%] mx-auto  gap-6 py-8 px-4 my-5 rounded-md bg-white-50 md:justify-between">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col md:flex-row  gap-3 md:justify-evenly  md:items-center border border-white-100  bg-white p-6 rounded-lg shadow-md ">
          <span className="hover:animate-pulse">{feature.icon}</span>
          <div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

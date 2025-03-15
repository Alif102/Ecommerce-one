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
    <div className="flex flex-wrap justify-center w-[80%] mx-auto border border-white-50 gap-2 py-8 px-4 my-5 rounded-md bg-white-50 md:justify-between">
      {features.map((feature, index) => (
        <div key={index} className="flex  items-center border border-white-100 p-6 rounded-lg shadow-md space-x-3 md:space-x-5">
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

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
    <div className="w-full mx-auto md:w-[80%] bg-white py-8 px-4 my-5 rounded-md">
      {/* Slider for Small Devices */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-hidden scroll-smooth no-scrollbar">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col lg:flex-row gap-3 md:justify-evenly md:items-center border border-white-100 bg-white p-6 rounded-lg shadow-md min-w-[200px] md:min-w-0"
          >
            <span className="hover:animate-pulse">{feature.icon}</span>
            <div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

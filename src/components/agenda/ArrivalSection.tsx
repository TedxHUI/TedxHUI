
const ArrivalSection = () => {
  const items = [
    { time: "8:00 AM - 9:00 AM", title: "Arrival & Registration of Guests", desc: "" },
    { time: "9:00 AM - 9:10 AM", title: "Welcome Address & Official TEDx Intro Video", desc: "Host" },
    { time: "9:10 AM - 9:20 AM", title: "University Welcome Address", desc: "Vice Chancellor or University Representative" },
  ];

  return (
    <div className="mb-10">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row border-b border-gray-200 py-6 md:py-8 gap-4 md:gap-24 items-start md:items-center px-4">
          <span className="text-[#EA1D2C] font-bold font-glancyr text-lg md:text-2xl min-w-[180px]">
            {item.time}
          </span>
          <div className="flex-1">
            <h4 className="text-xl md:text-2xl font-semibold text-[#040001]">{item.title}</h4>
            {item.desc && <p className="text-gray-500 mt-1 md:text-lg italic">{item.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArrivalSection;
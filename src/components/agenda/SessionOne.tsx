
const SessionOne = () => {
  const items = [
    { time: "9:20 AM - 9:32 AM", title: "Sarkin Mota", desc: "Driving Trust: The Vehicular Trailblazer" },
    { time: "9:32 AM - 9:44 AM", title: "Ahmad XM", desc: "Web3: Killing Youth Unemployment" },
    { time: "9:44 AM - 9:56 AM", title: "Victory Ashaka", desc: "Poetry: A Tool for Change" },
    { time: "9:56 AM - 10:08 AM", title: "Adesina", desc: "What Are Your Real Assets?" },
  ];

  return (
    <div className="mb-16 relative">
      {/* Speaker Session Badge - Floating on the right */}
      <div className="absolute -right-2 md:-right-8 -top-10 z-20 w-24 md:w-32 pointer-events-none">
        <img src="/images/speaker-badge-1.png" alt="Speaker Session I" className="w-full h-full" />
      </div>

      <div className="bg-[#1a0304] text-white py-4 px-8 rounded-sm mb-2">
        <h3 className="text-xl font-medium font-glancyr tracking-wide">Speakers Session I</h3>
      </div>

      <div className="space-y-0">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row border-b border-gray-200 py-8 gap-4 md:gap-24 items-start md:items-center px-4">
            <span className="text-[#EA1D2C] font-bold font-glancyr text-lg md:text-2xl min-w-[180px]">
              {item.time}
            </span>
            <div className="flex-1">
              <h4 className="text-xl md:text-2xl font-semibold text-[#040001]">{item.title}</h4>
              <p className="text-gray-500 mt-1 md:text-lg">{item.desc}</p>
            </div>
          </div>
        ))}
        {/* Highlighted Break Row */}
        <div className="flex flex-col md:flex-row bg-[#FEF2F2] py-8 gap-4 md:gap-24 items-start md:items-center px-4 border-b border-gray-200">
           <span className="text-[#EA1D2C] font-bold font-glancyr text-lg md:text-2xl min-w-[180px]">10:08 AM - 10:28 AM</span>
           <h4 className="text-xl md:text-2xl font-semibold text-[#040001]">Networking Break</h4>
        </div>
      </div>
    </div>
  );
};

export default SessionOne;
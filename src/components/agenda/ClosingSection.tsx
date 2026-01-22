import { motion } from "framer-motion";

const ClosingSection = () => {
  const items = [
    { time: "8:00 AM - 9:00 AM", title: "Lunch Break", desc: "" },
    { time: "9:00 AM - 9:10 AM", title: "Certificate Presentation", desc: "" },
    { time: "9:10 AM - 9:20 AM", title: "Closing Remarks & Vote of Thanks", desc: "By Curator" },
    { time: "9:10 AM - 9:20 AM", title: "Group Photographs", desc: "" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
      className="mb-[5rem] relative px-4 md:px-0" 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="space-y-[-0.8rem] md:space-y-[-1.2rem]">
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.005 }}
            className={`flex flex-col md:flex-row py-6 px-5 lg:p-[3.125rem] rounded-[1.5rem] md:rounded-[1.9rem] border border-dashed border-[#EA1D2C]/20 transition-all ${
                index === 1 ? 'bg-[#FFF5F5]' : 'bg-white'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full">
              {/* TIME COLUMN*/}
              <div className="text-[#EA1D2C] font-normal font-glancyr text-lg md:text-[1.8rem] lg:text-[2rem] min-w-fit md:min-w-[180px] lg:min-w-[220px] md:border-r border-dashed border-[#EA1D2C]/30 md:pr-8 lg:pr-[5rem] flex items-center mb-2 md:mb-0">
                <span className="whitespace-pre-line leading-tight">
                  {/* regex to find any dash, keeps the first time, adds a hyphen, then a newline */}
                  {item.time.split(/[-–—]/)[0].trim()}
                  {"\n- " + item.time.split(/[-–—]/)[1].trim()} 
                </span>
              </div>

              {/* TEXT CONTENT COLUMN */}
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  <h4 className="text-lg md:text-[1.6rem] lg:text-[1.8rem] font-normal text-[#000000] leading-tight">
                    {item.title}
                  </h4>

                    <motion.span 
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: -12 }} 
                        className="inline-flex justify-center items-center bg-[#FFF5F5] text-[#EA1D2C] rounded-full text-[0.75rem] md:text-[0.9rem] shadow-md border border-[#EA1D2C]/10 font-normal px-3 py-0.5 md:px-4 md:py-1 h-fit"
                    >
                        {item.desc}
                    </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ClosingSection;
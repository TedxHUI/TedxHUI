import { motion, Variants } from "framer-motion";
import tedxCrystal from "../../assets/Component 35.png";

const ClosingSection = () => {
  const items = [
    { time: "10:28 AM - 11:40 AM", title: "Lunch Break", desc: "" },
    { time: "10:40 AM - 10:52 AM", title: "Certificate Presentation", desc: "" },
    { time: "10:52 AM - 11:04 AM", title: "Closing Remarks & Vote of Thanks", desc: "By Curator" },
    { time: "11:04 AM - 11:16 AM", title: "Group Photographs", desc: "" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div 
      className="relative px-4 md:px-0" 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/*CRYSTAL*/}
      <div className="absolute -right-12 md:-right-16 bottom-0 w-32 md:w-48 z-20 pointer-events-none">
        <motion.img 
          src={tedxCrystal} 
          alt="Decorative Crystal"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
          className="w-full h-full object-contain drop-shadow-2xl" 
        />
      </div>

      <div className="space-y-[-0.8rem] md:space-y-[-1.2rem]">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1; 

          return (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01, zIndex: 10 }}
              className={`flex flex-col md:flex-row py-6 px-5 lg:p-[3.125rem] rounded-[1.5rem] md:rounded-[1.9rem] border border-dashed border-[#EA1D2C]/20 transition-all relative ${
                isLastItem ? 'bg-[#FFF5F5]' : 'bg-white'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full">
                
                {/* TIME COLUMN */}
                <div className="text-[#EA1D2C] font-normal font-glancyr text-lg md:text-[1.8rem] lg:text-[2rem] min-w-fit md:min-w-[180px] lg:min-w-[220px] md:border-r border-dashed border-[#EA1D2C]/30 md:pr-8 lg:pr-[5rem] flex items-center">
                  <span className="whitespace-pre-line leading-tight">
                    {item.time.split(/[-–—]/)[0].trim()}
                    {"\n- " + item.time.split(/[-–—]/)[1].trim()} 
                  </span>
                </div>

                {/* TEXT CONTENT COLUMN */}
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <h4 className="text-lg md:text-[2rem] font-normal text-[#000000] leading-tight">
                      {item.title}
                    </h4>
                    {item.desc && (
                      <motion.span 
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: -8 }} 
                        className="inline-flex justify-center items-center bg-[#FFF5F5] text-[#EA1D2C] rounded-full text-[0.75rem] md:text-[0.9rem] shadow-sm border border-[#EA1D2C]/10 px-3 py-1"
                      >
                        {item.desc}
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ClosingSection;
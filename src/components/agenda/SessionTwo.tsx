import { motion, Variants } from "framer-motion";
import tedxCrystal from "../../assets/Component 35.png";

const SessionTwo = () => {
  const items = [
    { time: "10:28 AM - 11:40 AM", title: "Adesina", desc: "What Are Your Real Assets?" },
    { time: "10:40 AM - 10:52 AM", title: "Adesina", desc: "What Are Your Real Assets?" },
    { time: "10:52 AM - 11:04 AM", title: "Adesina", desc: "What Are Your Real Assets?" },
    { time: "11:04 AM - 11:16 AM", title: "Adesina", desc: "What Are Your Real Assets?" },
    { time: "11:16 AM - 11:36 AM", title: "Performer Session", desc: "" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <motion.div 
      className="mb-[5rem] relative px-4 md:px-0" 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* 1. CRYSTAL POSITIONED TO THE LEFT */}
      <div className="absolute -left-12 md:-left-20 top-1/2 -translate-y-1/2 w-32 md:w-48 z-20 pointer-events-none">
        <motion.img 
          src={tedxCrystal} 
          alt="Decorative Crystal"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
          className="w-full h-full object-contain drop-shadow-2xl" 
        />
      </div>

      {/* Speaker Badge 2 */}
      <div className="absolute -right-2 md:-right-8 -top-10 z-20 w-24 md:w-40 pointer-events-none">
        <motion.img 
          src="/images/Speakers/speaker-badge-2.svg" 
          alt="Speaker Session II" 
          className="w-full h-full drop-shadow-xl"
          whileHover={{ rotate: 5 }} 
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
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full relative">
                
                {/* TIME COLUMN */}
                <div className="text-[#EA1D2C] font-normal font-glancyr text-lg md:text-[1.8rem] lg:text-[2rem] min-w-fit md:min-w-[180px] lg:min-w-[220px] md:border-r border-dashed border-[#EA1D2C]/30 md:pr-8 lg:pr-[5rem] flex items-center">
                  <span className="whitespace-pre-line leading-tight">
                    {item.time.split(/[-–—]/)[0].trim()}
                    {"\n- " + item.time.split(/[-–—]/)[1].trim()}
                  </span>
                </div>

                {/* TEXT CONTENT COLUMN */}
                <div className="flex-1 w-full">
                  <h4 className="text-lg md:text-[2rem] font-normal text-[#000000] leading-tight">
                    {item.title}
                  </h4>
                  {item.desc && (
                    <p className="text-[#444444] font-normal mt-1 md:mt-2 text-[1.1rem] opacity-70 leading-relaxed max-w-[25rem]">
                      {item.desc}
                    </p>
                  )}
                </div>

                {/* Performer Illustration (Fixed Visibility) */}
                {isLastItem && (
                  <div className="absolute right-0 bottom-[-10px] hidden lg:block w-32 z-30">
                    <img 
                      src="/images/icons/performing.svg" 
                      alt="Performer Illustration" 
                      className="w-full h-full opacity-100" 
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SessionTwo;
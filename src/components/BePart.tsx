import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Elipse1 from "../assets/Ellipse 1.png";

const BePart = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex items-center bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">
      {/* Animated Decorative Elipse */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 pointer-events-none"
      >
        <img
          src={Elipse1}
          alt="Elipse"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Background Radial Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-[#EA1D2C]/10 to-transparent pointer-events-none" />

      <div className="py-[3rem] md:py-[5rem] w-full relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[36rem] mx-auto text-center space-y-[1.5rem]"
          >
            {/* Heading with a subtle scale-up */}
            <motion.h2
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-[3rem] font-semibold text-white leading-tight font-glancyr"
            >
              Be Part of the First <span className="text-[#EA1D2C]">TEDx</span>
              HUI Experience
            </motion.h2>

            <p className="text-base md:text-[1.3rem] text-[#FFFFFF]/90 leading-relaxed font-normal">
              Seats are limited, reserve yours today and witness history in the
              making.
            </p>

            {/* Pulsing "Heartbeat" Button */}
            <motion.div
              className="inline-block pt-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <button
                onClick={() => navigate("/book-ticket")}
                className="bg-white hover:bg-[#EA1D2C] hover:text-white text-[#EA1D2C] font-bold px-[2rem] py-[1rem] text-[0.9rem] rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(234,29,44,0.5)]"
              >
                Get Your Ticket
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BePart;

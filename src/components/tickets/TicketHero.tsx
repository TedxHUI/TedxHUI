import { motion, Variants } from 'framer-motion';
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export const TicketHero = () => {
  const sentence = "Secure Your Spot at TEDxHUI";
  const words = sentence.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const child: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center bg-gradient-to-br from-[#1a0305] via-[#000000] to-[#1a0305] text-white overflow-hidden py-20 lg:py-0">
        {/* Layered Background Glows */}

        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],

            scale: [1, 1.2, 1],

            x: [0, 20, 0]

          }}

          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}

          className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-[#EA1D2C] rounded-full blur-[120px] pointer-events-none opacity-20"

        />

        <motion.div

          animate={{

            opacity: [0.2, 0.4, 0.2],

            scale: [1, 1.1, 1]

          }}

          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}

          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#EA1D2C_0%,_transparent_60%)] opacity-20 pointer-events-none"

        />

        <div className="container lg:py-[5rem] mx-auto px-4 relative z-10">

          <div className="max-w-[50rem] mx-auto text-center flex flex-col items-center">

           

            {/* Animated Heading */}

            <motion.h2

              className="text-[2.5rem] leading-[1.1] lg:text-[3.75rem] font-bold text-white tracking-tighter font-glancyr flex flex-wrap justify-center gap-x-3 md:gap-x-5"

              variants={container}

              initial="hidden"

              animate="visible"

            >

              {words.map((word, index) => (

                <motion.span

                  variants={child}

                  key={index}

                  className={word === "Secure" ? "text-[#EA1D2C]" : "text-white"}

                >

                  {word}

                </motion.span>

              ))}

            </motion.h2>



            {/* Responsive Subtext */}

            <motion.p

              initial={{ opacity: 0, y: 10 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.8, duration: 0.8 }}

              className="text-white/70 font-light font-glancyr text-lg md:text-[1.25rem] max-w-[32rem] mt-6 mb-10 leading-relaxed"

            >

              Choose your ticket category and be part of an unforgettable experience at Al-Hikmah University.

            </motion.p>



            {/* Interactive Button */}

            <motion.div

              initial={{ opacity: 0, scale: 0.9 }}

              animate={{ opacity: 1, scale: 1 }}

              transition={{ delay: 1.1 }}

            >

              <Button

                onClick={() => {

                  const el = document.getElementById("tickets-grid");

                  el?.scrollIntoView({ behavior: "smooth" });

                }}

                className="group h-16 px-10 rounded-full bg-[#EA1D2C] hover:bg-[#FF2E3D] text-white font-bold text-lg shadow-[0_0_30px_rgba(234,29,44,0.3)] hover:shadow-[0_0_40px_rgba(234,29,44,0.5)] transition-all duration-300"

              >

                Get tickets{" "}

                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />

              </Button>

            </motion.div>



            {/* Small Decorative Element */}

            <motion.div

              initial={{ scaleX: 0 }}

              animate={{ scaleX: 1 }}

              transition={{ delay: 1.5, duration: 1 }}

              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#EA1D2C] to-transparent mt-12"

            />

          </div>

        </div>

      </section>
  );
};
import { motion } from "framer-motion";
import React from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { SPEAKERS_DATA } from "../data/speakers";

const SpeakerDetail = () => {
  const Icon = ({
    icon: IconComponent,
    size = 20,
  }: {
    icon: any;
    size?: number;
  }) => <IconComponent size={size} />;

  const { id } = useParams();
  const speaker = SPEAKERS_DATA.find((s) => s.id === id);

  if (!speaker)
    return (
      <div className="text-white text-center py-20">Speaker Not Found</div>
    );

  return (
    <div className="bg-gradient-to-br from-[#330609] via-black to-[#330609] min-h-screen">
      {/* Header Section */}
      <section className="relative py-12 md:py-20 text-white min-h-[auto] lg:min-h-[70vh] flex items-center">
        <div className="container mx-auto px-6 relative z-10 w-fit">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <Link
              to="/speakers"
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#EA1D2C] text-sm md:text-base transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                {React.createElement(FiArrowLeft as any)}
              </span>
              Back to Speakers
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start lg:items-center">
            {/* Speaker Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] aspect-square rounded-[1.5rem] md:rounded-[1.875rem] overflow-hidden border-2 border-[#EA1D2C]/20 shadow-2xl"
            >
              <img
                src={speaker.img}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-medium font-glancyr leading-tight text-white mb-2">
                  {speaker.name}
                </h1>
                <p className="text-lg sm:text-xl lg:text-[1.3rem] text-gray-300 font-glancyr font-normal max-w-2xl mt-4 mx-auto md:mx-0">
                  {speaker.role}
                </p>
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: [
                    "drop-shadow(0px 0px 8px rgba(234, 29, 44, 0.4))",
                    "drop-shadow(0px 0px 15px rgba(234, 29, 44, 0.7))",
                    "drop-shadow(0px 0px 8px rgba(234, 29, 44, 0.4))",
                  ],
                }}
                transition={{
                  y: { duration: 0.6, delay: 0.4 },
                  opacity: { duration: 0.6, delay: 0.4 },
                  filter: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
                className="bg-white text-[#444444] p-5 sm:p-6 rounded-xl inline-block text-left my-8 relative z-10 w-full sm:w-auto"
              >
                <div className="flex items-center gap-3 mb-3 font-medium">
                  <span className="text-[#EA1D2C] flex items-center">
                    {React.createElement(FiCalendar as any, { size: 18 })}
                  </span>
                  <span className="text-sm sm:text-base">
                    Speaking at TEDxHUI 2026
                  </span>
                </div>

                <div className="flex items-center gap-3 font-medium">
                  <span className="text-[#EA1D2C] flex items-center">
                    {React.createElement(FiMapPin as any, { size: 18 })}
                  </span>
                  <span className="text-sm sm:text-base">
                    Ilorin, Kwara State, Nigeria • Jan 17, 2026
                  </span>
                </div>
              </motion.div>

              {/* Social Icons*/}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center md:justify-start gap-6 items-center"
              >
                <a
                  href={speaker.instagram}
                  className="hover:scale-110 active:scale-95 transition-all"
                >
                  <img
                    src="/images/icons/ig.svg"
                    alt="Instagram"
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </a>
                <a
                  href={speaker.linkedin}
                  className="hover:scale-110 active:scale-95 transition-all"
                >
                  <img
                    src="/images/icons/linkedln.svg"
                    alt="LinkedIn"
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24 bg-white text-[#040001]">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Animated Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-[3rem] font-medium font-glancyr mb-[2rem] text-center w-fu"
          >
            About
            <span className="text-[#EA1D2C]">
              {" "}
              {speaker.name.split(" ")[0]}
            </span>
          </motion.h2>

          {/* Animated Bio Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg lg:text-xl leading-relaxed font-normal text-gray-800"
          >
            <p className="whitespace-pre-line text-left border-l-2 border-[#EA1D2C]/10 pl-6 md:pl-10">
              {speaker.fullBio}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpeakerDetail;

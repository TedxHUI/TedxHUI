import { motion, TargetAndTransition, Variants } from "framer-motion";
import { Button } from "../components/ui/button";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";


import TeamSlider from "../components/About/TeamSlider";

const AboutPage = () => {
  const sentence = "Discover the Story Behind TEDxHUI";
  const words = sentence.split(" ");
  // Variants for the container to stagger the words
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each individual word
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  // Animation for the text paragraphs to fade in one by one
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation for the Moot Court image
  const imageAnimation: TargetAndTransition = {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Staggered fade-up for paragraphs
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Special "Pulse" animation for the final challenge question
  const challengeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "backOut",
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each card
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }, // Smooth pop
    },
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">
        {/* Shimmer/Glow Background Effect */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#EA1D2C_0%,_transparent_50%)] opacity-20 pointer-events-none"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white leading-tight font-glancyr flex flex-wrap justify-center gap-x-4"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span
                  variants={child}
                  key={index}
                  className={word === "Story" ? "text-[#EA1D2C]" : "text-white"}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Subtle underline for the "Story" word */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-1 bg-[#EA1D2C] mx-auto mt-4 rounded-full"
            />
          </div>
        </div>
      </section>

      {/*About TedxHUI Section*/}
      <section className="about-story lg:my-16 mt-[2rem] px-[2.5rem] p-2 lg:px-[5.6rem] ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto text-[#040001] lg:text-[1.2rem]"
        >
          {/* Section Heading */}
          <motion.h4
            variants={textVariants}
            className="text-2xl md:text-[2.2rem] font-medium leading-tight font-glancyr mb-6"
          >
            About TedxHUI
          </motion.h4>

          {/* Staggered Paragraphs */}
          <div className="lg:space-y-2 space-y-2">
            {[
              "Every great university has a defining moment, a spark that sets it apart, a story that echoes beyond its walls. For Al-Hikmah University, that moment is here.",
              "TEDxHUI is the official TEDx event hosted by Al-Hikmah University, Ilorin, Nigeria. It is part of the globally recognized TEDx program, which brings the spirit of TED ideas worth spreading to local communities around the world.",
              "At TEDxHUI, we aim to create a stage where thinkers, innovators, performers, and storytellers can share ideas that challenge perspectives, spark conversations, and inspire positive action.",
              "Rooted in the values of curiosity, creativity, and community impact, TEDxHUI is more than just an event, it is a movement within Al-Hikmah University to highlight voices that matter.",
              "By organizing TEDxHUI, we not only celebrate groundbreaking ideas but also nurture a culture of learning and collaboration that extends beyond the stage.",
            ].map((text, i) => (
              <motion.div
                key={i}
                variants={textVariants}
                className="py-2 leading-relaxed"
              >
                {text}
              </motion.div>
            ))}
          </div>

          {/* Gradient Border Image Container */}
          <motion.img
            src="/images/About/Moot_Court.jpg"
            alt="A Building in Al-Hikmah"
            className="lg:rounded-[24px] rounded-2xl"
            animate={{
              y: [0, -6, 0],
              boxShadow: [
                "0 10px 30px rgba(234, 29, 44, 0.15)",
                "0 18px 40px rgba(234, 29, 44, 0.25)",
                "0 10px 30px rgba(234, 29, 44, 0.15)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/*The Gift Section*/}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:space-y-[1.25rem] space-y-[1rem] lg:pt-[5rem] pt-[3rem]"
        >
          {/* Header with "The Gift" in Red */}
          <motion.h4
            variants={contentVariants}
            className="text-3xl md:text-[2.2rem] font-medium leading-tight font-glancyr"
          >
            Theme: <span className="text-[#EA1D2C]">The Gift</span>
          </motion.h4>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#040001] max-w-[75rem]">
            <motion.div variants={contentVariants}>
              Every one of us carries a gift. Some gifts are loud and visible,
              others are quiet and hidden, waiting for the right moment to be
              unwrapped.
            </motion.div>

            <motion.div variants={contentVariants}>
              At TEDxHUI 2025, our theme “The Gift” is a call to recognize and
              celebrate these treasures. Gifts of knowledge. Gifts of
              creativity. Gifts of resilience. Gifts of perspective. Life itself
              is a gift, and within it, each individual has something unique to
              offer the world. The question is not whether you have a gift, but
              how you choose to share it.
            </motion.div>

            <motion.div variants={contentVariants}>
              Through thought-provoking talks, performances, and ideas worth
              spreading, TEDxHUI will unwrap stories of ordinary people doing
              extraordinary things with the gifts they carry. This theme is more
              than a word. It's a movement.
            </motion.div>
          </div>

          {/* The Styled Rhetorical Questions */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <motion.p
              variants={contentVariants}
              className="text-xl md:text-2xl font-medium italic text-[#040001] mb-4"
            >
              At TEDxHUI, we don't just ask:{" "}
              <span className="text-black">“What is your gift?”</span>
            </motion.p>

            <motion.div
              variants={challengeVariants}
              className="bg-[#EA1D2C]/5 p-6 md:p-10 rounded-3xl border-l-8 border-[#EA1D2C]"
            >
              <h3 className="text-2xl md:text-4xl font-medium text-[#EA1D2C] leading-tight">
                We challenge you: <br className="hidden md:block" />
                <span className="text-3xl md:text-5xl uppercase tracking-tight">
                  “Will you give it?”
                </span>
              </h3>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/*Meet the Brilliant Minds Section*/}
      <TeamSlider />

      {/*About TEDX*/}
      <section className="py-[2rem] md:py-[5rem] bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-[2rem] md:gap-[4rem] mx-auto">
            {/* Left Content - Image with Slide from Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-sm md:max-w-[40rem]"
            >
              <div className="relative group">
                <img
                  src="/images/About/TEDx.jpg"
                  alt="TEDx Audience"
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* Subtle Red Glow behind image to match branding */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#EA1D2C] to-transparent rounded-3xl blur opacity-20 -z-10 group-hover:opacity-40 transition-opacity" />
              </div>
            </motion.div>

            {/* Right Content - Text with Slide from Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-6 max-w-[32.4rem]"
            >
              <h2 className="text-3xl md:text-[2rem] font-medium text-[#040001] leading-tight font-glancyr">
                About <span className="text-[#EA1D2C]">TEDx</span>
              </h2>

              <p className="text-base md:text-[1rem] text-gray-700 font-normal leading-relaxed">
                <span className="text-[#EA1D2C] font-glancyr font-bold">
                  TEDx
                </span>{" "}
                is a program of local, self-organized events that bring people
                together to share a TED-like experience. In a{" "}
                <span className="text-[#EA1D2C] font-glancyr font-bold">
                  TEDx
                </span>{" "}
                event, live speakers and recorded TED Talks combine to spark
                deep discussions and connections within a community. The “x” in{" "}
                <span className="text-[#EA1D2C] font-glancyr font-bold">
                  TEDx
                </span>{" "}
                stands for independently organized. While TED provides general
                guidance for the program, each TEDx event is planned and
                coordinated independently by a local team that is passionate
                about ideas worth spreading in their own environment.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-[#EA1D2C] hover:bg-[#FF2E3D] text-white font-medium px-8 py-6 rounded-3xl text-[1rem] shadow-lg shadow-[#EA1D2C]/20 transition-all"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

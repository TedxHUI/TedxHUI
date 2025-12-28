import React from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  User, 
  MapPin, 
  Award, 
  Target, 
  Heart, 
  Lightbulb,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Elipse1 from "../assets/Ellipse 1.png";
import TedwhiteSpeaker from "../assets/2d0ce2fb734db790a93563a83d7299d6126715ac.jpg";
import Building from "../assets/978a49b1f977f1e722458c378b42e7bfa6e13b75.jpg";
import Unknown from "../assets/unknown.jpg";

const TEAM_MEMBERS = [
    { id: 1, name: "Ibrahim Abdulrauf", role: "TEDxHUI Organizer", image: Unknown },
    { id: 2, name: "Ibrahim Abdulrauf", role: "TEDxHUI Organizer", image: Unknown },
    { id: 3, name: "Ibrahim Abdulrauf", role: "TEDxHUI Organizer", image: Unknown },
    { id: 4, name: "Ibrahim Abdulrauf", role: "TEDxHUI Organizer", image: Unknown },
    { id: 5, name: "Ibrahim Abdulrauf", role: "TEDxHUI Organizer", image: Unknown },
    { id: 6, name: "Ibrahim Abdulrauf", role: "TEDxHUI Organizer", image: Unknown },
  ];

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
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Infinite subtle zoom for the image
  const imageAnimation: TargetAndTransition = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Staggered fade-up for paragraphs
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
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
        ease: "backOut" 
      } 
    }
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
      transition: { type: "spring", stiffness: 100, damping: 15 } // Smooth pop
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
            scale: [1, 1.1, 1] 
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
      <section className="about-story lg:mt-16 mt-[2rem] px-[2.5rem] p-2 lg:px-[5.6rem] ">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto text-[#040001] lg:text-[1.2rem]"
        >
          {/* Section Heading */}
          <motion.h4 
            variants={textVariants}
            className='text-2xl md:text-[2.2rem] font-medium leading-tight font-glancyr mb-6'
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
              "By organizing TEDxHUI, we not only celebrate groundbreaking ideas but also nurture a culture of learning and collaboration that extends beyond the stage."
            ].map((text, i) => (
              <motion.div key={i} variants={textVariants} className="py-2 leading-relaxed">
                {text}
              </motion.div>
            ))}
          </div>

          {/* Gradient Border Image Container */}
          <motion.div 
            variants={textVariants}
            className="relative lg:mt-16 mt-[2rem] p-[4px] rounded-[35px] overflow-hidden"
            style={{
              background: "linear-gradient(to bottom right, #040001, #EA1D2C)"
            }}
          >
            <div className="bg-white rounded-[31px] overflow-hidden">
              <motion.img 
                animate={imageAnimation}
                className='w-full h-[400px] object-cover' 
                src={Building} 
                alt="A Building in Al-Hikmah" 
              />
            </div>
          </motion.div>


          

        </motion.div> 

        {/*The Gift Section*/}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:space-y-[1.25rem] space-y-[1rem] lg:pt-[5rem] pt-[3rem]"
        >
          {/* Header with "The Gift" in Red */}
          <motion.h4 variants={contentVariants} className="text-3xl md:text-[2.2rem] font-medium leading-tight font-glancyr">
            Theme: <span className="text-[#EA1D2C]">The Gift</span>
          </motion.h4>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#040001] max-w-[75rem]">
            <motion.div variants={contentVariants}>
              Every one of us carries a gift. Some gifts are loud and visible, others are quiet and hidden, 
              waiting for the right moment to be unwrapped.
            </motion.div>

            <motion.div variants={contentVariants}>
              At TEDxHUI 2025, our theme “The Gift” is a call to recognize and celebrate these treasures. 
              Gifts of knowledge. Gifts of creativity. Gifts of resilience. Gifts of perspective. 
              Life itself is a gift, and within it, each individual has something unique to offer the world. 
              The question is not whether you have a gift, but how you choose to share it.
            </motion.div>

            <motion.div variants={contentVariants}>
              Through thought-provoking talks, performances, and ideas worth spreading, TEDxHUI will unwrap 
              stories of ordinary people doing extraordinary things with the gifts they carry. 
              This theme is more than a word. It's a movement.
            </motion.div>
          </div>

          {/* The Styled Rhetorical Questions */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <motion.p variants={contentVariants} className="text-xl md:text-2xl font-medium italic text-[#040001] mb-4">
              At TEDxHUI, we don't just ask: <span className="text-black">“What is your gift?”</span>
            </motion.p>
            
            <motion.div 
              variants={challengeVariants}
              className="bg-[#EA1D2C]/5 p-6 md:p-10 rounded-3xl border-l-8 border-[#EA1D2C]"
            >
              <h3 className="text-2xl md:text-4xl font-medium text-[#EA1D2C] leading-tight">
                We challenge you: <br className="hidden md:block" />
                <span className="text-3xl md:text-5xl uppercase tracking-tight">“Will you give it?”</span>
              </h3>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/*Meet the Brilliant Minds Section*/}
      <section className="brilliant-minds bg-[#EA1D2C0D] lg:p-[4rem] p-[3rem]">
      <div className="max-w-4xl mx-auto p-2">
        
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl max-w-2xl md:text-[3.75rem] font-medium text-[#040001] mb-12 text-start font-glancyr"
        >
          Meet the <span className="text-[#EA1D2C]">Brilliant Minds</span> Behind TEDxHUI
        </motion.h2>

        {/* 3. Wrap the grid in the container motion div */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div 
              key={member.id} 
              variants={cardVariants}
              whileHover={{ y: -10 }} // Subtle lift on hover
              className="p-2"
            >
              <div className="img-container border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden bg-white shadow-lg">
                <img 
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                  src={member.image} 
                  alt={member.name} 
                />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-4 font-glancyr'>
                {member.name}
              </h2>
              <h4 className='pt-1 text-[#EA1D2C] font-medium'>
                {member.role}
              </h4>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
      
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="flex justify-center items-center h-full">
              <img 
                src={TedwhiteSpeaker} 
                alt="TEDx" 
                className="w-full h-full max-w-sm md:max-w-md object-cover rounded-lg"
              />
            </div>


            {/* Right content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
                About TEDx
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
                In a TEDx event, live speakers and recorded TED Talks combine to spark deep discussions and connections within a community. 
                The “x” in TEDx stands for independently organized. While TED provides general guidance for the program, each TEDx event is planned and coordinated independently by a local team that is passionate about ideas worth spreading in their own environment.
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full"
              >
                See More
              </Button>
            </div>

          </div>
        </div>
      </section>

      <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
          <img src={Elipse1} alt="Elipse" />
        </div>

        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Be Part of the First TEDxHUI Experience
              </h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Seats are limited, reserve yours today and witness history in the making.
              </p>
              <button className="bg-white hover:bg-primary/90 text-black font-bold px-10 py-4 text-base rounded-full mt-6 transition-colors">
                Get Your Ticket
              </button>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default AboutPage;
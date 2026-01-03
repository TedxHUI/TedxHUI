import React from 'react'
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import Elipse1 from "../assets/Ellipse 1.png";
import { Link } from 'react-router-dom';
import Unknown from "../assets/0ca30f5a418dacbe53b99b7bd4f3d02b42d11155.jpg";

const SPEAKERS = [
  { id: "alhaji-ali", name: "Alhaji Ali", role: "Director General, Nigeria", img: "/images/Speakers/Ali.jpg" },
  { id: "alhan-islam", name: "Alhan Islam", role: "UN Global Advocate For Peace", img: "/images/Speakers/Alhan.jpg" },
  { id: "Ahmad-XM", name: "Ahmad XM", role: "CEO, XM Trading", img: "/images/Speakers/xm.jpg" },
  { id: "maryam", name: "Maryam Apaokagi", role: "Content Creator", img: "/images/Speakers/taoma.jpg" },
  { id: "khalil", name: "Khalil Halilu", role: "Executive Vice Chairman, NASENI", img: "/images/Speakers/Khalil.jpg" },
  { id: "odunayo", name: "Odunayo Eweniyi", role: "Co-founder, PiggyVest", img: "/images/Speakers/odunayo.jpeg" },
  { id: "hamzat", name: "Hamzat Lawal", role: "Founder of Connected Development (CODE)", img: "/images/Speakers/hamzat.jpeg" },
  // Add more easily here...
];

const Speakers = () => {

   const sentence = "Meet the Voices Inspiring Change";

    const words = sentence.split(" ");
    // Variants for the container to stagger the words
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { 
          staggerChildren: 0.12, // Faster stagger for text looks better
          delayChildren: 0.3 
        }
      }
    };

    const cardVariants: Variants = {
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
      }
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

  return (
    <div>
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
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span
                  variants={child}
                  key={index}
                  className={word === "Voices" ? "text-[#EA1D2C]" : "text-white"}
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
      
      {/*Speakers Card */}
      <section className="py-12 md:py-20 lg:px-20 px-8 bg-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          // 3. Grid handles width and responsiveness perfectly
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {SPEAKERS.map((speaker, index) => (
            <motion.div key={index} variants={cardVariants} className="group">
              {/* Image Container with fixed aspect ratio */}
              <div className="aspect-square rounded-3xl overflow-hidden mb-5 bg-gray-100">
                <img 
                  src={speaker.img} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              
              <h2 className="text-xl md:text-2xl font-medium font-glancyr text-[#040001] leading-tight">
                {speaker.name}
              </h2>
              <h4 className="pt-1 text-gray-600 font-medium">
                {speaker.role}
              </h4>
              
              <Link 
                to={`/speakers/${speaker.id}`} // This points to the dynamic route
                className="mt-4 inline-block border border-[#3F1212] text-[#3F1212] hover:bg-[#3F1212] hover:text-white transition-colors text-sm font-medium rounded-full px-6 py-2"
              >
                Read Bio
              </Link>
            </motion.div>
          ))}
        </motion.div>
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
  )
}

export default Speakers
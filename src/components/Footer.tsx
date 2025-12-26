import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Youtube, Linkedin, Instagram, Send } from "lucide-react";
import Logo from "../assets/Frame 32.png";

const Footer = () => {
  // Animation variants for the link lists
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  const quickLinks = [
    "Get Ticket", "About TEDxHUI", "Speakers", 
    "Agenda", "Create DP", "Contact", "Join Community"
  ];

  return (
    <footer className="bg-gradient-to-t from-[#040001] via-[#0B0002] to-[#590A10] text-white pt-12 pb-6 md:pt-16 md:pb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Centered Logo with Scale-in Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img className='w-28 h-auto md:w-36' src={Logo} alt="TEDxHUI Logo" />
        </motion.div>

        <div className="max-w-6xl mx-auto mt-16 md:mt-24">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            
            {/* Left Section: Newsletter */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 flex flex-col justify-end"
            >
              <div>
                <h4 className="font-bold text-xl mb-3 font-glancyr">Stay Updated</h4>
                <p className="text-gray-300 text-sm md:text-base max-w-md mb-6 leading-relaxed">
                  Subscribe for event news, inspiring speaker stories, and exclusive TEDxHUI updates in your inbox.
                </p>
                
                {/* Newsletter Input with focus animation */}
                <div className="relative group max-w-sm">
                  <input 
                    type="email" 
                    placeholder="enter email address"
                    className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#EA1D2C] transition-all text-sm"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1.5 bottom-1.5 px-6 bg-white text-[#EA1D2C] rounded-full font-bold text-sm shadow-lg hover:bg-[#EA1D2C] hover:text-white transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Right Section: Links & Socials */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3 text-sm text-gray-300">
                  {quickLinks.map((link, i) => (
                    <motion.li 
                      key={link}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      variants={listVariants}
                      viewport={{ once: true }}
                    >
                      <a href="#" className="hover:text-[#EA1D2C] transition-colors inline-block">
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-end items-start md:items-end"
              >
                <span className="text-gray-400 text-sm mb-4">Follow Us on</span>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, link: "#" },
                    { Icon: Twitter, link: "#" },
                    { Icon: Linkedin, link: "#" },
                    { Icon: Youtube, link: "#" }
                  ].map(({ Icon, link }, i) => (
                    <motion.a 
                      key={i}
                      href={link}
                      whileHover={{ y: -5, backgroundColor: "#EA1D2C", color: "#fff" }}
                      className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center transition-all shadow-md"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} TEDxHUI. This independently organized TEDx event is operated under license from TED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
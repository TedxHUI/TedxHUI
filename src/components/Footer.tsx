import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Music2, // For TikTok
} from "lucide-react";
// Custom X and TikTok icons would be better but let's use Lucide for now
import { Link } from "react-router-dom";
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
    { label: "Get Ticket", path: "/book-ticket" },
    { label: "About TEDxHUI", path: "/about" },
    { label: "Speakers", path: "/speakers" },
    { label: "Agenda", path: "/agenda" },
    { label: "Create DP", path: "/createdp" },
    { label: "Contact", path: "/contact" },
    { label: "Join Community", path: "/community" },
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
          <img className="w-28 h-auto md:w-36" src={Logo} alt="TEDxHUI Logo" />
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
                <h4 className="font-bold text-xl mb-3 font-glancyr">
                  Stay Updated
                </h4>
                <p className="text-gray-300 text-sm md:text-base max-w-md mb-6 leading-relaxed">
                  Subscribe for event news, inspiring speaker stories, and
                  exclusive TEDxHUI updates in your inbox.
                </p>

                {/* Newsletter Input */}
                <div className="relative max-w-lg">
                  <div className="flex flex-col sm:flex-row items-center gap-3 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                    <input
                      type="email"
                      placeholder="enter email address"
                      className="w-full px-6 py-3 bg-transparent border-none text-white placeholder:text-gray-500 focus:outline-none text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-8 py-3 bg-white text-[#EA1D2C] rounded-full font-black text-sm shadow-xl hover:bg-gray-100 transition-all whitespace-nowrap"
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section: Links & Socials */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3 text-sm text-gray-300">
                  {quickLinks.map((link, i) => (
                    <motion.li
                      key={link.label}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      variants={listVariants}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={link.path}
                        className="hover:text-[#EA1D2C] transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
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
                    { Icon: Instagram, link: "#" },
                    { Icon: Twitter, link: "https://x.com" },
                    { Icon: Linkedin, link: "#" },
                    { Icon: Facebook, link: "#" },
                    { Icon: Music2, link: "#" }, // TikTok
                  ].map(({ Icon, link }, i) => (
                    <motion.a
                      key={i}
                      href={link}
                      whileHover={{
                        y: -5,
                        backgroundColor: "#EA1D2C",
                        color: "#fff",
                      }}
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all shadow-md"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} TEDxHUI. This independently organized
              TEDx event is operated under license from TED.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="relative mt-20 opacity-10 pointer-events-none select-none">
        <h2 className="text-[20vw] font-bold text-white text-center leading-[0.7] font-glancyr whitespace-nowrap">
          TED<span className="text-[#EA1D2C]">X</span>HUI
        </h2>
      </div>
    </footer>
  );
};

export default Footer;

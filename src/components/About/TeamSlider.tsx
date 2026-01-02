import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const TEAM_DATA = [
  { name: "Ibrahim Abdulrauf", role: "TEDxHUI Organizer", img: "images/TeamMembers/Abubakar Abdullahi.jpeg", email: "organizer@tedxhui.com" },
  { name: "Umar Yunusa", role: "Event Curators Lead", img: "/images/TeamMembers/UmarYunusa.jpeg", email: "curator@tedxhui.com" },
  // ... add more members
];

const TeamSlider = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1A0404] to-[#2C0808] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between items-end mb-12">
            <div>
                <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-white lg:mb-[1rem] lg:text-start text-center lg:px-[4rem] font-glancyr max-w-[44rem]"
                >
                Meet The <span className="text-primary">Brilliant Minds</span> Behind TEDxHUI
                </motion.h2>
            </div>
          
          {/* Custom Navigation Arrows */}
          <div className="flex gap-4 mb-2">
            <button className="swiper-prev border border-white/20 p-4 rounded-full hover:bg-[#EA1D2C] transition-colors">
              ←
            </button>
            <button className="swiper-next border border-white/20 p-4 rounded-full hover:bg-[#EA1D2C] transition-colors">
              →
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
          className="team-swiper px-[3rem]"
        >
          {TEAM_DATA.map((member, index) => (
            <SwiperSlide key={index}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden group"
              >
                {/* Image with Grayscale to Color effect */}
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* The Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Info Content - Bottom Left */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-xl font-bold font-glancyr">{member.name}</h3>
                  <p className="text-[#EA1D2C] text-sm font-medium uppercase tracking-wider">{member.role}</p>
                  
                  {/* Mail reveal on hover */}
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    whileHover={{ opacity: 1, height: 'auto' }}
                    className="text-gray-400 text-xs mt-2 overflow-hidden"
                  >
                    {member.email}
                  </motion.p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSlider;
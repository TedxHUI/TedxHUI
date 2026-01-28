import React from 'react';
import { motion, Variants } from 'framer-motion';

// Replace this with your actual image path
const giftThemeBanner = "/images/theme.png"; 

const cardVariants: Variants = {
hidden: { opacity: 0, y: 30 },
visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
    delay: i * 0.1,
    duration: 0.5,
    ease: "easeOut",
    },
}),
};

export const ThemeSection = () => (
    <section className="py-16 md:pb-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                {/* Theme Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative group"
                >
                    <img
                        src={giftThemeBanner}
                        alt="The Gift Theme"
                        className="w-full mx-auto h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "linear",
                            delay: 1,
                        }}
                    />
                </motion.div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        {
                            title: "Location",
                            detail: "Moot Court, Atere Campus, AL-Hikmah University, Ilorin",
                        },
                        { title: "Date", detail: "Thursday, June 5th, 2025" },
                        { title: "Time", detail: "9:00 AM - 12:00 PM WAT" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                backgroundColor: "#fffafa",
                                borderColor: "#EA1D2C",
                            }}
                            className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 transition-all text-start shadow-sm"
                        >
                            <h3 className="text-base md:text-lg font-bold font-glancyr mb-3 text-black">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                {item.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
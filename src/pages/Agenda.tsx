import React from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import { AGENDA_DATA } from '../data/agenda';
import { SessionBlock } from '../components/SessionBlock';

const Agenda = () => {

    const sentence = "A Day of Ideas Worth Spreading";
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

    return (
        <div className="bg-white min-h-screen">
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
                        className={word === "Day" ? "text-[#EA1D2C]" : "text-white"}
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
            

            {/* Main Timeline Section */}
            <section className="py-16 md:py-24 max-w-6xl mx-auto px-6 md:px-12">
                {/* Simple mapping over our session data */}
                {AGENDA_DATA.map(session => (
                <SessionBlock key={session.id} session={session} />
                ))}
            </section>
        </div>
    );
};

export default Agenda;
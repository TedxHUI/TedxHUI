import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00", hours: "00", minutes: "00", seconds: "00"
  });

  useEffect(() => {
    const targetDate = new Date("2026-02-05T09:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
        seconds: Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Days", val: timeLeft.days },
    { label: "Hours", val: timeLeft.hours },
    { label: "Minutes", val: timeLeft.minutes },
    { label: "Seconds", val: timeLeft.seconds },
  ];

  return (
    <div className="relative max-w-[40.56rem] mx-auto lg:mt-[5.06rem] mt-[3rem]">

      <div className="bg-black rounded-[1.25rem] py-[2.5rem] flex justify-around items-center relative z-30 overflow-hidden font-glancyr shadow-2xl border border-white/5">
        {items.map((item, i) => (
          <React.Fragment key={item.label}>
            <div className="text-center min-w-[60px] md:min-w-[100px]">
              {/* Animated Number Container */}
              <div className="h-10 md:h-16 overflow-hidden mb-3 relative">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={item.val}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="text-3xl md:text-[3.58rem] font-medium text-white font-mono tabular-nums"
                  >
                    {item.val}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="text-[10px] md:text-xs text-[#FEF3F4]/60 tracking-widest font-normal uppercase">
                {item.label}
              </div>
            </div>
            
            {/* Divider */}
            {i < items.length - 1 && (
              <div className="text-white/20 font-medium text-2xl md:text-[3rem] self-center mb-8">:</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
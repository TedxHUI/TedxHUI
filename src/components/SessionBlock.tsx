import React from 'react';
import { motion } from 'framer-motion';
import { Session } from '../data/agenda';

export const SessionBlock = ({ session }: { session: Session }) => {
  return (
    <div className="mb-12">
      {/* Session Header Bar */}
      <div className="bg-[#1a0304] text-white py-4 px-8 rounded-sm mb-6">
        <h3 className="text-xl font-medium font-glancyr tracking-wide">
          {session.sessionTitle}
        </h3>
      </div>

      {/* Items List */}
      <div className="space-y-0">
        {session.items.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col md:flex-row border-b border-gray-200 py-8 gap-4 md:gap-20 items-start"
          >
            {/* Time Column */}
            <span className="text-[#EA1D2C] font-bold text-lg md:text-xl min-w-[200px] shrink-0">
              {item.time}
            </span>
            
            {/* Title & Description Column */}
            <div className="flex-1">
              <h4 className="text-xl md:text-2xl font-medium text-[#040001]">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-gray-500 font-normal mt-1 md:text-lg">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
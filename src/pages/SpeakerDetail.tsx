import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiInstagram, FiLinkedin, FiCalendar, FiMapPin } from 'react-icons/fi';

// In a real app, move this array to a separate data file so both pages can import it
const SPEAKERS_DATA = [
  { 
    id: "alhaji-ali", 
    name: "Alhaji Ali Sarkin Mota", 
    role: "Director General, Security and Exchange Commission, Nigeria", 
    img: "/images/Speakers/Ali.jpg",
    fullBio: "He was born during the reign of Sarkin Zazzau Ibrahim and learned car repair from the late chief mechanic Malam Iyal...", // Text from image_8451b1.jpg
    instagram: "#",
    linkedin: "#"
  },
  // Add other speakers with their full details here
];

const SpeakerDetail = () => {
    const Icon = ({ icon: IconComponent, size = 20 }: { icon: any, size?: number }) => (
        <IconComponent size={size} />
    );

    const { id } = useParams();
    const speaker = SPEAKERS_DATA.find(s => s.id === id);

    if (!speaker) return <div className="text-white text-center py-20">Speaker Not Found</div>;

    return (
        <div className="bg-black min-h-screen">
            {/* Header / Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#330609] via-black to-[#330609] text-white">
                <div className="container mx-auto px-6 relative z-10">
                <Link to="/speakers" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors">
                    {/* Use the component as a casted type to bypass the error */}
                    {React.createElement(FiArrowLeft as any)} Back to Speakers
                </Link>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Speaker Image */}

                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full max-w-md aspect-square rounded-[2.5rem] overflow-hidden border-2 border-[#EA1D2C]/20"

                    >
                        <img src={speaker.img} alt={speaker.name} className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="flex-1 space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-7xl font-bold font-glancyr leading-tight">{speaker.name}</h1>
                    <p className="text-xl md:text-2xl text-gray-300">{speaker.role}</p>
                    
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl inline-block border border-white/10 text-left">
                        <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#EA1D2C]">{React.createElement(FiCalendar as any)}</span> 
                        Speaking at TEDxHUI 2026
                        </div>
                        <div className="flex items-center gap-3">
                        <span className="text-[#EA1D2C]">{React.createElement(FiMapPin as any)}</span> 
                        Ilorin, Kwara State, Nigeria • Jan 17, 2026
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start gap-6 pt-4">
                        <a href={speaker.instagram} className="p-3 bg-white/10 rounded-full hover:bg-[#EA1D2C] transition-all">
                        {React.createElement(FiInstagram as any, { size: 24 })}
                        </a>
                        <a href={speaker.linkedin} className="p-3 bg-white/10 rounded-full hover:bg-[#EA1D2C] transition-all">
                        {React.createElement(FiLinkedin as any, { size: 24 })}
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-20 bg-white text-black">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-glancyr mb-12">About <span className="text-[#EA1D2C]">{speaker.name.split(' ')[0]}</span></h2>
                <div className="text-lg md:text-xl leading-relaxed text-gray-700 space-y-6">
                    <p className="whitespace-pre-line">{speaker.fullBio}</p>
                </div>
                </div>
            </section>
        </div>
    );
};

export default SpeakerDetail;
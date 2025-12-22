import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { 
  MapPin, 
  Calendar, 
  Clock
} from 'lucide-react';
import tedxCrystal from "../assets/Component 35.png";
import tedxGiftLogo from "../assets/Facebook cover photo.png";
import speaker1 from "../assets/Frame 163.png";
import kfcLogo from "../assets/Group@2x.png";
import kudaLogo from "../assets/Group 3.png";
import giftThemeBanner from "../assets/Frame 35.png";
import HeroTEDImage from "../assets/Component 26.png";
import Elipse1 from "../assets/Ellipse 1.png";
import Elipse2 from "../assets/Ellipse 3.png";
import LastImg from "../assets/0315491aa2291cff2fc0788336df59d5f2687320.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const HomePage = () => {

  
  const speakers = [
    {
      name: "Ibrahim Abdul-Matin",
      title: "Environmentalist & Author",
      image: speaker1,
    },
    {
      name: "Speaker Name",
      title: "Title & Profession",
      image: speaker1,
    },
  ];

  const sponsors = [
    { name: "KFC", logo: kfcLogo },
    { name: "Amazon", logo: kfcLogo },
    { name: "Google", logo: kfcLogo },
    { name: "CNN", logo: kfcLogo },
    { name: "Kuda", logo: kudaLogo },
    { name: "KFC", logo: kfcLogo },
    { name: "Amazon", logo: kfcLogo },
  ];

  const faqs = [
    {
      question: "What does TED stand for?",
      answer: "TED stands for Technology, Entertainment, and Design. It's a global community focused on ideas worth spreading through short, powerful talks.",
    },
    {
      question: "What is TEDx?",
      answer: "TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At TEDx events, a screening of TED Talks videos — or a combination of live presenters and TED Talks videos — sparks deep conversation and connections.",
    },
    {
      question: "Do I need to register?",
      answer: "Yes, registration is required to attend TEDxHUI. You can register through our ticketing platform to secure your spot.",
    },
    {
      question: "How much are tickets?",
      answer: "Ticket prices vary by category. Early bird tickets offer the best value. Check our registration page for current pricing.",
    },
    {
      question: "Can I get a refund?",
      answer: "Refund policies vary. Please check our terms and conditions or contact our support team for specific refund requests.",
    },
    {
      question: "What should I wear?",
      answer: "We recommend smart casual attire. Come comfortable and ready to engage with ideas!",
    },
    {
      question: "Will there be food?",
      answer: "Yes! Light refreshments and meals will be provided throughout the event day.",
    },
    {
      question: "Can I bring a guest?",
      answer: "Each ticket is for one person. If you'd like to bring guests, please register them separately.",
    },
  ];


  return (
    <>
      <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden pb-[80px]">
        {/* MOVING GIFT BOXES PATTERN (Infinite Loop) */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 flex items-end pointer-events-none overflow-hidden z-[2]">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }} // Adjust based on image width
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <img src={HeroTEDImage} alt="Hero TED" className="h-full" />
            <img src={HeroTEDImage} alt="Hero TED" className="h-full" /> {/* Duplicate for seamless loop */}
          </motion.div>
        </div>

        {/* 2. ROTATING CRYSTAL (Slow Loop) */}
        <motion.div 
          className="absolute top-[-30px] right-[-30px] w-[150px] h-[150px] md:w-[250px] md:h-[250px] opacity-30 md:opacity-80 z-[1]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <img src={tedxCrystal} alt="Crystal" className="w-full h-full object-contain" />
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-[14rem] lg:h-[5rem]">
          <img src={Elipse2} alt="Elipse" />
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
          <img src={Elipse1} alt="Elipse" />
        </div>

        <div className="container px-[3.5rem] py-[7rem] relative z-10">
          <div className="max-w-5xl text-center sm:text-start ">
            {/* Badge (Added Fade-in) */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <span className="text-xs md:text-sm text-[#EA1D2C] font-bold px-5 py-[0.23rem] bg-white/10 opacity-70 backdrop-blur-sm rounded-full">
                TEDxHUI 2026
              </span>
            </motion.div>

            {/* 3. TYPEWRITER HEADING */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-6 min-h-[70px]">
              <Typewriter
                options={{
                  strings: ['Ideas Worth Spreading', 'Inspiring Change', 'Uniting Thinkers'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </h1>

            {/* Subheading (Smooth slide up) */}
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#A1A1A1] lg:text-[1.2rem] md:text-xl max-w-[34rem] leading-relaxed font-medium mt-4"
            >
              An independently organized TED event uniting thinkers, leaders, and creatives to share stories that inspire change.
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center pt-[2.5rem]">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-white hover:bg-gray-100 transition-colors text-[#EA1D2C] md:px-7 md:py-5 text-[0.8rem] rounded-full shadow-lg"
                >
                  Be a Sponsor
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-[#EA1D2C] hover:bg-[#ff2b3a] transition-colors text-white md:px-7 md:py-5 text-[0.8rem] rounded-full shadow-lg"
                >
                  Get Your Ticket
                </Button>
              </motion.div>
          </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
                The First Ever <span className="text-primary">TEDx</span>HUI
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                TEDxHUI 2025 is the first-ever TEDx event hosted at HUI. It’s more than a conference, it’s a platform where our community comes together to share bold ideas, celebrate local voices, and connect with global conversations. From inspiring talks to unforgettable stories, TEDxHUI is set to ignite a culture of innovation, creativity, and change right here at Moot Court Atere.”
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full"
              >
                See More
              </Button>
            </div>

            {/* Right Logo */}
            <div className="flex justify-center items-center">
              <img 
                src={tedxGiftLogo} 
                alt="TEDx Gift Logo" 
                className="w-full max-w-sm md:max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-3 text-center md:text-left">
              Why You Should <span className="text-primary">Attend</span>
            </h2>
              
                <div className={`space-y-10 md:space-y-12 mt-12 p-9 rounded-[30px] bg-[#FEF4F4]`}>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                      You'll Leave Different, In a Good Way
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      There are some days that just change you, and TEDxHUI is one of them. It's not another event where you sit, clap, and go home, it's an experience that rewires something inside you. You'll hear people your age, and people way beyond your age, share real stories of failure, faith, and breakthroughs. And suddenly, it hits you: “Wait, maybe I can do that too.”You'll leave with new dreams, new energy, and that spark that whispers — “my time starts now.
                    </p>
                  </div>
                </div>

                <div className={`space-y-10 md:space-y-12 mt-[100px] p-9 rounded-[30px] bg-[#F1FAEE]`}>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                      Meet Crazy-Brilliant People Like You
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Let's be real, the world runs on connections. And at TEDxHUI, you'll find the kind of people who light you up. People who think boldly, dream wildly, and act intentionally. You'll meet techies, creatives, entrepreneurs, and deep thinkers, all in one room. The person you bump into at the snack table could be your next collaborator, co-founder, or someone who just gets you. You don't want to hear about this from others later, be there to live it.
                    </p>
                  </div>
                </div>
                
                <div className={`space-y-10 md:space-y-12 mt-[100px] p-9 rounded-[30px] bg-[#FDF6EC]`}>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                      The Theme — The Gift. Is About You.
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      This year's theme, The Gift, isn't just poetic, it's personal. It's about realizing that you already have something within you that the world needs. You are the story. The idea. The spark. The gift. TEDxHUI isn't here to give you something new, it's here to help you unwrap what's already yours. The talks, the energy, the people, everything is designed to remind you that you matter, your ideas matter, and the world is waiting to hear from you.
                    </p>
                  </div>
                </div>
                
                <div className={`space-y-10 md:space-y-12 mt-[100px] p-9 rounded-[30px] bg-[#F4F8F1]`}>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                      The Energy Is Unreal
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      There's something about a TEDx crowd, the electricity, the heartbeat, the shared excitement of hearing something powerful for the first time. When the lights dim and that red dot glows, you'll feel the energy shift. Every word, every performance, every cheer it pulls you in. The cameras can't capture that feeling; only being there can. You'll laugh, reflect, maybe tear up a little and when you leave, you'll wish you could rewind it all.
                    </p>
                  </div>
                </div>
                
                <div className={`space-y-10 md:space-y-12 mt-[100px] p-9 rounded-[30px] bg-[#FFF9F1]`}>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                      You'll Be Part of Something Bigger Than You
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      TEDxHUI isn't just a one-day event; it's a movement that outlives the day itself. The friendships you build, the lessons you take, and the ideas you'll share after, that's the real story. When you attend, you're not just watching change you become part of it. You become one of the people who can proudly say, “I was there when it all began.
                    </p>
                  </div>
                </div>

          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1A0404] to-[#2C0808]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Meet Our <span className="text-primary">Seasoned Speakers</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
              {speakers.map((speaker, index) => (
                <div 
                  key={index}
                  className="relative group overflow-hidden rounded-xl bg-black/40"
                >
                  <div className="aspect-[3/2] md:aspect-[4/3] overflow-hidden">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{speaker.name}</h3>
                    <p className="text-gray-300 text-sm md:text-base">{speaker.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-full transition-colors">
                View All Speakers
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-black">
              Our <span className="text-primary">Amazing</span> Sponsors and Partners
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8 items-center justify-items-center">
              {sponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="w-full flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="w-full h-auto max-w-[80px] md:max-w-[100px] object-contain grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-start mb-12 text-primary">
              Event <span className="text-black">Details</span>
            </h2>

            {/* Theme Banner */}
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img 
                src={giftThemeBanner} 
                alt="The Gift Theme" 
                className="w-full mx-auto h-auto object-cover"
              />
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg- rounded-xl p-6 md:p-8 border border-primary/20 hover:border-primary/60 transition-colors text-start">
                {/* <MapPin className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 mx-auto" /> */}
                <h3 className="text-base md:text-lg font-bold mb-3 text-black">Location</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  AL-Hikmah University, Ilorin
                </p>
              </div>

              <div className="bg- rounded-xl p-6 md:p-8 border border-primary/20 hover:border-primary/60 transition-colors text-start">
                {/* <Calendar className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 mx-auto" /> */}
                <h3 className="text-base md:text-lg font-bold mb-3 text-black">Date</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Saturday, 17th January 2026
                </p>
              </div>

              <div className="bg- rounded-xl p-6 md:p-8 border border-primary/20 hover:border-primary/60 transition-colors text-start">
                {/* <Clock className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 mx-auto" /> */}
                <h3 className="text-base md:text-lg font-bold mb-3 text-black">Time</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  10:00 AM - 4:00 PM WAT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-[#F5F1ED]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-black">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-black text-white rounded-full px-6 border-none overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-xs md:text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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


      <section className="py-16 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("${LastImg}")`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Be Part of the <span className="text-primary">TEDxHUI Community</span>
            </h2>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              Join a growing network of thinkers, creators, and changemakers. Stay updated 
              with the latest news, speaker announcements, and exclusive content.
            </p>
            <button className="bg-white hover:bg-gray-100 text-black font-bold px-10 py-4 text-base rounded-full mt-6 transition-colors">
              Join Community
            </button>
          </div>
        </div>
      </section>

    </>
    
  );
};

export default HomePage;
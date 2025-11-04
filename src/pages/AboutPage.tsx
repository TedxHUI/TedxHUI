import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  User, 
  MapPin, 
  Award, 
  Target, 
  Heart, 
  Lightbulb,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Elipse1 from "../assets/Ellipse 1.png";
import TedwhiteSpeaker from "../assets/2d0ce2fb734db790a93563a83d7299d6126715ac.jpg";
import Building from "../assets/978a49b1f977f1e722458c378b42e7bfa6e13b75.jpg";
import Unknown from "../assets/unknown.jpg";

const AboutPage = () => {

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">

        <div className="py-24 md:py-36">
          <div className="container mx-auto px-4">
            <div className="max-w-1xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Discover the <span className="text-primary">Story</span> Behind TEDxHUI
              </h2>
            </div>
          </div>
        </div>

      </section>

      <section className="about-story mt-16 p-2">
        <div className="max-w-4xl mx-auto">

          <h4 className='text-2xl md:text-3xl font-bold text-black leading-tight'>About TedxHUI</h4>

          <div className="p1 py-3">
            Every great university has a defining moment, a spark that sets it apart, a story that echoes beyond its walls. For Al-Hikmah University, that moment is here.
          </div>
          <div className="p2 py-3">
            TEDxHUI is the official TEDx event hosted by Al-Hikmah University, Ilorin, Nigeria. It is part of the globally recognized TEDx program, which brings the spirit of TED ideas worth spreading to local communities around the world.
          </div>
          <div className="p3 py-3">
            At TEDxHUI, we aim to create a stage where thinkers, innovators, performers, and storytellers can share ideas that challenge perspectives, spark conversations, and inspire positive action. Although independently organized, TEDxHUI operates under license from TED and adheres to its rules and guidelines.
          </div>
          <div className="p4 py-3">
            Rooted in the values of curiosity, creativity, and community impact, TEDxHUI is more than just an event, it is a movement within Al-Hikmah University to highlight voices that matter. Our team of student leaders, faculty supporters, and volunteers work passionately to build a platform that connects our university with the wider world.
          </div>
          <div className="p5 py-3">
            By organizing TEDxHUI, we not only celebrate groundbreaking ideas but also nurture a culture of learning and collaboration that extends beyond the stage. Over time, we envision TEDxHUI becoming a recognized hub of inspiration at Al-Hikmah University and across Kwara State.
          </div>

          <div className="img-container flex border border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden mt-12">
            <img className='w-full object-cover' src={Building} alt="" />
          </div>

          
          <h4 className='text-2xl md:text-3xl font-bold text-black leading-tight mt-12'>Theme: <span className="text-primary">The Gift</span> </h4>

          
          <div className="p1 py-3">
            Every one of us carries a gift. Some gifts are loud and visible, others are quiet and hidden, waiting for the right moment to be unwrapped.
          </div>
          <div className="p2 py-3">
            At TEDxHUI 2025, our theme “The Gift” is a call to recognize and celebrate these treasures. Gifts of knowledge. Gifts of creativity. Gifts of resilience. Gifts of perspective. Life itself is a gift, and within it, each individual has something unique to offer the world. The question is not whether you have a gift, but how you choose to share it.
          </div>
          <div className="p3 py-3">
            Through thought-provoking talks, performances, and ideas worth spreading, TEDxHUI will unwrap stories of ordinary people doing extraordinary things with the gifts they carry. From the spark of an idea to the ripple of impact, we will explore how gifts when shared can transform individuals, communities, and even the world. 
            This theme is more than a word. It's a movement. A reminder that what you hold inside of you could be the very thing the world has been waiting for.
          </div>
          <div className="p4 py-3">
            At TEDxHUI, we don't just ask: “What is your gift?”
          </div>
          <div className="p5 py-3">
            We challenge you: “Will you give it?”
          </div>


        </div>
        
      </section>

      <section className="brilliant-minds bg-[#EA1D2C0D] py-16 md:py-24">
        <div className="max-w-4xl mx-auto p-2">
          
          <h2 className="text-3xl max-w-2xl md:text-5xl font-bold text-black mb-12 text-start">
            Meet the <span className="text-primary">Brilliant Minds</span> Behind TEDxHUI
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="bg-grey-200 p-4">
              <div className="img-container border border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Ibrahim Abdulrauf</h2>
              <h4 className='pt-2'>TEDxHUI Organizer</h4>
            </div>

            <div className="bg-grey-200 p-4">
              <div className="img-container border border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Ibrahim Abdulrauf</h2>
              <h4 className='pt-2'>TEDxHUI Organizer</h4>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container border border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Ibrahim Abdulrauf</h2>
              <h4 className='pt-2'>TEDxHUI Organizer</h4>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container border border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Ibrahim Abdulrauf</h2>
              <h4 className='pt-2'>TEDxHUI Organizer</h4>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container border border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Ibrahim Abdulrauf</h2>
              <h4 className='pt-2'>TEDxHUI Organizer</h4>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container border border-4 border-[#EA1D2C] rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Ibrahim Abdulrauf</h2>
              <h4 className='pt-2'>TEDxHUI Organizer</h4>
            </div>

          </div>


        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="flex justify-center items-center h-full">
              <img 
                src={TedwhiteSpeaker} 
                alt="TEDx" 
                className="w-full h-full max-w-sm md:max-w-md object-cover rounded-lg"
              />
            </div>


            {/* Right content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
                About TEDx
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
                In a TEDx event, live speakers and recorded TED Talks combine to spark deep discussions and connections within a community. 
                The “x” in TEDx stands for independently organized. While TED provides general guidance for the program, each TEDx event is planned and coordinated independently by a local team that is passionate about ideas worth spreading in their own environment.
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full"
              >
                See More
              </Button>
            </div>

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

    </div>
  );
};

export default AboutPage;
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import Logo from "../assets/Frame 32.png";

const Footer = () => {


  return (
    <footer className="bg-gradient-to-t from-[#040001] via-[#0B0002] to-[#590A10] text-white pt-12 pb-6 md:pt-16 md:pb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
            <img className='w-25 h-10 md:w-30 md:h-12' src={Logo} alt="Logo" />
        </div>

        <div className="max-w-6xl mx-auto mt-[100px]">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Section */}
            <div className="space-y-6 flex flex-col justify-end">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {/* TEDx<span className="text-primary">HUI</span> */}
                  {/* <img className='w-30 h-12' src={Logo} alt="Logo" /> */}
                </h3>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3">Stay Updated</h4>
                <p className="text-gray-300 text-sm md:text-base max-w-md mb-4">
                  Subscribe for event news, inspiring speaker stories, and exclusive TEDxHUI updates in your inbox.
                </p>
                <div className="flex gap-2 relative w-[300px] items-center mt-6">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="absolute w-full flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary text-sm"
                  />
                  <button className="px-5 py-2 bg-white text-[#EA1D2C] hover:bg-gray-200 rounded-full font-bold transition-colors text-sm ms-auto me-1">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Links */}
            <div className="grid grid-cols-2 gap-8 ">
              <div>
                {/* <h4 className="font-bold text-base md:text-lg mb-4">Quick Links</h4> */}
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#" className="hover:text-primary transition-colors">Get Ticket</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">About TEDxHUI</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Speakers </a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Agenda</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Create DP</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Join Community</a></li>
                </ul>
              </div>

              <div className="hidden md:flex flex-col justify-end">
                {/* <h4 className="font-bold text-base md:text-lg mb-4">Legal</h4> */}
                <span className="text-[#d1d5db]">Follow Us on</span>
                <div className="flex flex-col md:flex-row mt-6">
                  <div className="flex gap-4">
                    <a href="#" className="w-7 h-7 rounded bg-white text-black hover:bg-primary flex items-center justify-center transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-7 h-7 rounded bg-white text-black hover:bg-primary flex items-center justify-center transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    {/* <a href="#" className="w-8 h-8 rounded bg-white text-black hover:bg-primary flex items-center justify-center transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a> */}
                    <a href="#" className="w-7 h-7 rounded bg-white text-black hover:bg-primary flex items-center justify-center transition-colors">
                      <Youtube className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-7 h-7 rounded bg-white text-black hover:bg-primary flex items-center justify-center transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="block md:hidden border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-center">
              
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
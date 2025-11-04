import React from 'react'
import Elipse1 from "../assets/Ellipse 1.png";
import Unknown from "../assets/0ca30f5a418dacbe53b99b7bd4f3d02b42d11155.jpg";

const Speakers = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">

        <div className="py-24 md:py-36">
          <div className="container mx-auto px-4">
            <div className="max-w-1xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Meet the <span className="text-primary">Voices</span> Inspiring Change
              </h2>
            </div>
          </div>
        </div>

      </section>


      
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto p-2">
          
          <h2 className="text-3xl max-w-2xl md:text-5xl font-bold text-black mb-12 text-start">
            Meet the <span className="text-primary">Brilliant Minds</span> Behind TEDxHUI
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="bg-grey-200 p-4">
              <div className="img-container rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Alhaji Ali </h2>
              <h4 className='pt-2'>Director General, Nigeria</h4>

              <button className="read-bio border border-1 border-black rounded-full px-3 py-1 mt-3">Read Bio</button>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Alhaji Ali </h2>
              <h4 className='pt-2'>Director General, Nigeria</h4>

              <button className="read-bio border border-1 border-black rounded-full px-3 py-1 mt-3">Read Bio</button>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Alhaji Ali </h2>
              <h4 className='pt-2'>Director General, Nigeria</h4>

              <button className="read-bio border border-1 border-black rounded-full px-3 py-1 mt-3">Read Bio</button>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Alhaji Ali </h2>
              <h4 className='pt-2'>Director General, Nigeria</h4>

              <button className="read-bio border border-1 border-black rounded-full px-3 py-1 mt-3">Read Bio</button>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Alhaji Ali </h2>
              <h4 className='pt-2'>Director General, Nigeria</h4>

              <button className="read-bio border border-1 border-black rounded-full px-3 py-1 mt-3">Read Bio</button>
            </div>
            
            <div className="bg-grey-200 p-4">
              <div className="img-container rounded-[30px] overflow-hidden">
                <img src={Unknown} alt="Unknown" />
              </div>
              <h2 className='md:text-2xl font-bold text-black leading-tight pt-1'>Alhaji Ali </h2>
              <h4 className='pt-2'>Director General, Nigeria</h4>

              <button className="read-bio border border-1 border-black rounded-full px-3 py-1 mt-3">Read Bio</button>
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
  )
}

export default Speakers
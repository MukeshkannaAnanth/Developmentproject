import React from 'react';
import Fireworks from '@fireworks-js/react';
import '../ComingSoon/Coming.css'
import Coming from '../ComingSoon/Comingsson';
import companylogo from '../../assets/companylogo/download_logo-removebg-preview.png'
import BalloonComponent from './BalloonComponent';

const Fireworkscrackers = () => {
  const nightTimeFireworksConfig = {
    // Customize fireworks configuration for nighttime
    particleCount: 100, // Adjust the number of particles
    explosionPower: 3, // Adjust the explosion power
    color: ['#FFFFFF', '#FFFF00', '#00FFFF'], // Use colors suitable for nighttime
    shape: 'circle', // You can change the shape if needed
  };

  return (
  <>
      <div style={{  height: '100vh', position: 'relative', overflow:"hidden" }} className='coming bg-gradient-to-r from-blue-500 to-cyan-400'>
      <Fireworks options={nightTimeFireworksConfig} style={{
        position:"absolute",
        height:"100vh"
      }} />

<Fireworks options={nightTimeFireworksConfig} style={{
        position:"absolute",
        height:"100vh",
        marginLeft:"700px"
      }} />

<Fireworks options={nightTimeFireworksConfig} style={{
        position:"absolute",
        height:"100vh",
        marginLeft:"1200px"
      }} />
      {/* Add any other nighttime elements or decorations here */}
      <div className="coming-content ">
        <p className="text-center text-3xl font-semibold"></p>
        <h6 className="flex justify-center items-center mb-5">
          <img
            className="w-[140px] h-auto bg-white p-3 me-3 rounded-lg"
            src={companylogo}
            alt=""
          />{" "}
          <span className="font-bold text-6xl text-blue-900">
            is Coming Soon
          </span>
        </h6>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center", // Center the text on smaller screens
            marginTop: "10px",
            color:"white" // Add some spacing at the top on smaller screens
          }}
        >
          Contact us: Hr@Kodukku.com
        </p>
        <div>
          {/* Additional content */}
        </div>
      </div>
      
      {/* Nighttime fireworks */}
      <div  style={{display:'flex' , justifyContent:'space-between', marginTop:"260px"}}>
        <div>
        <BalloonComponent />
        </div>
        <div>
        <BalloonComponent />
        </div>
      </div>
    </div>
  
  </>
  );
};

export default Fireworkscrackers;

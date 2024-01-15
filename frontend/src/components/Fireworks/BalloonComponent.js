import React from 'react';
import './BalloonComponent.css'; // Assuming you have styles for your balloons

const BalloonComponent = () => {
  return (
    <body>
      <div className="box-canvas">
        <div className="balloon-wrapper red">
          <div className="string"></div>
          <div className="balloon"></div>
        </div>
        <div className="balloon-wrapper green">
          <div className="string"></div>
          <div className="balloon"></div>
        </div>
        <div className="balloon-wrapper orange">
          <div className="string"></div>
          <div className="balloon"></div>
        </div>
        <div className="balloon-wrapper blue">
          <div className="string"></div>
          <div className="balloon"></div>
        </div>
        <div className="balloon-wrapper yellow">
          <div className="string"></div>
          <div className="balloon"></div>
        </div>
        <h2 style={{
          marginBottom:"20px",
          fontWeight:"bold"
        }}  className='text-gradient'>Happy New Year <span style={{
          color:"white"
        }}>2024</span></h2>
      </div>
    </body>
  );
};

export default BalloonComponent;

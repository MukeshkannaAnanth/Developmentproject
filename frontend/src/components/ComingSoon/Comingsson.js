import React from "react";
import companylogo from "../../assets/companylogo/download_logo-removebg-preview.png";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa6";
import "./Coming.css"; // Import a CSS file for additional styles if needed

const Coming = () => {
  return (
    <div className="coming bg-gradient-to-r from-blue-500 to-cyan-400 h-screen flex justify-center items-center">
      <div className="coming-content">
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
            marginTop: "10px", // Add some spacing at the top on smaller screens
          }}
        >
          Contact us: Hr@Kodukku.com
        </p>
        <div>
          {/* Additional content */}
        </div>
      </div>
    </div>
  );
};

export default Coming;

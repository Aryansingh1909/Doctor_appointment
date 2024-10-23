import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub, AiFillInstagram } from "react-icons/ai";
const socialLinks = [
  {
    // path: "https://www.youtube.com/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    // path: "https://github.com/Aryan1909",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    // path: "https://www.linkedin.com/in/Aryan-314404249/",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
  {
    // path: "https://www.instagram.com/aryan?igsh=ajRxNTNqbjhrazlh&utm_source=qr",
    icon: <AiFillInstagram className="group-hover:text-white w-4 h-5" />,
  },
];

const quicklinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quicklinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/Pharmacy",
    display: "Pharmacy",
  },
  {
    path: "/",
    display: "Get an Opinion",
  },
];

const quicklinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact us",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px] ">
          <div>
            <img src={logo} alt="" />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright © {2024} developed by Aryan Singh. All rights
              reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hove:bg-primaryColor hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-20px leading-[30px] font-[700] mb-6 text-headingColor">
              {" "}
              Quick Links
            </h2>
            <ul>
              {quicklinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  {" "}
                  <Link
                    to={item.path}
                    className="text-[16px] leadin-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-20px leading-[30px] font-[700] mb-6 text-headingColor">
              
              I want to:
            </h2>
            <ul>
              {quicklinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  {" "}
                  <Link
                    to={item.path}
                    className="text-[16px] leadin-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-20px leading-[30px] font-[700] mb-6 text-headingColor">
                
              Support
            </h2>
            <ul>
              {quicklinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  {" "}
                  <Link
                    to={item.path}
                    className="text-[16px] leadin-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

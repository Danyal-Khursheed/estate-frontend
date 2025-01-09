import React from "react";
import Founder1 from "../../assets/co1.png"
import Founder2 from "../../assets/co2.jpeg"
const OurLeaders = () => {
  const leaders = [
    {
      name: "Basil Hadad",
      role: "Co-Founder",
      image: Founder1,
      social: [
        { name: "LinkedIn", icon: "https://via.placeholder.com/20", link: "#" },
        { name: "Facebook", icon: "https://via.placeholder.com/20", link: "#" },
        { name: "Instagram", icon: "https://via.placeholder.com/20", link: "#" },
      ],
    },
    {
      name: "Alaa Yousif",
      role: "Co-Founder",
      image: Founder2, 
      social: [
        { name: "LinkedIn", icon: "https://via.placeholder.com/20", link: "#" },
        { name: "Facebook", icon: "https://via.placeholder.com/20", link: "#" },
        { name: "Instagram", icon: "https://via.placeholder.com/20", link: "#" },
      ],
    },
  ];

  return (
    <div className="container mx-auto w-full md:w-[85%]">
    <div className="bg-white py-10 px-6 md:px-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Meet <span className="text-red-500">Our Leaders</span>
        </h2>
        <p className="text-gray-600 mt-4">
          Behind every successful campaign is a team of dedicated individuals
          who are passionate about crafting exceptional social media marketing
          solutions. Get to know the faces behind.
        </p>
      </div>

      {/* Leaders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:flex-row bg-[#F8FCFC] rounded-lg p-5 overflow-hidden"
          >
            {/* Leader Image */}
            <div className="w-full md:w-[330px]">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-[300px] h-[210px] "
              />
            </div>
            {/* Leader Info */}
            <div className="w-full md:w-2/3 p-6 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {leader.name}
              </h3>
              <p className="text-gray-600 text-sm">{leader.role}</p>
              {/* Social Icons */}
              <div className="flex justify-center md:justify-start mt-4 space-x-4">
                {leader.social.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-5 h-5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default OurLeaders;

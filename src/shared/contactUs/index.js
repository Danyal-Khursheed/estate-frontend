import { HiArrowRight } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
const ContactUsNow = () => {
  return (
    <div className="bg-white rounded-md shadow p-4">
      <h3 className="text-lg font-semibold text-black-700 mb-1">
        Do you need help?
      </h3>
      <p className="text-sm  text-gray-600 mt-3 mb-3">Contact us now</p>
      <div className="flex items-center justify-center border border-[#127b41] rounded-md py-2 space-x-4">
        <FaPhoneAlt className="text-[#127b41] text-md" />
        <button className="text-[#127b41] font-medium ">Contact Us</button>
      </div>
    </div>
  );
};
export default ContactUsNow;

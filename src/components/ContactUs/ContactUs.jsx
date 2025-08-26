import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactUs = () => {
  return (
    <section className="font-poppins">
      <div className="h-50 bg-black text-white text-3xl font-medium flex items-center justify-center">
        <h1> Contact Us</h1>
      </div>
      <div className="px-5 py-3 max-w-[1200px]  mx-auto flex flex-col lg:flex-row gap-10">
        <div className="w-[95%] lg:w-1/2 mx-auto">
          <h1 className="mt-4 my-2 text-3xl font-medium  ">
            You Will Grow, You Will Succeed. We Promise That.
          </h1>
          <p className="text-sm font-medium text-slate-800">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
            similique labore eius voluptates laudantium, soluta illo repellat
            cumque modi totam.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 text-center sm:text-start">
            {/* Phone section */}
            <div className="px-5 py-2 ">
              <p className="mt-1 text-purple-800 flex justify-center sm:block">
                <Phone />
              </p>
              <p className="mt-1 font-semibold">Call for Inquiry</p>
              <p className="mt-1">+91 0000000000</p>
            </div>

            {/* email */}
            <div className="px-5 py-2">
              <p className="mt-1 text-purple-800 flex justify-center sm:block">
                <Mail />
              </p>
              <p className="mt-1 font-semibold">Send Us Email</p>
              <p className="mt-1">panchalkeyur.dev@gmail.com</p>
            </div>

            {/* Opening Hours */}
            <div className="px-5 py-2">
              <p className="mt-1 text-purple-800 flex justify-center sm:block">
                <Clock />
              </p>
              <p className="mt-1 font-semibold">Opening Hours</p>
              <p className="mt-1">9:00AM - 9:00PM</p>
            </div>

            {/* office */}
            <div className="px-5 py-2">
              <p className="mt-1 text-purple-800 flex justify-center sm:block">
                <MapPin />
              </p>
              <p className="mt-1 font-semibold">Office</p>
              <p className="mt-1">Ahmedabad, Gujarat, India</p>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="w-[95%] lg:w-1/2 mx-auto md:mx-5 bg-purple-200 rounded-lg px-5">
          <form action="">
            <div className="my-5">
              <h1 className="text-xl text-center font-medium">Contact Us</h1>
            </div>
            {/* All form fields */}
            <div>
              {/* first and last name input field */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col sm:block">
                  <label htmlFor="firstName">FirstName </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="px-2 py-1 bg-white shadow focus:outline-none rounded w-full"
                  />
                </div>

                <div className="flex flex-col sm:block">
                  <label htmlFor="lastName">LastName </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="px-2 py-1 bg-white shadow focus:outline-none rounded w-full"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col mt-5">
                <label htmlFor="userEmail">UserEmail</label>
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  className="px-2 py-1 bg-white shadow focus:outline-none rounded"
                />
              </div>

              {/* Message */}
              <div className="mt-5 flex flex-col ">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  className="px-2 py-1 bg-white shadow focus:outline-none rounded"
                ></textarea>
              </div>

              {/* Submit btn */}
              <div className="mt-5 mb-5">
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-950 transition duration-300 ease-linear"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

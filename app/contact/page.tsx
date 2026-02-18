"use client";

import React, { useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { images } from "../../constants/images";
import { useLoadingStore } from "../../lib/songStore";

const ContactUs = () => {
  const isPageLoading = useLoadingStore((state) => state.isPageLoading);
  const setPageLoading = useLoadingStore((state) => state.setPageLoading);

  useEffect(() => {
    setPageLoading(false);
    return () => {
      setPageLoading(null);
    };
  }, [setPageLoading]);

  useEffect(() => {
    console.log("isPageLoading changed:", isPageLoading);
  }, [isPageLoading]);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${images.bluishbg.src})` }}
    >
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-blue-100 mt-2">
          We’d love to hear from you. Get in touch with the right person below.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Personnel */}
        <section className="bg-blue-200/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Key Contacts
          </h2>
          <ul className="space-y-4 text-white/90">
            <li className="flex items-start gap-4">
              <Phone className="text-blue-200 mt-1" />
              <div>
                <p className="font-medium">
                  Dumdibabari Promise – Sub South CM
                </p>
                <p className="">09092868267</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-blue-200 mt-1" />
              <div>
                <p className="font-medium">Festus Chibuzor – State CM</p>
                <p className="">08105571071</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Locations */}
        <section className="bg-blue-200/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our Locations
          </h2>
          <ul className="space-y-4 text-white/90">
            <li className="flex items-start gap-4">
              <MapPin className="text-green-300 mt-1" />
              <div>
                <p className="font-medium">National Headquarters</p>
                <p>
                  Chosen Estate, Amuwo Odofin, Oshodi / Apapa Express Way,
                  Ijesha, by Ijesha Bus Stop, Lagos, Nigeria, West Africa
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="text-green-300 mt-1" />
              <div>
                <p className="font-medium">Portharcourt Headquaters</p>
                <p>
                  Kilometer 4, Off East / West Road, Before Rumuosi Flyover,
                  Behind Charkin, Chosen Estate, Portharcourt, River state{" "}
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Email Contact */}
        <section className="bg-blue-200/20 backdrop-blur-md rounded-2xl p-6 md:col-span-2 border border-white/30 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Email Us</h2>
          <div className="flex items-start gap-4 text-white/90">
            <Mail className="text-red-200 mt-1" />
            <div>
              <p>For general inquiries, please email us at:</p>
              <p className="text-white font-medium underline">
                TLCCRM.Portharcourt.Youthchoir@gmail.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;

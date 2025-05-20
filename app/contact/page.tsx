import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import bluishbg from '../../assets/images/bluishbg.png'; // Adjust this path if needed

const ContactUs: React.FC = () => {
  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bluishbg})` }}
    >
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Contact Us</h1>
        <p className="text-blue-100 mt-2">
          We’d love to hear from you. Get in touch with the right person below.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Personnel */}
        <section className="bg-blue-200/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Key Contacts</h2>
          <ul className="space-y-4 text-white/90">
            <li className="flex items-start gap-4">
              <Phone className="text-blue-200 mt-1" />
              <div>
                <p className="font-medium">John Doe – Website Admin</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-blue-200 mt-1" />
              <div>
                <p className="font-medium">Jane Smith – Support Lead</p>
                <p>+1 (555) 987-6543</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Locations */}
        <section className="bg-blue-200/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Locations</h2>
          <ul className="space-y-4 text-white/90">
            <li className="flex items-start gap-4">
              <MapPin className="text-green-300 mt-1" />
              <div>
                <p className="font-medium">Headquarters</p>
                <p>123 Main Street, Cityville, Country</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="text-green-300 mt-1" />
              <div>
                <p className="font-medium">Branch – East Side</p>
                <p>456 East Ave, Suburbia, Country</p>
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
                contact@yourwebsite.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;

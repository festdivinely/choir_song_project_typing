import React from 'react';
import bluishbg from '../../assets/images/bluishbg.png'; // Adjust the path as needed

const ShareUrOpinion: React.FC = () => {
  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center text-white px-8 py-6"
      style={{ backgroundImage: `url(${bluishbg})` }}
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Share Your Opinion</h2>
        
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Your Opinion
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your thoughts here..."
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 resize-none backdrop-blur-md"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareUrOpinion;

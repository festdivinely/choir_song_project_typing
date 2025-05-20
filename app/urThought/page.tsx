import React from 'react';
import { images } from '../../constants/images';

function ShareUrOpinion() {
  return (
    <div
      className="min-h-screen flex justify-center bg-cover bg-center text-white px-8 py-6"
      style={{ backgroundImage: `url(${images.bluishbg.src})` }}
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Share Your Opinion</h2>
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="+1234567890"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="message">
              Your Opinion
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 resize-none"
              placeholder="Write your thoughts here..."
            />
          </div>

          {/* Submit */}
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
}

export default ShareUrOpinion;


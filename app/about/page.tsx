import React from 'react';
import { images } from '../../constants/images';

const AboutPage = () => {
  return (
    <div className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${images.bluishbg.src})` }}>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">About Us</h1>
        <p className="text-blue-100 mt-3 max-w-3xl mx-auto">
          Preserving choral heritage through collaboration, technology, and purpose.
        </p>
      </section>

      {/* Main Glass Container */}
      <div className="max-w-5xl mx-auto bg-blue-200/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-lg text-white/90 space-y-6">

        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
        <p>
          Our app is designed for choristers, by choristers — a digital platform built to preserve and make accessible the rich treasury of choir songs traditionally found only in printed books.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What You Can Do</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Type Songs:</strong> Contribute by typing out choir songs that are still only in hard copy, helping expand the digital database.
          </li>
          <li>
            <strong>Proofread & Edit:</strong> Review and correct existing digital entries to ensure accuracy and clarity of lyrics.
          </li>
          <li>
            <strong>Collaborate:</strong> Join a growing community of choristers from around the world dedicated to preserving sacred music.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Why It Matters</h2>
        <p>
          Choir songs are an essential part of spiritual worship and cultural identity. Sadly, many beautiful hymns are only available in physical books, making them inaccessible to choirs without copies. By digitizing these songs, we ensure that they live on — searchable, shareable, and accessible to all.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Join the Movement</h2>
        <p>
          Whether you're a solo contributor or part of a church choir, your input helps build a lasting resource for generations of singers to come.
        </p>

      </div>
    </div>
  );
};

export default AboutPage;

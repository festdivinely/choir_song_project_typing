"use client"
import React, { useEffect, useState } from 'react'
import { images } from '../../constants/images';
import { useLoadingStore } from '../../lib/songStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'

interface ModalMessageProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#c1d5ee] text-[#4f4f50] rounded-2xl p-6 text-center mx-5 max-w-sm w-full shadow-[6px_6px_13px_#656566,_-5px_-5px_13px_#656566]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className="text-lg font-semibold mb-4">{message}</div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={onConfirm}
              className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-400"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="bg-red-400 text-gray-800 px-4 py-2 rounded hover:bg-red-400"
            >
              No
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};



function ShareUrOpinion() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const isPageLoading = useLoadingStore((state) => state.isPageLoading);
  const setPageLoading = useLoadingStore((state) => state.setPageLoading);
  const [confirmation, setConfirmation] = useState(false)
  const [pendingSubmit, setPendingSubmit] = useState(false)
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setModalInfo({ message: '', type: null });

    try {
      const response = await fetch('/api/opinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to update song';

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          try {
            const text = await response.text();
            errorMessage = text || errorMessage;
          } catch (textError) {
            console.error('Could not parse error message:', textError);
          }
        }

        console.error('Server response:', errorMessage);
        setModalInfo({
          message: errorMessage,
          type: "error",
        });
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Submitted:', data);

      setModalInfo({ message: 'Message submitted successfully!', type: 'success' });

      setFormData({ name: '', email: '', phone: '', message: '' });
      router.push('/urThought');
    } catch (error: unknown) {
      const apiError = error instanceof Error
        ? { message: error.message }
        : { message: 'Something went wrong' };

      setModalInfo({ message: apiError.message, type: 'error' });
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (modalInfo.type) {
      const timer = setTimeout(() => {
        setModalInfo({ message: '', type: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalInfo]);

  const trimmedName = formData.name.trim();
  const trimmedMessage = formData.message.trim();

  const confirmSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ Prevent the default form submission
    setPendingSubmit(true);
    setConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    if (!pendingSubmit) return;

    // Create a mock event object if needed for handleSubmit
    const mockEvent = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;

    // Validation order: from basic to complex
    const trimmedName = formData.name.trim();
    const trimmedMessage = formData.message.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ✅ Name validation
    if (!trimmedName) {
      setNameError(true);
      setTimeout(() => setNameError(false), 500);
      setModalInfo({ message: 'Please fill in your name.', type: 'error' });
      return;
    }

    // ✅ Message validation
    if (!trimmedMessage) {
      setMessageError(true);
      setTimeout(() => setMessageError(false), 500);
      setModalInfo({ message: 'Please send some message.', type: 'error' });
      return;
    }

    // ✅ Email validation
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 500);
      setModalInfo({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    // ✅ Phone validation
    if (trimmedPhone.length < 9) {
      setNumberError(true);
      setTimeout(() => setNumberError(false), 500);
      setModalInfo({ message: 'Enter a valid phone number.', type: 'error' });
      return;
    }

    // All valid: proceed
    handleSubmit(mockEvent);
    setConfirmation(false);
    setPendingSubmit(false);

  }

  const handleCancelSubmit = () => {
    setConfirmation(false);
    setPendingSubmit(false);
  }

  useEffect(() => {
    setPageLoading(false);
    return () => {
      setPageLoading(null);
    };
  }, [setPageLoading]);

  useEffect(() => {
    console.log('isPageLoading changed:', isPageLoading);
  }, [isPageLoading]);

  return (
    <>
      {confirmation && (
        <ModalMessage
          message="Are you ready to submit?"
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}

      <div
        className="min-h-screen flex justify-center bg-cover bg-center text-white px-8 py-6"
        style={{ backgroundImage: `url(${images.bluishbg.src})` }}
      >
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Share Your Opinion</h2>
          <form className="space-y-4" onSubmit={confirmSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`px-4 py-2 w-full rounded-lg bg-white/20 backdrop-blur-md border ${nameError ? 'border-red-500 shake' : 'border-white/30'
                  } text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40`}
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
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border ${emailError ? 'border-red-500 shake' : 'border-white/30'} text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40`}
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
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border ${numberError ? 'border-red-500 shake' : 'border-white/30'} text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40`}
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
                value={formData.message}
                onChange={handleChange}
                className={`px-4 py-2 w-full rounded-lg bg-white/20 backdrop-blur-md border ${messageError ? 'border-red-500 shake' : 'border-white/30'
                  } text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40`}
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

        {/* Spinner Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-transparent  z-50 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Modal Info */}
        {modalInfo.type && (
          <div className={`fixed bottom-6 whitespace-nowrap left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50
    ${modalInfo.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {modalInfo.message}
          </div>
        )}

      </div>

      <style jsx global>{`
          .shake {
          animation: shake 0.3s;
          }
          @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
          }
     `}</style>
    </>
  );
}

export default ShareUrOpinion;


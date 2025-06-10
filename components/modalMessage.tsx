// components/InfoModal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoModalProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white text-black rounded-2xl p-6 text-center max-w-sm w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              boxShadow: '0 0 30px rgba(72, 187, 120, 0.5)', // green glow
            }}
          >
            <div className="text-green-600 text-xl font-semibold mb-2">Success</div>
            <div className="text-base">{message}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;

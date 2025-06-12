'use client';

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { images } from '../../constants/images';
import { useSongStore } from '../../lib/songStore';
import type { SongWithSections } from '../types/song';
import { useRouter } from "next/navigation";
import { useLoadingStore } from '../../lib/songStore';
import { motion, AnimatePresence } from 'framer-motion';

export const dynamic = 'force-dynamic';

type SectionType = 'solo' | 'chorus' | 'call' | 'response' | 'bridge';

interface Section {
  type: SectionType;
  label: string;
  lyrics: string;
}

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


export default function SongForm() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const { currentSong, setCurrentSong } = useSongStore();
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const isPageLoading = useLoadingStore((state) => state.isPageLoading);
  const setPageLoading = useLoadingStore((state) => state.setPageLoading);

  const [confirmation, setConfirmation] = useState(false)
  const [pendingSubmit, setPendingSubmit] = useState(false)


  const confirmSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ Prevent the default form submission
    setPendingSubmit(true);
    setConfirmation(true);
  };


  const handleConfirmSubmit = () => {
    if (!pendingSubmit) return;

    // Create a mock event object if needed for handleSubmit
    const mockEvent = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;

    if (pendingSubmit === true) {
      handleSubmit(mockEvent);
    }

    setConfirmation(false);
    setPendingSubmit(false);
  }

  const handleCancelSubmit = () => {
    setConfirmation(false);
    setPendingSubmit(false);
  }


  useEffect(() => {
    if (currentSong) {
      setTitle(currentSong.title || '');
      setKey(currentSong.key || '');
      const allowedTypes: SectionType[] = [
        'solo',
        'chorus',
        'call',
        'response',
        'bridge',
      ];
      const sanitizedSections = (currentSong.sections || [])
        .filter((section) =>
          allowedTypes.includes(section.type as SectionType)
        )
        .map((section) => ({
          type: section.type as SectionType,
          label: section.label,
          lyrics: section.lyrics,
        }));
      setSections(sanitizedSections);
    }
  }, [currentSong]);

  const recalculateLabels = (sectionsToUpdate: Section[]): Section[] => {
    const counts: Record<string, number> = {};
    return sectionsToUpdate.map((section) => {
      const type = section.type.toUpperCase();
      counts[type] = (counts[type] || 0) + 1;
      return {
        ...section,
        label: `${type}${counts[type]}`,
      };
    });
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updatedSections = [...sections];
    if (field === 'type') {
      updatedSections[index].type = value as SectionType;
      setSections(recalculateLabels(updatedSections));
    } else {
      updatedSections[index][field] = value;
      setSections(updatedSections);
    }
  };

  const addSection = () => {
    const updated: Section[] = [
      ...sections,
      { type: 'solo', label: '', lyrics: '' },
    ];
    setSections(recalculateLabels(updated));
  };

  const removeSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(recalculateLabels(updated));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 🛑 Ensure form doesn't reload

    setIsLoading(true);
    setModalInfo({ message: '', type: null });

    if (!currentSong?.id) {
      const errorMessage = 'Failed to update song';

      setTimeout(() => {
        setIsLoading(false);
        setModalInfo({
          message: errorMessage,
          type: "error",
        });
      }, 2000);

      console.error('No song ID available for update');
      return;
    }

    const payload = { title, key, sections };

    try {
      const response = await fetch(`/api/songs/${currentSong.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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



      const data: SongWithSections = await response.json();
      console.log('Update successful:', data);

      // Update Zustand store with the new song data
      setCurrentSong(null);

      setModalInfo({ message: 'Song edited successfully!', type: 'success' });

      setTitle('');
      setKey('');
      setSections([{ type: 'solo', label: 'SOLO1', lyrics: '' }]);
      setActiveIndex(0);

      // ✅ Optionally redirect
      router.push('/edit');
    } catch (error: unknown) {
      const apiError = error instanceof Error
        ? { message: error.message }
        : { message: 'Something went wrong' };

      setModalInfo({ message: apiError.message, type: 'error' });
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prev) => Math.min(prev + 1, 1)),
    onSwipedRight: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });

  useEffect(() => {
    if (modalInfo.type) {
      const timer = setTimeout(() => {
        setModalInfo({ message: '', type: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalInfo]);

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

      <div {...handlers} className="w-screen h-screen overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out w-[200vw] h-full"
          style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
        >
          {/* LEFT - FORM SCREEN */}
          <div className="w-[100vw] h-full overflow-y-auto p-6 bg-white" style={{
            backgroundImage: `url(${images.bluishbg.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
            <form onSubmit={confirmSubmit} className="space-y-6 max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
              <div>
                <input
                  type="text"
                  value={title}
                  placeholder="Song Title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 w-full rounded-lg bg-white/5 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={key}
                  placeholder="Key (e.g., G, C)"
                  onChange={(e) => setKey(e.target.value)}
                  className="p-2 w-full rounded-lg bg-white/5 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>

              {sections.map((section, index) => (
                <div key={index} className="space-y-2 p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40">
                  <div className="flex justify-between items-center gap-2">
                    <select
                      value={section.type}
                      onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
                      className="border"
                    >
                      <option className='bg-blue-400' value="solo">Solo</option>
                      <option value="chorus" className='bg-blue-400'>Chorus</option>
                      <option value="call" className='bg-blue-400'>Call</option>
                      <option value="response" className='bg-blue-400'>Response</option>
                      <option value="bridge" className='bg-blue-400'>Bridge</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="text-red-600 text-sm font-bold"
                    >
                      Remove
                    </button>
                  </div>

                  <input
                    type="text"
                    value={section.label}
                    placeholder="Label (e.g., SOLO1)"
                    onChange={(e) => handleSectionChange(index, 'label', e.target.value)}
                    className="p-2 w-full rounded-l border"
                  />

                  <textarea
                    value={section.lyrics}
                    onChange={(e) => handleSectionChange(index, 'lyrics', e.target.value)}
                    placeholder="Lyrics"
                    className="p-2 w-full resize-y rounded-lg border"
                    rows={3}
                  />
                </div>
              ))}

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={addSection}
                  className="bg-gray-500 px-4 py-2 rounded"
                >
                  Add Section
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(1)}
                  className="bg-blue-500 text-white rounded w-fit h-fit"
                >
                  <div className='px-4 py-2 flex justify-center items-center gap-1.5'>
                    <div>
                      Preview
                    </div>
                    <div>👉</div>
                  </div>
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white w-full py-2 rounded"
              >
                Update Song
              </button>
            </form>
          </div>

          {/* RIGHT - PREVIEW SCREEN */}
          <div className="w-[100vw] h-full overflow-y-auto p-6 bg-white" style={{
            backgroundImage: `url(${images.bluishbg.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
            <div className="max-w-2xl mx-auto whitespace-pre-wrap text-white">
              <h1 className="text-2xl font-bold mb-2">Title: {title}</h1>
              <h2 className="text-lg mb-4">Key: {key}</h2>
              {sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold capitalize">
                    {section.type} {section.label && `(${section.label})`}:
                  </h3>
                  <p>{section.lyrics}</p>
                </div>
              ))}
            </div>

            <div className="flex max-w-2xl mx-auto whitespace-pre-wrap mt-6">
              <button
                type="button"
                onClick={() => setActiveIndex(0)}
                className="bg-blue-500 text-white w-fit h-fit rounded"
              >
                <div className='px-4 py-2 flex justify-center items-center text-white gap-1.5'>
                  <div>👈</div>
                  <div>
                    back to edit
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>


        {/* Spinner Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-transparent  z-50 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Modal Info */}
        {modalInfo.type && (
          <div className={`fixed w-fit whitespace-nowrap bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50
    ${modalInfo.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {modalInfo.message}
          </div>
        )}


      </div>
    </>
  )
}

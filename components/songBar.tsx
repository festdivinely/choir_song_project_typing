'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaTrashAlt } from 'react-icons/fa'
import Spinner from '../components/spinner'
import type { SongWithSections } from '../app/types/song'
import { useSongStore } from '../lib/songStore'
import { useLoadingStore } from '../lib/songStore'
import { useSelectionStore } from '../lib/songStore'
import { motion, AnimatePresence } from 'framer-motion';


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


export default function SongBar({ song }: { song: SongWithSections }) {
  const [expanded, setExpanded] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | null
  }>({ message: '', type: null })

  // ✅ Stable selectors from Zustand stores
  const addSong = useSelectionStore((state) => state.addSong)
  const removeSong = useSelectionStore((state) => state.removeSong)
  const selectedSongIds = useSelectionStore((state) => state.selectedSongIds)

  const count = useSelectionStore((state) => state.count)
  const resetSelection = useSelectionStore((state) => state.resetSelection)

  const setCurrentSong = useSongStore((state) => state.setCurrentSong)

  const isPageLoading = useLoadingStore((state) => state.isPageLoading)
  const setPageLoading = useLoadingStore((state) => state.setPageLoading)

  const [confirmation, setConfirmation] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<{ type: 'single' | 'bulk'; songId?: string } | null>(null)


  // Individual delete (open modal first)
  const confirmSingleDelete = (id: string) => {
    setPendingDelete({ type: 'single', songId: id });
    setConfirmation(true);
  }

  // Bulk delete (open modal first)
  const confirmBulkDelete = () => {
    setPendingDelete({ type: 'bulk' });
    setConfirmation(true);
  }


  // Update the handleDelete function in SongBar
  // Handle individual song deletion
  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    setNotification({ message: '', type: null })

    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete song')
      }

      if (selectedSongIds.includes(id)) {
        removeSong(id)
      }

      setNotification({
        message: 'Song deleted successfully!',
        type: 'success'
      })

      // Refresh the page after a short delay to show success message
      setTimeout(() => router.refresh(), 1000)
    } catch (err) {
      setNotification({
        message: err instanceof Error ? err.message : 'Failed to delete song',
        type: 'error'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;

    if (pendingDelete.type === 'single' && pendingDelete.songId) {
      handleDelete(pendingDelete.songId);
    } else if (pendingDelete.type === 'bulk') {
      handleBulkDelete();
    }

    setConfirmation(false);
    setPendingDelete(null);
  }

  const handleCancelDelete = () => {
    setConfirmation(false);
    setPendingDelete(null);
  }


  const handleBulkDelete = async () => {
    if (selectedSongIds.length === 0) return;

    setIsDeleting(true);
    setNotification({ message: '', type: null });
    console.log('Attempting to delete:', selectedSongIds); // Debug log

    try {
      const response = await fetch('/api/songs/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedSongIds }),
      });

      console.log('Delete response status:', response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', errorText); // Debug log
        throw new Error(errorText || 'Delete failed');
      }

      const data = await response.json();
      console.log('Delete success:', data); // Debug log

      setNotification({
        message: data.message || `${selectedSongIds.length} song(s) deleted!`,
        type: 'success'
      });

      resetSelection();
      setTimeout(() => router.refresh(), 1000);
    } catch (err) {
      console.error('Bulk delete error:', err);
      setNotification({
        message: err instanceof Error ? err.message : 'Failed to delete songs',
        type: 'error'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Close notification after timeout
  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: null })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])


  const truncate = (text: string, length = 50) =>
    text.length <= length ? text : `${text.slice(0, length)}...`

  const handleClick = () => {
    setCurrentSong(song)
    setPageLoading(true)
    router.push('/edit')
  }

  useEffect(() => {
    setIsSelected(selectedSongIds.includes(song.id))
  }, [selectedSongIds, song.id])

  const handleCheckboxChange = (checked: boolean) => {
    setIsSelected(checked)
    if (checked) {
      addSong(song.id)
    } else {
      removeSong(song.id)
    }
  }

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-cyan-700">
        <Spinner />
      </div>
    )
  }

  // Add this to your JSX to show loading/error states

  if (isDeleting) {
    return (
      <div className="fixed inset-0 bg-transparent  z-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  {/* Notification */ }
  {
    if (notification.type) {
      return (
        <div
          className={`fixed inset-0 bg-transparent z-50 flex items-center justify-center ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
        >
          <div className='px-5 py-5 bg-white text-blue-500'>
            {notification.message}
          </div>
        </div>
      )
    }
  }



  return (
    <>

      {confirmation && (
        <ModalMessage
          message="Are you sure you want to delete?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Bulk Delete Icon */}
      {count > 0 && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-fit text-red-700 rounded-xl flex flex-col gap-0.5 items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            confirmBulkDelete();
          }}
        >
          <div>{count} x</div>
          <FaTrashAlt className="text-4xl" />
        </div>
      )}

      {/* Song Bar */}
      <div
        className="relative flex flex-row justify-center items-center border rounded-lg bg-white/10 backdrop-blur-lg border-white/80 shadow-2xl hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {/* Checkbox for multi-select */}
        <div className="relative p-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="peer appearance-none mt-2 w-6 h-6 bg-gray-300 border border-gray-400 rounded checked:bg-blue-600 checked:border-transparent 
                   checked:after:content-['✓'] checked:after:text-white checked:after:text-sm 
                   checked:after:absolute checked:after:top-5.5 checked:after:left-4.5"
          />
        </div>

        {/* Song content */}
        <div className="relative flex-1 px-2 py-3">
          <h2 className="font-medium text-lg text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {expanded ? song.title : truncate(song.title)}
          </h2>
          {!expanded && song.title.length > 50 && (
            <button
              type="button"
              className="text-blue-500 text-sm underline mt-1"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(true)
              }}
            >
              Read more
            </button>
          )}
        </div>

        {/* Individual delete button */}
        {/* Individual delete button */}
        <div className="w-fit h-fit">
          <button
            type="button"
            className="absolute right-2 top-6 text-red-600 hover:text-red-800"
            onClick={(e) => {
              e.stopPropagation();
              confirmSingleDelete(song.id);
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </>
  )
}

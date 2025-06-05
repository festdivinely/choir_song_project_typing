'use client'

import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { images } from '../../constants/images'

type SectionType = 'solo' | 'chorus' | 'call' | 'response' | 'bridge'

interface Section {
  type: SectionType
  label: string
  lyrics: string
}

export default function SongForm() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [title, setTitle] = useState('')
  const [key, setKey] = useState('')
  const [sections, setSections] = useState<Section[]>([
    { type: 'solo', label: 'SOLO1', lyrics: '' },
  ])

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updatedSections = [...sections]
    if (field === 'type') {
      updatedSections[index][field] = value as SectionType
    } else {
      updatedSections[index][field] = value
    }
    setSections(updatedSections)
  }

  const addSection = () => {
    setSections([...sections, { type: 'solo', label: '', lyrics: '' }])
  }

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, key, sections }),
    })

    const data = await res.json()
    console.log('Submitted:', data)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prev) => Math.min(prev + 1, 1)),
    onSwipedRight: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  })

  return (
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
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
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
                    onChange={(e) =>
                      handleSectionChange(index, 'type', e.target.value)
                    }
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
                  onChange={(e) =>
                    handleSectionChange(index, 'label', e.target.value)
                  }
                  className="p-2 w-full rounded-l border"
                />

                <textarea
                  value={section.lyrics}
                  onChange={(e) =>
                    handleSectionChange(index, 'lyrics', e.target.value)
                  }
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
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Add Section
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex(1)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Preview
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white w-full py-2 rounded"
            >
              Submit Song
            </button>
          </form>
        </div>

        {/* RIGHT - PREVIEW SCREEN */}
        <div className="w-[100vw] h-full overflow-y-auto p-6 bg-gray-100" style={{
          backgroundImage: `url('/images/form-bg.jpg')`,
        }}>
          <div className="max-w-2xl mx-auto whitespace-pre-wrap">
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

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => setActiveIndex(0)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

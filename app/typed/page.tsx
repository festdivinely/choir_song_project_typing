import { prisma } from '@/lib/prisma'
import { SongWithSections } from '../types/song'
import SongBar from '../../components/songBar'
import { images } from '../../constants/images';

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function TypePage() {

  const songs: SongWithSections[] = await prisma.song.findMany({
    include: {
      sections: true,
    },
  })

  return (
    <div className="p-4 min-h-[100vh] space-y-4 bg-cover bg-center" style={{ backgroundImage: `url(${images.bluishbg.src})` }}>
      {songs.length > 0 ? (
        songs.map((song) => <SongBar key={song.id} song={song} />)
      ) : (
        <p className='py-5 text-white relative flex flex-row justify-center items-center border rounded-lg bg-white/10 backdrop-blur-lg border-white/80 shadow-2xl hover:shadow-md transition-all duration-300 overflow-hidden'>No songs found.</p>
      )}
    </div>
  )
}

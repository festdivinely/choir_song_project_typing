import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Make sure you have this set up correctly

type SectionInput = {
  type: string;
  label: string;
  lyrics: string;
};

type SongInput = {
  title: string;
  key: string;
  sections: SectionInput[];
};


export async function POST(req: Request) {
  try {
    const body = await req.json();

    // body is expected to be an array of songs
    const createdSongs = await Promise.all(body.map(async (song: SongInput) => {
      const { title, key, sections } = song;

      return await prisma.song.create({
        data: {
          title,
          key,
          sections: {
            create: sections.map((section: SectionInput) => ({
              type: section.type,
              label: section.label,
              lyrics: section.lyrics,
            })),
          },
        },
      });
    }));

    return NextResponse.json({ message: 'Songs saved successfully', data: createdSongs }, { status: 201 });
  } catch (error) {
    console.error('Error saving songs:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}


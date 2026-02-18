import { NextResponse } from 'next/server';
import { db } from '../../../lib/prisma'; // <--- changed prisma -> db

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

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Expected an array of songs in request body' },
        { status: 400 }
      );
    }

    // body is expected to be an array of songs
    const createdSongs = await Promise.all(
      body.map(async (song: SongInput) => {
        const { title, key, sections } = song;

        return await db.song.create({
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
      })
    );

    return NextResponse.json(
      { message: 'Songs saved successfully', data: createdSongs },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving songs:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}



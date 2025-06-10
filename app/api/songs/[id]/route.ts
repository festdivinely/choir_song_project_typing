import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

type SectionInput = {
  type: string;
  label: string;
  lyrics: string;
};

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const songId = params.id;
    const body = await req.json();
    const { title, key, sections } = body;

    if (!songId) {
      return new NextResponse('Song ID is required', { status: 400 });
    }

    const updatedSong = await prisma.song.update({
      where: { id: songId },
      data: {
        title,
        key,
        sections: {
          // Only delete sections belonging to this song
          deleteMany: { songId },
          create: sections.map((section: SectionInput) => ({
            type: section.type,
            label: section.label,
            lyrics: section.lyrics,
          })),
        },
      },
      include: {
        sections: true,
      },
    });

    return NextResponse.json(updatedSong);
  } catch (error) {
    console.error('Error updating song:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


export async function DELETE(
  req: Request, { params }: { params: { id: string } }
) {
  try {
    const songId = params.id;

    if (!songId) {
      return new NextResponse('Song ID is required', { status: 400 });
    }

    // Prisma will automatically delete related sections due to onDelete: Cascade
    await prisma.song.delete({
      where: { id: songId },
    });

    return NextResponse.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Error deleting song:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
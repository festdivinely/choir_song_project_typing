import { NextResponse } from 'next/server';
import { db } from '../../../../lib/prisma'; // <--- changed prisma -> db

export async function DELETE(req: Request) {
  try {
    console.log('Bulk delete request received');
    const body = await req.json();
    console.log('Request body:', body);

    if (!body || !body.ids) {
      console.error('Missing ids in request body');
      return NextResponse.json(
        { error: 'Missing ids array in request body' },
        { status: 400 }
      );
    }

    const { ids } = body;

    console.log(ids);
    
    if (!Array.isArray(ids)) {
      console.error('Invalid ids format:', ids);
      return NextResponse.json(
        { error: 'ids must be an array' },
        { status: 400 }
      );
    }

    if (ids.length === 0) {
      console.error('Empty ids array');
      return NextResponse.json(
        { error: 'No song IDs provided' },
        { status: 400 }
      );
    }

    console.log('Attempting to delete songs with IDs:', ids);
    const deleteResult = await db.song.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    console.log('Delete result:', deleteResult);
    
    if (deleteResult.count === 0) {
      console.error('No songs were deleted');
      return NextResponse.json(
        { error: 'No songs found to delete' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deleteResult.count} song(s)`,
      count: deleteResult.count
    });

  } catch (error) {
    console.error('Bulk delete error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete songs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

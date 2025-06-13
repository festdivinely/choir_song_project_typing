// app/api/opinion/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const opinion = await prisma.opinion.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json({ success: true, data: opinion }, { status: 201 });
  } catch (error) {
    console.error('Error saving opinion:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

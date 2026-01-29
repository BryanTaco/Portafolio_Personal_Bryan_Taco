import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { contactSchema } from '@/lib/validations';
import rateLimit from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    await dbConnect();

    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // Create contact message
    const contactMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        data: {
          id: contactMessage._id,
          createdAt: contactMessage.createdAt,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { error, log } from 'console';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { clerkId, name, email } = await req.json();

    // Existing User
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return NextResponse.json(
        { messsage: 'User Already Exists' },
        { status: 200 }
      );
    }

    const newUser = await User.create({ clerkId, name, email });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log('Error Saving User', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

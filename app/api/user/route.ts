import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await connectToDB();

    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User Already Exists' },
        { status: 200 }
      );
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    const email = user.emailAddresses?.[0]?.emailAddress || '';

    const newUser = await User.create({ clerkId, name, email });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log('Error Saving User', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

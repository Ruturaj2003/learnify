import redis from '@/lib/redis';
import { auth } from '@clerk/nextjs/server';
import { Queue } from 'bullmq';

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { bookId, fileUrl } = body;

  try {
    // Initialize queue with Redis connection
    const queue = new Queue('section-queue', { connection: redis });

    // Add a job to the queue
    await queue.add('process-pdf', { bookId, fileUrl });

    console.log('📬 Job added to queue');

    // Close the queue connection after adding the job
    await queue.close();

    return new Response('Job added successfully', { status: 200 });
  } catch (error) {
    console.error('Error adding job to queue:', error);
    return new Response('Failed to add job to queue', { status: 500 });
  }
}

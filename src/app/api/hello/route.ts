import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.select().from(usersTable);
  return NextResponse.json({
    users,
    message: 'success',
  });
}

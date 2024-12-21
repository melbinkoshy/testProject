// pages/api/items.ts
import {NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

import prisma from '@/utils/prisma';

export async function GET(
  res: NextApiResponse  // Type for the response parameter
) {
  try {
    // Fetch all items from the database using the singleton Prisma client
    const items = await prisma.item.findMany();
    return NextResponse.json(items, { status: 200 });
    // Return items as JSON response
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        { message: "No content found for this subtopic" },
        { status: 404 }
      );
  }
}

import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

import prisma from '@/db'

interface BookingProps {
  roomId: string
  checkIn: string
  checkOut: string
  guestCount: string
  totalAmount: string
  totalDays: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') as string

  if (id) {
    const booking = await prisma.booking.findFirst({
      where: {
        id: id ? parseInt(id) : {},
      },
      include: {
        user: true,
        room: true,
      },
    })

    return NextResponse.json(booking, {
      status: 200,
    })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const {
    roomId,
    checkIn,
    checkOut,
    guestCount,
    totalAmount,
    totalDays,
  }: BookingProps = formData

  if (!session?.user) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }

  const booking = await prisma.booking.create({
    data: {
      roomId: parseInt(roomId),
      userId: session?.user.id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestCount: parseInt(guestCount),
      totalAmount: parseInt(totalAmount),
      totalDays: parseInt(totalDays),
      status: 'SUCCESS',
    },
  })

  return NextResponse.json(booking, {
    status: 200,
  })
}

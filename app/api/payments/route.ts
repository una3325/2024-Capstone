import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

import prisma from '@/db'

interface PaymentProps {
  bookingId: string
  amount: string
  orderId: string
  orderName: string
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const { bookingId, amount, status, orderId, orderName }: PaymentProps =
    formData

  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized user' }, { status: 401 })
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId: bookingId,
      amount: parseInt(amount),
      status: status,
      orderId: orderId,
      orderName: orderName,
    },
  })

  return NextResponse.json(payment, {
    status: 200,
  })
}
